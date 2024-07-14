'use client'
import React, {useState, useEffect, ChangeEvent} from 'react'
import Image from 'next/image'
import RightArrow from "../../assets/icons/arrow-right-solid.svg"
import Trashcan from "../../assets/icons/trash-solid.svg"
import Editor from '../editor_component/Editor'

function MatcherMaker() {
    const [matches, setMatches] = useState<{id: number, right: string, left: string}[]>([{id: 0, left: "", right: ""}, {id: 1, left: "", right: ""}]);
    const [question, setQuestion] = useState("");
    const [error, setError] = useState("");

    function handleTextarea(e: ChangeEvent<HTMLTextAreaElement>, selectedMatchId: number, direction: string){
        setError("");
        let tempMatches : {id: number, left: string, right: string}[] = matches.map((match) => {
            if(match.id === selectedMatchId){
                if(direction === "L"){
                    return {id: match.id, left: e.target.value, right: match.right};
                }
                else{
                    return {id: match.id, left: match.left, right: e.target.value};
                }
            }
            
            return match;
          });

        setMatches(tempMatches);

        e.target.style.height = "1px";
        e.target.style.height = `${5 + e.target.scrollHeight}px`;
    }

    function addMatch(){
        setMatches([...matches, {id: matches.length, left: "", right: ""}])
    }

    function deleteMatch( selectedMatchId: number){
        let matchIdS = -1;
        let tempMatches: {id: number, left: string, right: string}[] = matches.reduce((tempMatches: {id: number, left: string, right: string}[], match) => {
        if(match.id === selectedMatchId){
            return tempMatches;
        }

        matchIdS += 1;
        tempMatches = [...tempMatches, {id: matchIdS, left: match.left, right: match.right}];
        return tempMatches;
        }, []);

        setMatches(tempMatches);
    }

    function handleSubmit(){
        console.log(question);
        if(question.trim() === ""){
            setError("There must be a question");
            return;
        }

        for(let match of matches){
            if(match.left === "" || match.right === ""){
                setError("All matches must have a value");
                return;
            }
        }

        setError("Good to go");
    }

  return (
    <div>
        <div>
            <h3>Type in your question</h3>
            <Editor updateValue={setQuestion} value={question} />
        </div>

        <div>
            <h3>Enter the matches</h3>
            {
                matches.map((match) => {
                    return <div key={match.id} className='flex flex-nowrap items-center mb-5'>
                        <textarea name="left-item" value={match.left} onInput={(e: ChangeEvent<HTMLTextAreaElement>) => handleTextarea(e, match.id, "L")} rows={1} className='border-2 border-gray-300 w-1/2 max-w-80 resize-none px-2 py-1 overflow-hidden rounded-lg focus:outline-none focus:border-blue-600'></textarea>
                        <div className='mx-2'><Image src={RightArrow} alt='right-arrow' width={20} height={20} /></div>
                        <textarea name="left-item" value={match.right} onInput={(e: ChangeEvent<HTMLTextAreaElement>) => handleTextarea(e, match.id, "R")} rows={1} className='border-2 border-gray-300 w-1/2 max-w-80 resize-none px-2 py-1 overflow-hidden rounded-lg focus:outline-none focus:border-blue-600'></textarea>
                        {![0,1].includes(match.id) && <div onClick={() => deleteMatch(match.id)} className='ml-3 cursor-pointer'><Image src={Trashcan} alt='delete' width={15} height={15}/></div>}
                    </div>
                })
            }
            <button onClick={addMatch} className='border-2 border-gray-400 px-5 py-2 rounded-md ml-5 w-fit'>Add match</button>
        </div>

        <div className='mt-3 flex flex-col items-center'>
            <h3 className='my-2 text-red-600'>{error}</h3>
            <button onClick={handleSubmit} className='border-2 border-gray-400 px-5 py-2 rounded-md ml-5 w-fit'>Submit</button>
        </div>
    </div>
  )
}

export default MatcherMaker