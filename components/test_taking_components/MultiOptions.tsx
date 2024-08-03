"use client";
import React, { useState, useEffect } from "react";
import styles from "../test_taking_components/styles.module.css";
import { MultiOptionsQuestionBody, FinalAnswer } from "./types";

interface MultiOptionsProps{
  incomingMultiOptionsQuestion: MultiOptionsQuestionBody;
  setFinalAnswer: FinalAnswer;
  index: number;
  prevAnswer: number[];
}

function MultiOptions({incomingMultiOptionsQuestion, setFinalAnswer, index, prevAnswer}: MultiOptionsProps) {
  const [question, setQuestion] = useState<MultiOptionsQuestionBody>({q: "", options: []});
  const [answer, setAnswer] = useState<number[]>([])

  function toggleSelected(optionId: number){
    if(answer.includes(optionId)){
      let tempAnswer = answer.filter((ans) => ans !== optionId);
      setAnswer(tempAnswer);
    }
    else{
      setAnswer([...answer, optionId]);
    }
    console.log(answer);
  }

  useEffect(() => {
    let tempOptionsHolder = incomingMultiOptionsQuestion.options.map((option, index) => {
      if(prevAnswer.includes(option.id)){
        return {id: option.id, value: option.value, selected: true}
      }
      else{
        return option;
      }
    });

    setQuestion({q: incomingMultiOptionsQuestion.q, options: tempOptionsHolder});
    setAnswer(prevAnswer);
  }, []);

  useEffect(() => {
    setFinalAnswer(index, answer)
  }, [answer]);

  return (
    <div>
      <h3>{question.q}</h3>

      <ul>
        {question.options.map((option) => {
          return (
            <li
              key={option.id}
              className={`border-b px-2 my-3 rounded-md flex items-center hover:bg-gray-100 ${styles.option_list}`}
            >
              <input
                type="checkbox"
                name="check"
                id={`check${option.id}`}
                className="w-4 h-4"
                checked={answer.includes(option.id) ? true : false}
                onChange={() => toggleSelected(option.id)}
              />
              <label
                htmlFor={`check${option.id}`}
                className=" w-full block pl-4 py-3"
              >
                {option.value}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MultiOptions;
