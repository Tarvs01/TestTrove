'use client'
import React, {useState, useEffect, ChangeEvent} from 'react'

function OrderingMaker() {
    const [orderItems, setOrderItems] = useState<{id:number, value: string}[]>([{id: 0, value: ""}, {id: 1, value: ""}]);

    function textareaHandler(e: ChangeEvent<HTMLTextAreaElement>, selectedOptionId: number){
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

  return (
    <div className='mx-2'>
        <div>
            <h3>Type in your question</h3>
        </div>

        <div>
            <h3>Enter the options in Order</h3>
            {
                orderItems.map((item) => {
                    return <div key={item.id}>
                        {(item.id !== 0) && <div className='w-full max-w-80 text-center my-3'>x</div>}
                        <textarea key={item.id} value={item.value} rows={1} onInput={(e: ChangeEvent<HTMLTextAreaElement>) => textareaHandler(e, item.id)} className='border-2 w-full max-w-80 resize-none px-2 py-1 overflow-hidden rounded-lg focus:outline-none focus:border-blue-600'></textarea>
                    </div>
                })
            }
            <button onClick={addItem} className='border-2 border-gray-400 px-5 py-2 rounded-md mt-6 ml-5'>Add Item</button>
        </div>
    </div>
  )
}

export default OrderingMaker