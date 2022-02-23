import { useState, useLayoutEffect, useRef } from 'react'
const { motion, useViewportScroll, useTransform, useSpring, useReducedMotion } = require("framer-motion");

export default function ParallaxBox({ children, conInView, offset = 50, useFlex = true }) {
    const prefersReducedMotion = useReducedMotion()
    const { scrollY } = useViewportScroll();

    const [elementTop, setElementTop] = useState(0);
    const [clientHeight, setClientHeight] = useState(0);
    // start animating our element when we've scrolled it into view
    const initial = elementTop - clientHeight
    // end our animation when we've scrolled the offset specified
    const final = elementTop + 100

    const yRange = useTransform(scrollY, [initial, final], [offset, -offset])
    // apply a spring to ease the result
    const y = useSpring(yRange, { stiffness: 400, damping: 90 })
    const ref = useRef(null);

    useLayoutEffect(() => {
        const element = ref.current
        // save our layout measurements in a function in order to trigger
        // it both on mount and on resize
        const onResize = () => {
            // use getBoundingClientRect instead of offsetTop in order to
            // get the offset relative to the viewport
            setElementTop(element.getBoundingClientRect().top + window.scrollY || window.pageYOffset)
            setClientHeight(window.innerHeight)
        }
        onResize()
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [ref])

    const variants = {
        visible: { opacity: 1, scale: 1 },
        hidden: {
            opacity: 0,
        }
    };

    // Don't parallax if the user has "reduced motion" enabled
    if (prefersReducedMotion) {
        return <>{children}</>
    }

    return (
        <motion.div
            ref={ref}
            style={{ y }}
            animate={conInView ? 'visible' : 'hidden'}
            variants={variants}
            transition={{ duration: 2, ease: 'easeOut' }}
            className={useFlex ? 'flex' : ''}
        >
            {children}
        </motion.div>
    )
}