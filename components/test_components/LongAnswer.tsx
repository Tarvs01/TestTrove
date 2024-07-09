import React, {useState, useEffect, ChangeEvent} from 'react'
import { FinalAnswer, LongAnswerQuestionBody } from '../types'
import styles from "../test_components/styles.module.css"

interface LongAnswerProps {
    incomingLongAnswerQuestion: LongAnswerQuestionBody,
    setFinalAnswer: FinalAnswer,
    index: number,
    prevAnswer: string
  }

function LongAnswer({incomingLongAnswerQuestion, setFinalAnswer, index, prevAnswer}: LongAnswerProps) {
    const [answer, setAnswer] = useState("");

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>){
      setAnswer(e.target.value);
      setFinalAnswer(index, e.target.value);
    }
  
    useEffect(() => {
      setAnswer(prevAnswer);
    },[])
  
    return (
      <div className={styles.cover}>
        <h2>{incomingLongAnswerQuestion.q}</h2>
        <textarea name="answer" id="answer" value={answer} onChange={handleChange} className='border-2 border-gray-300 my-3 w-full max-w-lg h-44 px-2 focus:outline-gray-500 focus:border-none rounded-md' >
            Type in your answer
        </textarea>
      </div>
    )
}

export default LongAnswer