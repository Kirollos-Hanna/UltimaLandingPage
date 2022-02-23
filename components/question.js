import React, { useState } from 'react';
import styles from './question.module.css'
import ArrowDown from './icons/arrow_down';
import ArrowUp from './icons/arrow_up';
const uniqueId = require('lodash.uniqueid');
const { motion, AnimatePresence } = require("framer-motion");

export default function Question(props) {
    const [showAnswer, setShowAnswer] = useState(false)
    const handleQuestionClick = () => {
        setShowAnswer(!showAnswer)
    }
    const [id] = useState(uniqueId('answer-'))

    const ans = props.answer.split("\\n").map((answer, ind) =>
        <p key={ind}>{answer}</p>
    );

    return (
        <div className={`h-full w-full ${styles["faq-question-container"]}`}>
            <div onClick={() => handleQuestionClick()} className={`w-full ${styles["question-container"]}`}>
                <p className={styles['question']}>{props.question}</p>
                {(!showAnswer && <ArrowDown />) || (showAnswer && <ArrowUp />)}
            </div>
            <AnimatePresence>
                {showAnswer &&
                    (<motion.div
                        key={id}
                        initial={{ height: "0", margin: "0" }}
                        animate={{ height: 'inherit', margin: "16px 0" }}
                        exit={{ height: "0px", margin: "0px" }}
                        className={styles['answer']}
                    >
                        {ans}
                    </motion.div>
                    )}
            </AnimatePresence>
        </div>
    );
}