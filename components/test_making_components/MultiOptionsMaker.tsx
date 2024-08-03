"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import Textarea from "./Textarea";
import Button from "./Button";
import Image from "next/image";
import Trashcan from "../../assets/icons/trash-solid.svg";
import Editor from "../editor_component/Editor";
import { MultiOptions } from "./types";
import { nanoid } from "nanoid";

function MultiOptionsMaker() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<{ id: number; value: string }[]>([
    { id: 0, value: "" },
    { id: 1, value: "" },
  ]);
  const [error, setError] = useState("");
  const [answer, setAnswer] = useState<number[]>([]);

  function textareaHandler(
    e: ChangeEvent<HTMLTextAreaElement>,
    selectedOptionId: number
  ) {
    setError("");
    let tempOptions: { id: number; value: string }[] = options.map((option) => {
      if (option.id === selectedOptionId) {
        return { id: option.id, value: e.target.value };
      }
      return option;
    });

    setOptions(tempOptions);
  }

  function addNewOption() {
    const numberOfOptions = options.length;

    setOptions([...options, { id: numberOfOptions, value: "" }]);
  }

  function deleteOption(selectedOptionId: number) {
    let optionIdS = -1;
    let tempOptions: { id: number; value: string }[] = options.reduce(
      (tempOptions: { id: number; value: string }[], option) => {
        if (option.id === selectedOptionId) {
          return tempOptions;
        }

        optionIdS += 1;
        tempOptions = [...tempOptions, { id: optionIdS, value: option.value }];
        return tempOptions;
      },
      []
    );

    let tempAns = answer.filter((ans) => ans !== selectedOptionId);
    setAnswer(tempAns);

    setOptions(tempOptions);
  }

  function handleCheckboxChange(selectedCheckBoxId: number) {
    if (answer.includes(selectedCheckBoxId)) {
      let tempIDs = answer.filter((ans) => ans !== selectedCheckBoxId);
      setAnswer(tempIDs);
    } else {
      setAnswer([...answer, selectedCheckBoxId]);
    }
  }

  function handleSubmit(){
    if(question.trim() === ""){
      setError("There must be a question");
      return;
    }
    for(let option of options){
      if(option.value.trim() === ""){
        setError("All options must have a value");
        return;
      }
    }
    if(answer.length === 0){
        setError("There must be at least one answer selected");
        return;
    }

    let finalQuestion: MultiOptions = {
      id: nanoid(),
      question: question,
      answer: answer,
      options: options
    }

    setError("good to go");
  }

  return (
    <div>
      <div>
        <h3>Enter your question</h3>
        <Editor value={question} updateValue={setQuestion} />
      </div>

      <div>
        <h3>Enter the options</h3>
        <ul>
          {options.map((option) => {
            return (
              <li key={option.id} className="flex items-center my-2">
                <p className="mr-3">{option.id + 1}</p>
                <Textarea
                  value={option.value}
                  name={`option ${option.id}`}
                  id={`option${option.id}`}
                  onInput={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    textareaHandler(e, option.id)
                  }
                />
                {![0, 1].includes(option.id) && (
                  <div
                    onClick={() => deleteOption(option.id)}
                    className="ml-3 cursor-pointer"
                  >
                    <Image src={Trashcan} alt="delete" width={15} height={15} />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
         <Button onClick={addNewOption} text="Add Option" />
      </div>

      <div className="mt-5">
        <h3>Select which of these options are correct</h3>
        <ul>
          {options.map((option) => {
            return (
              <li
                key={option.id}
                className="px-2 flex flex-nowrap items-center my-2"
              >
                <input
                  type="checkbox"
                  name="option"
                  id={`opt-${option.id}`}
                  onChange={() => handleCheckboxChange(option.id)}
                  checked={answer.includes(option.id) ? true : false}
                  className="w-4 h-4"
                />
                <label htmlFor={`opt-${option.id}`} className="pl-3">
                  {option.value}
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      <div className='mt-3 flex flex-col items-center'>
        <h3 className='my-2 text-red-600'>{error}</h3>
        <Button text='Submit' onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default MultiOptionsMaker;
