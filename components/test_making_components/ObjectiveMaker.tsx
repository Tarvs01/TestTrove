'use client'
import React, {useState, useEffect, ChangeEvent} from 'react'
import Editor from '../editor_component/Editor'
import Image from 'next/image'
import Trashcan from "../../assets/icons/trash-solid.svg"
import Textarea from './Textarea'
import Button from './Button'

function ObjectiveMaker() {
  const [options, setOptions] = useState<{id: number, value: string}[]>([{id: 0, value: ""}, {id: 1, value: ""}]);
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");

  function textareaHandler(e: ChangeEvent<HTMLTextAreaElement>,selectedOptionId: number){
    setError("");
    let tempOptions : {id: number, value: string}[] = options.map((option) => {
      if(option.id === selectedOptionId){
        return {id: option.id, value: e.target.value};
      }
      return option
    });

    setOptions(tempOptions);
  }

  function addNewOption(){
    const numberOfOptions = options.length;

    setOptions([...options, {id: numberOfOptions, value: ""}]);
  }

  function deleteOption(selectedOptionId: number){
    let optionIdS = -1;
    let tempOptions: {id: number, value: string}[] = options.reduce((tempOptions: {id: number, value: string}[], option) => {
      if(option.id === selectedOptionId){
        return tempOptions;
      }

      optionIdS += 1;
      tempOptions = [...tempOptions, {id: optionIdS, value: option.value}];
      return tempOptions;
    }, []);

    setOptions(tempOptions);
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

    setError("good to go");
  }
  return (
    <div className='mx-3'>
      <div>
        <h3>Type in your question</h3>
        <Editor updateValue={setQuestion} value={question}/>
      </div>

      <div className='my-5'>
        <h3>Enter the options</h3>
          <ul>
          {
            options.map((option) => {
              return <li key={option.id} className='flex items-center my-2'>
                <p className='mr-3'>{option.id + 1}</p>
                <Textarea value={option.value} name={`option ${option.id}`} id={`option${option.id}`} onInput={(e: ChangeEvent<HTMLTextAreaElement>) => textareaHandler(e, option.id)} />
                {![0,1].includes(option.id) && <div onClick={() => deleteOption(option.id)} className='ml-3 cursor-pointer'><Image src={Trashcan} alt='delete' width={15} height={15}/></div>}
              </li>
            })
          }
          </ul>
          <Button text='Add Option' onClick={addNewOption} />

        <div className='mt-3 flex flex-col items-center'>
          <h3 className='my-2 text-red-600'>{error}</h3>
          <Button text='Submit' onClick={handleSubmit} />
            </div>
      </div>
    </div>
  )
}

export default ObjectiveMaker