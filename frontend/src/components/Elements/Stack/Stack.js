import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";

import Card from "../Card";
import { thunkGetCards } from "../../../store/cards";
import { thunkDeleteStack } from "../../../store/stacks";

import classes from "./Stack.module.css";

const Stack = ({ data, disabled, workspaces, cards, cardIds }) => {
  const { workspaceId, boardId } = useParams();
  const dispatch = useDispatch();

  // let cards;
  // if (workspaces[workspaceId].cards) {
  //     const allCards = Object.values(workspaces[workspaceId].cards);
  //     cards = allCards.filter(ele => ele.stackId === data.id)
  //         .sort((a, b) => a.position-b.position)
  // }
  let filteredCardIds;
  if (cardIds) {
    filteredCardIds = cardIds
      .filter((id) => {
        return cards[id].stackId === data.id;
      })
      .sort((a, b) => cards[a].position - cards[b].position);
  }

  useEffect(() => {
    (async () => {
      if (workspaces[workspaceId]) {
        await dispatch(thunkGetCards(data.id, workspaceId));
      }
    })();
  }, [dispatch, workspaces[workspaceId]]);

  // const handleDel = (e) => {
  //   e.preventDefault();
  //   console.log(data.id);
  // };

  return (
    <Draggable
      draggableId={`${data.id}`}
      index={data.position}
      key={data.id}
      isDragDisabled={disabled}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={classes.stackWrapper}
        >
          <div className={classes.stack}>
            <div className={classes.stackTitle} {...provided.dragHandleProps}>
              {data.name}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const payload = {
                    stackId: data.id,
                    workspaceId,
                  };
                  dispatch(thunkDeleteStack(payload));
                }}
              >
                Del
              </button>
            </div>
            <Droppable
              droppableId={`drop${data.id}`}
              direction="vertical"
              type="row"
            >
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={classes.stackContent}
                >
                  {cards
                    ? filteredCardIds.map((ele) => {
                        return <Card data={cards[ele]} key={ele} />;
                      })
                    : null}
                  {provided.placeholder}
                  <p>+ New Card</p>
                </div>
              )}
            </Droppable>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Stack;
