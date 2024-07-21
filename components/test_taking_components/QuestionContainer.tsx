"use client";
import React, { useState } from "react";
import Matcher from "./Matcher";
import Objective from "./Objective";
import Ordering from "./Ordering";
import ShortAnswer from "./ShortAnswer";
import MultiOptions from "./MultiOptions";
import {
  MatcherQuestionBody,
  MatcherSubObject,
  ObjectiveQuestionBody,
  OrderingQuestionBody,
  ShortAnswerQuestionBody,
  MatcherAnswer,
  OrderingAnswer,
  FinalAnswer,
  LongAnswerQuestionBody,
  MultiOptionsQuestionBody
} from "../types";
import { nanoid } from "nanoid";
import LongAnswer from "./LongAnswer";

function QuestionContainer() {
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [allQuestions, setAllQuestions] = useState<
    {
      type: string;
      question:
        | MatcherQuestionBody
        | ObjectiveQuestionBody
        | OrderingQuestionBody
        | ShortAnswerQuestionBody
        | LongAnswerQuestionBody
        | MultiOptionsQuestionBody
        | string;
      answer: MatcherAnswer | OrderingAnswer | number[] | string | number;
    }[]
  >([
    {
      type: "Matcher",
      question: {
        left: ["cat", "dog", "cow", "goat", "horse", "pig"],
        right: ["kitten", "puppy", "calf", "kid", "foal", "piglet"],
        leftHeading: "Adult",
        rightHeading: "Young",
        q: "Match the animals on the left with their corresponding offspring on the right",
      },
      answer: "",
    },
    {
      type: "Objective",
      question: {
        q: "What game has the best gameplay?",
        options: [{id: 0, value:"GTA V"}, {id: 1, value: "Sekiro"}, {id: 2, value: "Spiderman"}, {id: 3, value: "Elden Ring"}],
      },
      answer: -1,
    },
    {
      type: "Ordering",
      question: {
        q: "Arrange the items in order of increasing stages",
        orderItems: [
          { id: nanoid(8), value: "Nursery" },
          { id: nanoid(8), value: "Primary" },
          { id: nanoid(8), value: "Secondary" },
          { id: nanoid(8), value: "Tertiary" },
          {
            id: nanoid(8),
            value:
              "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum, accusamus facilis! Doloribus tempora eveniet aut sed temporibus qui, necessitatibus molestias.",
          },
          { id: nanoid(8), value: "PHD" },
        ],
      },
      answer: "",
    },
    {
      type: "ShortAnswer",
      question: {
        q: "What is the capital of Germany?"
      },
      answer: "",
    },
    {
      type: "LongAnswer",
      question: {
        q: 'Describe your experience using this website'
      },
      answer: ""
    },
    {
      type: "MultiOptions",
      question: {
        q: "Select all options that are programming languages",
        options: [
          { id: 0, value: "Javascript"},
          { id: 1, value: "Python"},
          { id: 2, value: "C++"},
          { id: 3, value: "CSS"},
        ],
      },
      answer: []
    }
  ]);

  const setAnswer : FinalAnswer = (questionIndex, answer) => {
    setAllQuestions(allQuestions.map((question, index) => {
      if(questionIndex === index){
        let temporaryQuestionHolder = question;
        temporaryQuestionHolder.answer = answer;
        return temporaryQuestionHolder;
      }
      else{
        return question;
      }
    }));
  }

  return (
    <div className="bg-white mx-auto px-2 max-w-4xl py-4 rounded-md min-h-90v mt-9">
      <header className="flex justify-between max-w-lg px-1 mx-auto border w-full">
        <span>
          Question {currentQuestionNumber + 1}/{allQuestions.length}
        </span>
        <span>Time Left: 00:00:00</span>
      </header>
      <main className="px-4 my-6">
        {(() => {
          switch (allQuestions[currentQuestionNumber].type) {
            case "Matcher": {
              const tempQuestionHolder: MatcherQuestionBody = allQuestions[
                currentQuestionNumber
              ].question as MatcherQuestionBody;
              const tempAnswerHolder: MatcherAnswer = allQuestions[currentQuestionNumber].answer as MatcherAnswer;
              return <Matcher incomingMatcherQuestion={tempQuestionHolder} setFinalAnswer={setAnswer} prevAnswer={tempAnswerHolder} index={currentQuestionNumber}/>;
            }
            case "Objective": {
              const tempQuestionHolder: ObjectiveQuestionBody = allQuestions[
                currentQuestionNumber
              ].question as ObjectiveQuestionBody;
              const tempAnswerHolder : number = allQuestions[currentQuestionNumber].answer as number;
              return (
                <Objective incomingObjectiveQuestion={tempQuestionHolder} prevAnswer={tempAnswerHolder} index={currentQuestionNumber} setFinalAnswer={setAnswer}/>
              );
            }
            case "Ordering": {
              const tempQuestionHolder: OrderingQuestionBody = allQuestions[
                currentQuestionNumber
              ].question as OrderingQuestionBody;
              const tempAnswerHolder: OrderingAnswer = allQuestions[currentQuestionNumber].answer as OrderingAnswer;
              return <Ordering incomingOrderingQuestion={tempQuestionHolder} prevAnswer={tempAnswerHolder} index={currentQuestionNumber} setFinalAnswer={setAnswer} />;
            }
            case "ShortAnswer": {
              const tempQuestionHolder: ShortAnswerQuestionBody = allQuestions[
                currentQuestionNumber
              ].question as ShortAnswerQuestionBody;
              const tempAnswerHolder: string = allQuestions[currentQuestionNumber].answer as string;
              return (
                <ShortAnswer incomingShortAnswerQuestion={tempQuestionHolder} index={currentQuestionNumber} setFinalAnswer={setAnswer} prevAnswer={tempAnswerHolder}/>
              );
            }
            case "LongAnswer": {
              const tempQuestionHolder : LongAnswerQuestionBody = allQuestions[currentQuestionNumber].question as LongAnswerQuestionBody;
              const tempAnswerHolder : string = allQuestions[currentQuestionNumber].answer as string;
              return <LongAnswer incomingLongAnswerQuestion={tempQuestionHolder} index={currentQuestionNumber} setFinalAnswer={setAnswer} prevAnswer={tempAnswerHolder} />
            }
            case "MultiOptions": {
              const tempQuestionHolder: MultiOptionsQuestionBody = allQuestions[currentQuestionNumber].question as MultiOptionsQuestionBody;
              const tempAnswerHolder: number[] = allQuestions[currentQuestionNumber].answer as number[];
              return <MultiOptions incomingMultiOptionsQuestion={tempQuestionHolder} index={currentQuestionNumber} setFinalAnswer={setAnswer} prevAnswer={tempAnswerHolder} />
            }
            default:
              return (
                <div>
                  This is not supposed to be here at all. Please report this
                  exam to us at tervenda18@gmail.com
                </div>
              );
          }
        })()}
      </main>
      <div className="flex px-6">
        {currentQuestionNumber > 0 && <button className="border w-40 py-2 bg-green-600 text-white" onClick={() => {
          setCurrentQuestionNumber(currentQuestionNumber - 1);
        }}>Previous</button>}
        {currentQuestionNumber < allQuestions.length - 1 && <button className="border w-40 py-2 bg-green-600 text-white ml-auto" onClick={() => {
          setCurrentQuestionNumber(currentQuestionNumber + 1);
        }}>Next</button>}
      </div>
      <footer className="flex mt-5">
        {allQuestions.map((question, index) => {
          return (
            <button
              key={index}
              className="bg-blue-500 mx-1 px-2 rounded-sm text-sm"
              onClick={() => setCurrentQuestionNumber(index)}
            >
              {index + 1}
            </button>
          );
        })}
      </footer>

    </div>
  );
}

export default QuestionContainer;
