"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import Textarea from "./Textarea";
import Button from "./Button";
import Image from "next/image";
import Trashcan from "../../assets/icons/trash-solid.svg";
import Editor from "../editor_component/Editor";
import { nanoid } from "nanoid";
import { ShortAnswer } from "./types";

function ShortAnswerMaker() {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState<{ id: number; value: string }[]>([
    { id: 0, value: "" },
  ]);
  const [error, setError] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  function textareaHandler(
    e: ChangeEvent<HTMLTextAreaElement>,
    selectedAnswerId: number
  ) {
    setError("");
    let tempAnswers: { id: number; value: string }[] = answers.map((answer) => {
      if (answer.id === selectedAnswerId) {
        return { id: answer.id, value: e.target.value };
      }
      return answer;
    });

    setAnswers(tempAnswers);
  }

  function checkboxHandler(e: ChangeEvent<HTMLInputElement>){
    setIsChecked(!isChecked);
  }

  function deleteOption(selectedAnswerId: number){
    let optionIdS = -1;
    let tempAnswers: { id: number; value: string }[] = answers.reduce(
      (tempAnswers: { id: number; value: string }[], answer) => {
        if (answer.id === selectedAnswerId) {
          return tempAnswers;
        }

        optionIdS += 1;
        tempAnswers = [...tempAnswers, { id: optionIdS, value: answer.value }];
        return tempAnswers;
      },
      []
    );

    setAnswers(tempAnswers)
  }

  function addNewOption(){
    const numberOfOptions = answers.length;

    setAnswers([...answers, { id: numberOfOptions, value: "" }]);
  }

  function handleSubmit(){
    if(question.trim() === ""){
      setError("There must be a question");
      return;
    }
    for(let answer of answers){
      if(answer.value.trim() === ""){
        setError("All answers must have a value");
        return;
      }
    }

    let finalQuestion : ShortAnswer = {
      id: nanoid(),
      question: question,
      answers: answers,
      strictAnswers: isChecked
    }
    
    setError("good to go");
  }

  return (
    <div>
      <div>
        <h3>Enter your question</h3>
        <Editor value={question} updateValue={setQuestion} />
      </div>

      <div className="my-5">
        <h3>Enter all valid answers</h3>
        <ul className="my-3">
          {answers.map((answer) => {
            return (
              <li key={answer.id} className="flex items-center my-2">
                <p className="mr-2">{answer.id + 1}</p>
                <Textarea
                  name={`answer ${answer.id}`}
                  id={`answer-${answer.id}`}
                  value={answer.value}
                  onInput={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    textareaHandler(e, answer.id)
                  }
                />
                {answer.id !== 0 && (
                  <div
                    onClick={() => deleteOption(answer.id)}
                    className="ml-3 cursor-pointer"
                  >
                    <Image src={Trashcan} alt="delete" width={15} height={15} />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <Button text="Add Answer" onClick={addNewOption} />
      </div>

      <div className="flex flex-nowrap items-center">
        <input type="checkbox" name="strict" id="strict" checked={isChecked} onChange={checkboxHandler} className="mr-2 w-4 h-4"/>
        <label htmlFor="strict">Check this box if you want the answers to be marked exactly as is i.e. Same casing, punctuations .e.t.c</label>
      </div>

      <div className='mt-3 flex flex-col items-center'>
        <h3 className='my-2 text-red-600'>{error}</h3>
        <Button text='Submit' onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default ShortAnswerMaker;
