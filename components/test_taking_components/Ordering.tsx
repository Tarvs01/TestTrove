"use client";
import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import { OrderingQuestionBody, OrderingAnswer, FinalAnswer } from "../types";

interface OrderingProps {
  incomingOrderingQuestion: OrderingQuestionBody,
  setFinalAnswer: FinalAnswer,
  index: number,
  prevAnswer: OrderingAnswer,
}

function Ordering({incomingOrderingQuestion, setFinalAnswer, index, prevAnswer} : OrderingProps) {
  const [orderItems, setOrderItems] = useState<OrderingAnswer>(
    []
  );

  useEffect(() => {
    if(prevAnswer.length !== 0){
      setOrderItems(prevAnswer);
    }
    else{
      setOrderItems(incomingOrderingQuestion.orderItems);
    }
  }, []);

  useEffect(() => {
    setFinalAnswer(index, orderItems)
  }, [orderItems])

  const handleDragEnd = (result: DropResult) => {
    console.log(orderItems);
    if (!result.destination) return;
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const copyTodos = [...orderItems];
    const [reorderTodo] = copyTodos.splice(startIndex, 1);
    copyTodos.splice(endIndex, 0, reorderTodo);
    setOrderItems(copyTodos);
  };

  return (
    <div>
        <h3>{incomingOrderingQuestion.q}</h3>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`border-2 w-5/6 max-w-96 mx-auto px-4 py-1 rounded-lg my-4`}
            >
              {orderItems.map((item, index) => {
                return (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`flex mx-auto w-full py-3 my-4 rounded-lg px-2 bg-white shadow-md border hover:bg-gray-200 cursor-grab ${snapshot.isDragging ? "bg-gray-200" : "bg-white"}`}
                      >
                        <span className="mx-auto">{item.value}</span>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Ordering;
