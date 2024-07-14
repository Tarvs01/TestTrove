'use client'
import React, {useState, useEffect, ChangeEvent} from 'react'
import Editor from '../editor_component/Editor';
import Image from 'next/image';
import DownArrow from "../../assets/icons/arrow-down-solid.svg"
import Trashcan from "../../assets/icons/trash-solid.svg"

function OrderingMaker() {
    const [orderItems, setOrderItems] = useState<{id:number, value: string}[]>([{id: 0, value: ""}, {id: 1, value: ""}]);
    const [question, setQuestion] = useState("");
    const [error, setError] = useState("");

    function textareaHandler(e: ChangeEvent<HTMLTextAreaElement>, selectedOptionId: number){
        setError("");
        let tempItems : {id: number, value: string}[] = orderItems.map((item) => {
            if(item.id === selectedOptionId){
              return {id: item.id, value: e.target.value};
            }
            return item;
          });

        setOrderItems(tempItems);

        e.target.style.height = "1px";
        e.target.style.height = `${5 + e.target.scrollHeight}px`;
    }

    function addItem(){
        setOrderItems([...orderItems, {id: orderItems.length, value: ""}]);
    }

    function deleteItem(selectedItemId: number){
        let itemIdS = -1;
        let tempItems: {id: number, value: string}[] = orderItems.reduce((tempItems: {id: number, value: string}[], item) => {
        if(item.id === selectedItemId){
            return tempItems;
        }

        itemIdS += 1;
        tempItems = [...tempItems, {id: itemIdS, value: item.value}];
        return tempItems;
        }, []);

        setOrderItems(tempItems);
    }

    function handleSubmit(){
        if(question.trim() === ""){
            setError("There must be a question");
            return;
        };

        for(let item of orderItems){
            if(item.value.trim() === ""){
                setError("All items must have a value");
                return;
            }
        }
        setError("Good to go")
    }

  return (
    <div className='mx-2 max-w-screen-md'>
        <div>
            <h3>Type in your question</h3>
            <Editor updateValue={setQuestion} value={question} />
        </div>

        <div>
            <h3>Enter the options in Order</h3>
            {
                orderItems.map((item) => {
                    return <div key={item.id}>
                        {(item.id !== 0) && <div className='w-full max-w-80 my-3 flex justify-center'><Image src={DownArrow} alt='down-arrow' width={20} height={20}/></div>}
                        <div className='flex items-center'>
                            <textarea value={item.value} rows={1} onInput={(e: ChangeEvent<HTMLTextAreaElement>) => textareaHandler(e, item.id)} className='border-2 border-gray-300 w-full max-w-80 resize-none px-2 py-1 overflow-hidden rounded-lg focus:outline-none focus:border-blue-600'></textarea>
                            {![0,1].includes(item.id) && <div onClick={() => deleteItem(item.id)} className='ml-3 cursor-pointer'><Image src={Trashcan} alt='delete' width={15} height={15}/></div>}
                        </div>
                    </div>
                })
            }
            <button onClick={addItem} className='border-2 border-gray-400 px-5 py-2 rounded-md mt-6 ml-5'>Add Item</button>
        </div>

        <div className='mt-3 flex flex-col items-center'>
            <h3 className='my-2 text-red-600'>{error}</h3>
            <button onClick={handleSubmit} className='border-2 border-gray-400 px-5 py-2 rounded-md ml-5 w-fit'>Submit</button>
        </div>
    </div>
  )
}

export default OrderingMaker