"use client";
import React, { useState, useEffect } from "react";
import { ConnectLines } from "@/lines_component";
import { ConnectElement } from "@/lines_component";
import { Connect, ConnectProvider } from "@/lines_component";
import { MatcherQuestionBody, MatcherSubObject, MatcherAnswer, FinalAnswer } from "./types";

interface MatcherProps {
  incomingMatcherQuestion: MatcherQuestionBody,
  setFinalAnswer: FinalAnswer,
  prevAnswer: MatcherAnswer ,
  index: number
}

function Matcher({incomingMatcherQuestion, setFinalAnswer, prevAnswer, index} : MatcherProps) {
  const [currentSelected, setCurrentSelected] = useState("");
  const [allMatches, setAllMatches] = useState<{
    [index: string]: MatcherSubObject;
  }>({});
  const [leftItems, setLeftItems] = useState<string[]>([]);
  const [rightItems, setRightItems] = useState<string[]>([]);
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
    setAllMatches(prevAnswer);
  },[]);

  useEffect(() => {
    setFinalAnswer(index, allMatches);
  }, [allMatches]);

  const colors = [
    "border-purple-500",
    "border-red-500",
    "border-blue-500",
    "border-green-500",
    "border-orange-500",
    "border-yellow-500",
  ]; //The colors array. Increase it later

  //This runs whenever an item on the left is clicked
  function updateSelected(itemName: string, colorNumber: number) {
    if(currentSelected !== ""){ //If there is a previously selected left item
      let tempAllMatches = {...allMatches};
      delete tempAllMatches[currentSelected]; //Delete the previously selected left item from all matches
      setAllMatches({
        ...tempAllMatches,
        [itemName]: { matchedWith: "", colorIndex: colorNumber },
      }); //And set the current left element in all matches
    }
    else{ //If there is no previously selected left item
      setAllMatches({
        ...allMatches,
        [itemName]: { matchedWith: "", colorIndex: colorNumber },
      }); //set the current left item in all matches
    }
    setCurrentSelected(itemName); //set the currently selected left element
  }

  //This runs whenever an item on the right is clicked
  function matchItems(itemName: string) {
    if (currentSelected === "") { //If an item on the right is clicked without there being an active left element, ignore the click
      return;
    }
    else if(Object.values(allMatches).find((singleItem) => {return singleItem.matchedWith === itemName})){ //This checks if the right item has been previously matched. Yeah, yeah, yeah, I know this if statement is bad but there was little alternative
      console.log("Double match found");
      let tempAllMatches = {...allMatches};
      Object.keys(allMatches).forEach((item) => {
        if(allMatches[item].matchedWith === itemName){ //This finds and deletes the previous match
          delete tempAllMatches[item];
        }
      });
      setAllMatches({...tempAllMatches, [currentSelected]: {
        matchedWith: itemName,
        colorIndex: allMatches[currentSelected].colorIndex,
      }}); //It then matches the right itsm with the current left item. All this is to prevent matching multiple elements to the same element
    } 
    else { //If there are no other issues, this matches the right item with the current active left element
      let tempAllMatches = {
        ...allMatches,
        [currentSelected]: {
          matchedWith: itemName,
          colorIndex: allMatches[currentSelected].colorIndex,
        },
      };

      setAllMatches(tempAllMatches);
    }
    setCurrentSelected("");
  }

  const elements : ConnectElement[] = [
    {id: "ele1", connectWith: [{id: "ele2"}]}
  ]

  useEffect(() => {
    let tempMatcherObject = {};
    setLeftItems(incomingMatcherQuestion.left);
    setRightItems(incomingMatcherQuestion.right);

  }, []);
  return (
    <>
    {
      domLoaded && <ConnectProvider>
      <div>
      <h3>{incomingMatcherQuestion.q}</h3>

      <div className="grid grid-cols-2 w-4/5 mx-auto my-4">
        <h3 className="text-center my-1 font-bold text-lg">{incomingMatcherQuestion.leftHeading}</h3>
        <h3 className="text-center my-1 font-bold text-lg">{incomingMatcherQuestion.rightHeading}</h3>
      <ul>
          {leftItems.map((item, index) => {
            return (
              <Connect id={`left-${item}`} key={index} connectWith={[{id: `${allMatches[item] && allMatches[item].matchedWith ? `right-${allMatches[item].matchedWith}`: ""}`, color: `${allMatches[item] ? colors[index].split("-")[1] : "black"}`}]}>
                <li
                key={index}
                className={`border-2 w-1/2 text-center my-3 py-2 mx-auto rounded-lg ${
                  allMatches[item] ? colors[index] : "border-gray-300"
                } hover:bg-gray-100`}
                onClick={() => updateSelected(item, index)}
              >
                <span>{item}</span>
              </li>
              </Connect>
            );
          })}
        </ul>

        <ul>
          {rightItems.map((item, index) => {
            return (
              <Connect key={index} id={`right-${item}`}>
                <li
                className={`border-2 w-1/2 text-center my-3 py-2 mx-auto rounded-lg ${
                  Object.values(allMatches).find((eachItem) => {
                    return eachItem.matchedWith === item;
                  })
                    ? colors[(() => {
                      console.log("inner function called");
                      let index = 0;
                      Object.values(allMatches).find((eachItem) => {
                        if(eachItem.matchedWith === item){
                          index = eachItem.colorIndex;
                        }
                      })
                      return index;
                    })()]
                    : "border-gray-300"
                } hover:bg-gray-100`}
                onClick={() => matchItems(item)}
              >
                <span>{item}</span>
              </li>
              </Connect>
            );
          })}
        </ul>

        {/* <h1 id="ele1">Lorem ipsum dolor sit.</h1>
        <h1 id="ele2">Lorem ipsum dolor sit amet.</h1> */}
        <ConnectLines elements={elements} />
      </div>
    </div>
    </ConnectProvider>
    }
    </>
  );
}

export default Matcher;
