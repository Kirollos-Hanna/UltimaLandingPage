import { Canvas } from '@react-three/fiber'
import styles from './index.module.css'
import Mountains3 from '../components/mountains3'
import Mountains2 from '../components/mountains2'
import Mountains1 from '../components/mountains1'
import Logo from '../components/logo'
import ScreenHero from '../components/screenHero'
import Model from '../components/model'
import FlameIcon from '../components/icons/flame_icon'
import IceIcon from '../components/icons/ice_icon'
import MoneyIcon from '../components/icons/money_icon'
import Question from '../components/question'
import Head from 'next/head'
import { Suspense, useState, useLayoutEffect, useRef } from 'react'
import { Color } from 'three'
const { motion, useViewportScroll, useTransform, useSpring, useReducedMotion } = require("framer-motion");
import { useInView } from 'react-intersection-observer';

export default function Home() {
  const prefersReducedMotion = useReducedMotion()
  const offset = 50
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

  const [elementTop2, setElementTop2] = useState(0);
  const [clientHeight2, setClientHeight2] = useState(0);
  const initial2 = elementTop2 - clientHeight2
  const final2 = elementTop2 + 100
  const yRange2 = useTransform(scrollY, [initial2, final2], [offset, -offset])
  const y2 = useSpring(yRange2, { stiffness: 400, damping: 90 })
  const ref2 = useRef(null);
  
  const [elementTop3, setElementTop3] = useState(0);
  const [clientHeight3, setClientHeight3] = useState(0);
  const initial3 = elementTop3 - clientHeight3
  const final3 = elementTop3 + 100
  const yRange3 = useTransform(scrollY, [initial3, final3], [offset, -offset])
  const y3 = useSpring(yRange3, { stiffness: 400, damping: 90 })
  const ref3 = useRef(null);

  const [elementTop4, setElementTop4] = useState(0);
  const [clientHeight4, setClientHeight4] = useState(0);
  const initial4 = elementTop4 - clientHeight4
  const final4 = elementTop2 + 100
  const yRange4 = useTransform(scrollY, [initial4, final4], [offset, -offset])
  const y4 = useSpring(yRange4, { stiffness: 400, damping: 90 })
  const ref4 = useRef(null);

  const [containerRef, coninView, entry] = useInView({
    /* Optional options */
    threshold: 0.5,
    triggerOnce: false
  })
  const [container2Ref, con2inView, entry2] = useInView({
    /* Optional options */
    threshold: 0.5,
    triggerOnce: false
  })
  const [container3Ref, con3inView, entry3] = useInView({
    /* Optional options */
    threshold: 0.5,
    triggerOnce: false
  })
  const [container4Ref, con4inView, entry4] = useInView({
    /* Optional options */
    threshold: 0.5,
    triggerOnce: false
  })

  const mountain1y = useTransform(scrollY, [0, 300], [0, -100]);
  const mountain2y = useTransform(scrollY, [0, 300], [0, -30]);

  const calcRefParallax = (ref, setElementTop, setClientHeight) => {
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
  }

  useLayoutEffect(() => {
    return calcRefParallax(ref, setElementTop, setClientHeight)
  }, [ref])

  useLayoutEffect(() => {
    return calcRefParallax(ref2, setElementTop2, setClientHeight2)
  }, [ref2])

  useLayoutEffect(() => {
    return calcRefParallax(ref3, setElementTop3, setClientHeight3)
  }, [ref3])

  useLayoutEffect(() => {
    return calcRefParallax(ref4, setElementTop4, setClientHeight4)
  }, [ref4])

  // Don't parallax if the user has "reduced motion" enabled
  if (prefersReducedMotion) {
    return <>{children}</>
  }

  const variants = {
    visible: { opacity: 1, scale: 1, y: 0 },
    hidden: {
      opacity: 0,
    }
  };

  const elem = typeof document !== "undefined" ? document.getElementById("h-image") : null;

  const handleMouseMove = (ev) => {
    const heroImgRect = elem !== null ? elem.getBoundingClientRect() : null;
    if (heroImgRect) {
      const midX = heroImgRect.x + (heroImgRect.width / 2),
        midY = heroImgRect.y + (heroImgRect.height / 2),
        curXVal = (ev.pageX > midX ? 1 : -1) * (Math.abs(ev.pageX - midX)),
        curYVal = (ev.pageY > midY ? 1 : -1) * (Math.abs(ev.pageY - midY)),
        percentXVal = curXVal / midX,
        percentYVal = curYVal / midY,
        a4Transform = (percentXVal <= 1 && percentXVal >= -1 ? percentXVal : 1) * 0.0005,
        b4Transform = (percentYVal <= 1 && percentYVal >= -1 ? percentYVal : 1) * 0.0001
      // For reference below
      /* mid point a4 = 0, b4 = 0 */
      /* extreme left a4 = -0.0005 */
      /* extreme right a4 = 0.0005 */
      /* extreme top b4 = 0.0001 */
      /* extreme bottom b4 = -0.0001 */

      /* a4 -> mouseX val, b4 -> mouseY val */
      /* transform: matrix3d(1, 0, 0, -0.0005,
              0, 1, 0, -0.00008,
              0, 0, 1, 0,
              0, 0, 0, 1); */
      elem.style.transform = `matrix3d(1,0,0,${a4Transform}, 0, 1, 0, ${b4Transform}, 0, 0, 1, 0, 0, 0, 0, 1)`
    }
  }

  return (
    <div onMouseMove={(ev) => handleMouseMove(ev)} className={`h-full w-full hide-x-overflow ${styles['background-radial-gradient']}`}>
      <Head>
        <title>Ultima - Habit Builder</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <motion.div
        className={styles['full-page-height']}
      >
        <motion.div style={{ y: mountain1y }} initial={{ opacity: 0, y: "80vh" }} transition={{ duration: 0.5, type: "spring" }} animate={{ opacity: 1, y: 0 }} className={styles['mountains']}>
          <Mountains1 />
        </motion.div>
        <motion.div style={{ y: mountain2y }} initial={{ opacity: 0, y: "50vh" }} transition={{ delay: 0.5, duration: 0.5, type: "spring" }} animate={{ opacity: 1, y: 0 }} className={styles['mountains']}>
          <Mountains2 />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: "30vh" }} transition={{ delay: 1, duration: 0.5, type: "spring" }} animate={{ opacity: 1, y: 0 }} className={styles['mountains']}>
          <Mountains3 />
        </motion.div>
        <div className={`${styles['hero-landing-page-land-container']}`}>
          <div className={styles['hero-landing-page-land']}></div>
        </div>
        <div className={styles['canvas-container']}>
          <Canvas>
            <ambientLight intensity={0.1} />
            <directionalLight color={new Color(0x523D5C)} position={[0, 0, 5]} />
            <Suspense fallback={null}>
              <Model />
            </Suspense>
          </Canvas>
        </div>

        <motion.div
          initial={{ opacity: 0, y: "-40vh" }}
          transition={{ delay: 1.5, duration: 0.5, type: "spring" }}
          animate={{ opacity: 1, y: 0 }}
          className={styles['logo-container']}>
          <Logo />
        </motion.div>
        <div className={styles['hero-section-container']}>
          <motion.div
            initial={{ opacity: 0, x: "-40vw" }}
            transition={{ delay: 1.5, duration: 1, type: "spring" }}
            animate={{ opacity: 1, x: 0 }}
            className={styles['hero-text-container']}>
            <h1>Create Long-Lasting Habits</h1>
            <h3>solidify your habits
              with the power of streaks
              and streak freezes </h3>
            <button
              className={styles['hero-button-container']}
            >
              <a target="_blank" href='https://play.google.com/store/apps/details?id=com.kairman.ultima_habit_builder'>Download the App</a>
            </button>
          </motion.div>
          <motion.div
            initial={{ x: "40vw" }}
            transition={{ delay: 1.5, opacity: 0, duration: 1, type: "spring" }}
            animate={{ opacity: 1, x: 0 }}
            className={styles['hero-image-container']}>
            <ScreenHero />
          </motion.div>
        </div>
      </motion.div>
      <motion.div ref={containerRef} className={`${styles['full-page-height']} ${styles['purple-background']} ${styles['streak-feature-section']}`}>
        <motion.div
          ref={ref}
          style={{ y }}
          animate={coninView ? 'visible' : 'hidden'}
          variants={variants}
          transition={{ duration: 2, ease: 'easeOut' }}
          className={`${styles['item-container-flame']}`}>
          <FlameIcon />
        </motion.div>
        <motion.div ref={ref}
          style={{ y }}
          animate={coninView ? 'visible' : 'hidden'}
          variants={variants}
          transition={{ duration: 2, ease: 'easeOut' }}
          className={styles['vertical-rule']}></motion.div>
        <motion.div ref={ref}
          style={{ y }}
          animate={coninView ? 'visible' : 'hidden'}
          variants={variants}
          transition={{ duration: 2, ease: 'easeOut' }}
          className={styles['streak-feature-text']}>
          <h1>Habit Streaks</h1>
          <p>Leverage the power of habit streaks
            to create unbreakable habits.</p>
          <p>The longer your streak is,
            the stronger your habit.</p>
        </motion.div>
      </motion.div>
      <motion.div ref={container2Ref} className={`${styles['full-page-height']} ${styles['purple-background']} ${styles['streak-freeze-feature-section']}`}>
        <motion.div
          ref={ref2}
          style={{ y2 }}
          animate={con2inView ? 'visible' : 'hidden'}
          variants={variants}
          transition={{ duration: 2, ease: 'easeOut' }}
          className={styles['streak-freeze-feature-text']}>
          <h1>Streak Freezes</h1>
          <p>Streak freezes are the helping hand in your tough days.</p>
          <p>Whenever you're too busy to
            complete your habit for the day,
            simply buy a streak freeze to keep
            your streak safe.</p>
        </motion.div>
        <motion.div
          ref={ref2}
          style={{ y2 }}
          animate={con2inView ? 'visible' : 'hidden'}
          variants={variants}
          transition={{ duration: 2, ease: 'easeOut' }}
          className={styles['vertical-rule']}></motion.div>
        <motion.div
          ref={ref2}
          style={{ y2 }}
          animate={con2inView ? 'visible' : 'hidden'}
          variants={variants}
          transition={{ duration: 2, ease: 'easeOut' }}
          className={`${styles['item-container-ice']}`}>
          <IceIcon />
        </motion.div>
      </motion.div>
      <motion.div ref={container3Ref} className={`${styles['full-page-height']} ${styles['purple-background']} ${styles['free-section']}`}>
        <motion.div
          ref={ref3}
          style={{ y3 }}
          animate={con3inView ? 'visible' : 'hidden'}
          variants={variants}
          transition={{ duration: 2, ease: 'easeOut' }}
          className={`${styles['item-container-money']}`}>
          <MoneyIcon />
        </motion.div>
        <motion.div
          ref={ref3}
          style={{ y3 }}
          animate={con3inView ? 'visible' : 'hidden'}
          variants={variants}
          transition={{ duration: 2, ease: 'easeOut' }}
          className={styles['vertical-rule']}></motion.div>
        <motion.div
          ref={ref3}
          style={{ y3 }}
          animate={con3inView ? 'visible' : 'hidden'}
          variants={variants}
          transition={{ duration: 2, ease: 'easeOut' }}
          className={styles['free-text']}>
          <h1>Free Forever</h1>
          <p>Ultima doesn’t require hosting and is
            the hobby project of <a href="https://twitter.com/Kiromoth">Kiromoth</a>.</p>
          <p>If you want to support the project, please
            check out the <a href="https://www.patreon.com/kiromoth">Patreon page</a>. You’ll also get
            updates on future feature plans and see the
            roadmap for the app.</p>
        </motion.div>
      </motion.div>
      <motion.div ref={container4Ref} className={`${styles['purple-background']} ${styles['faq-section']}`}>
        <motion.h1
          ref={ref4}
          style={{ y4 }}
          animate={con4inView ? 'visible' : 'hidden'}
          variants={variants}
          transition={{ duration: 2, ease: 'easeOut' }}
        >FAQ</motion.h1>
        <motion.div
          ref={ref4}
          style={{ y4 }}
          animate={con4inView ? 'visible' : 'hidden'}
          variants={variants}
          transition={{ duration: 2, ease: 'easeOut' }}>
          <Question
            question="How does the app work?"
            answer="1- Create a habit you want to do.\n2- Do it.\nThat’s it. But the power of the app won’t appear until you’ve managed to do your habits 3 times (in total). That’s when you’ll be able to buy a streak freeze for a habit and keep your streak safe."
          />
          <Question question="Can I sell my streak freezes?" answer="Yes, simply double-tap the streak freeze that you bought." />
          <Question question="How is my data stored?" answer="The app collects zero data, so all your data is stored locally on your device. Be careful of this, because if you delete the app without exporting your data, then all your data will be deleted." />
          <Question question="What if I want to migrate my data to another phone/tablet?" answer="1- Navigate to Android->data->com.kairman.ultima_habit_builder\n2- copy the whole folder into your other device’s Android->data folder.\n3- press the import button on the app.\nFor any questions or troubleshooting, DM me on Twitter" />
        </motion.div>
        <motion.div
          ref={ref4}
          style={{ y4 }}
          animate={con4inView ? 'visible' : 'hidden'}
          variants={variants}
          className={styles['cta-container']}
        >
          <button
            className={styles['hero-button-container']}
          >
            <a target="_blank" href='https://play.google.com/store/apps/details?id=com.kairman.ultima_habit_builder'>Download the App</a>
          </button>
        </motion.div>
      </motion.div>
      <motion.footer className={`w-full ${styles['purple-background']} ${styles['footer-section']}`}>
        <div className={`${styles['social-links-container']}`}>
          <a target="_blank" href="https://twitter.com/Kiromoth">Twitter</a>
          <a target="_blank" href="https://www.patreon.com/kiromoth">Patreon</a>
          <a target="_blank" href="https://ko-fi.com/kiromoth">Ko-Fi</a>
        </div>
        <div className={`${styles['legals-container']}`}>
          <a target="_blank" href="https://pages.flycricket.io/ultima-1/privacy.html">Privacy Policy</a>
          <a target="_blank" href="https://pages.flycricket.io/ultima-1/terms.html">Terms of Service</a>
        </div>
      </motion.footer>
    </div >
  )
}
