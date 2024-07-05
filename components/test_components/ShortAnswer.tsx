'use client'
import React, {useState, useEffect, ChangeEvent} from 'react'
import { ShortAnswerQuestionBody, FinalAnswer } from '../types';

interface ShortAnswerProps {
  incomingShortAnswerQuestion: ShortAnswerQuestionBody,
  setFinalAnswer: FinalAnswer,
  index: number,
  prevAnswer: string
}

function ShortAnswer({incomingShortAnswerQuestion, setFinalAnswer, index, prevAnswer} : ShortAnswerProps) {
  const [answer, setAnswer] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement>){
    setAnswer(e.target.value);
    setFinalAnswer(index, e.target.value);
  }

  useEffect(() => {
    setAnswer(prevAnswer);
  },[])

  return (
    <div>
      <h2>{incomingShortAnswerQuestion.q}</h2>
      <input type="text" name="answer" id="answer" value={answer} onInput={handleChange} className='block border-2 mt-3 w-full max-w-96 h-9 border-blue-500 rounded-md px-1 focus:outline-none ' />
    </div>
  )
}

export default ShortAnswer