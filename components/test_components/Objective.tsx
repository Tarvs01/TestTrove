"use client"
import React, {useState, useEffect} from 'react'
import { ObjectiveQuestionBody } from '../types';

interface ObjectiveProps{
  incomingObjectiveQuestion: ObjectiveQuestionBody
}

function Objective({incomingObjectiveQuestion} : ObjectiveProps) {
  const [currentOption, setCurrentOption] = useState(0);
  const [question, setQuestion] = useState<ObjectiveQuestionBody>({q: "", options: []})
    /* let question = {
        q: "What game has the best gameplay?",
        options: ["GTA V", "Sekiro", "Spiderman", "Elden Ring"]
    } */

  useEffect(() => {
    setQuestion(incomingObjectiveQuestion);
  },[]);
  return (
    <div className="w-11/12 max-w-lg my-12.5 mx-10 sm:mx-auto ">
      <h3 className='mb-2'>{question.q}</h3>
      <ul className='flex flex-col w-full'>
        {
            question.options.map((single, index) => {
                return <li key={index} onClick={() => {setCurrentOption(index)}} className={`${currentOption === index ? "border-purple-800 border-2" : "border-gray-300 border-2"} my-1 py-3 px-3 rounded-xl transition linear duration-300 hover:bg-gray-200 `}>
                    <input type="radio" name="option" id={`opt${index}`} className='appearance-none'/>
                    <label htmlFor={`opt${index}`}>{single}</label>
                </li>
            })
        }
      </ul>
    </div>
  )
}

export default Objective