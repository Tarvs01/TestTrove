'use client'
import React, {useState} from 'react'
import { ShortAnswerQuestionBody } from '../types';

interface ShortAnswerProps {
  incomingShortAnswerQuestion: ShortAnswerQuestionBody
}

function ShortAnswer({incomingShortAnswerQuestion} : ShortAnswerProps) {
  const [answer, setAnswer] = useState("");
  return (
    <div>
      <h2>{incomingShortAnswerQuestion.q}</h2>
      <input type="text" name="answer" id="answer" className='block border-2 border-b-gray-400' />
    </div>
  )
}

export default ShortAnswer