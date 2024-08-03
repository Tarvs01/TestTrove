"use client";
import React, { useState, useEffect } from "react";
import { ObjectiveQuestionBody, FinalAnswer } from "./types";
import styles from "../test_taking_components/styles.module.css"

interface ObjectiveProps {
  incomingObjectiveQuestion: ObjectiveQuestionBody;
  setFinalAnswer: FinalAnswer;
  index: number;
  prevAnswer: number;
}

function Objective({
  incomingObjectiveQuestion,
  setFinalAnswer,
  index,
  prevAnswer,
}: ObjectiveProps) {
  const [currentOption, setCurrentOption] = useState(-1);
  const [question, setQuestion] = useState<ObjectiveQuestionBody>({
    q: "",
    options: [],
  });
  /* let question = {
        q: "What game has the best gameplay?",
        options: ["GTA V", "Sekiro", "Spiderman", "Elden Ring"]
    } */

  useEffect(() => {
    setQuestion(incomingObjectiveQuestion);
    /* const tempAnswerIndex =
      prevAnswer == -1
        ? -1
        : incomingObjectiveQuestion.options.findIndex((a) => a.id == prevAnswer); //Remove this later since it is redundant.
     */
        setCurrentOption(prevAnswer);
  }, []);

  useEffect(() => {
    setFinalAnswer(index, currentOption);
  }, [currentOption]);
  return (
    <div>
      <h3 className="mb-2">{question.q}</h3>
      <ul className="flex flex-col w-full">
        {question.options.map((option) => {
          return (
            <li
              key={option.id}
              onClick={() => setCurrentOption(option.id)}
              className={`${
                currentOption === option.id
                  ? "border-purple-800 border-2"
                  : "border-gray-300 border-2"
              } my-1 py-3 px-3 rounded-xl transition linear duration-200 hover:bg-gray-200 ${styles.option_list}`}
            >
              <input
                type="radio"
                value={option.value}
                name={`option`}
                id={`opt${option.id}`}
                onClick={() => {
                  setCurrentOption(option.id);
                }}
                className="appearance-none"
                tabIndex={0}
              />
              <label htmlFor={`opt${option.id}`}>{option.value}</label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Objective;
