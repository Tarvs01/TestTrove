"use client";
import React, { useState, useEffect } from "react";
import styles from "../test_taking_components/styles.module.css";

function CheckboxSelect() {
  const [question, setQuestion] = useState({
    q: "Select all options that are programming languages",
    options: [
      { id: 0, value: "Javascript", selected: false },
      { id: 1, value: "Python", selected: false },
      { id: 2, value: "C++", selected: false },
      { id: 3, value: "CSS", selected: false },
    ],
  });
  const [answer, setAnswer] = useState<number[]>([])

  function toggleSelected(optionId: number){
    let tempOptions: {id: number, value: string, selected: boolean}[] = question.options.map((option) => {
      if(option.id === optionId){
        if(option.selected){
          let tempAnswer = answer.filter((ans) => ans !== option.id);
          setAnswer(tempAnswer);
        }
        else{
          setAnswer([...answer, option.id]);
        }
        return {id: option.id, value: option.value, selected: !option.selected}
      }
      return option;
    });

    setQuestion({q: question.q, options: tempOptions});
    console.log(answer);
  }
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
                checked={option.selected}
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

export default CheckboxSelect;
