'use client'
import React, {useState, useEffect, ChangeEvent} from 'react'
import Editor from '../editor_component/Editor'

function ObjectiveMaker() {
  const [options, setOptions] = useState<{id: number, value: string}[]>([{id: 0, value: ""}, {id: 1, value: ""}]);
  const [question, setQuestion] = useState("");

  function textareaHandler(e: ChangeEvent<HTMLTextAreaElement>,selectedOptionId: number){
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
  return (
    <div className='mx-3'>
      <h3>Type in your question</h3>
      <Editor updateValue={setQuestion} value={question}/>

      <div className='my-5'>
        <h3>Enter the options</h3>
          {
            options.map((option) => {
              return <div key={option.id} className='flex items-center'>
                <p className='mr-3'>{option.id + 1}</p>
                <textarea value={option.value} name={`option${option.id}`} id={`option${option.id}`} className='overflow-hidden w-full max-w-96 resize-none px-2 py-1 my-2 rounded-md border-2 border-gray-400 focus:outline-none focus:border-blue-600' rows={1} onInput={(e: ChangeEvent<HTMLTextAreaElement>) => {textareaHandler(e, option.id)}}></textarea>
                {![0,1].includes(option.id) && <button className='border-2 border-gray-400 mx-2 px-3' onClick={() => {deleteOption(option.id)}}>del</button>}
              </div>
            })
          }
        <button className='border-2 border-gray-400 px-5 py-2 rounded-md mt-6 ml-5' onClick={addNewOption}>Add option</button>
      </div>
    </div>
  )
}

export default ObjectiveMaker