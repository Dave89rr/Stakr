import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";

import Card from "../Card";
import { thunkGetCards } from "../../../store/cards";
import { thunkDeleteStack } from "../../../store/stacks";

import classes from "./Stack.module.css";
import CreateCard from "../../Forms/CreateCard";

const Stack = ({ data, disabled, workspaces, cards, sortedCards }) => {
  const { workspaceId, boardId } = useParams();
  const dispatch = useDispatch();
  const [form, setForm] = useState("False");

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
              droppableId={`drop:${data.id}`}
              direction="vertical"
              type="row"
            >
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={classes.stackContent}
                >
                  {sortedCards
                    ? sortedCards.map((ele, i) => {
                        return <Card data={cards[ele]} pos={i} key={ele} />;
                      })
                    : null}
                  {provided.placeholder}
                  {form === "False" ? (
                    <div onClick={(e) => setForm("True")}>+ New Card</div>
                  ) : (
                    <CreateCard stackId={data.id} setForm={setForm} />
                  )}
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
