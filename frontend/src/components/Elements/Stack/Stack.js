import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";

import Card from "../Card";
import { thunkDeleteStack } from "../../../store/stacks";

import classes from "./Stack.module.css";
import CreateCard from "../../Forms/CreateCard";

const Stack = ({ data, disabled, cards, cardOrder, setCardOrder }) => {
  const { workspaceId } = useParams();
  const dispatch = useDispatch();
  const [form, setForm] = useState("False");

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
              <div
                className={classes.trahCan}
                onClick={(e) => {
                  e.preventDefault();
                  const payload = {
                    stackId: data.id,
                    workspaceId,
                  };
                  dispatch(thunkDeleteStack(payload));
                }}
              >
                X
              </div>
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
                  {cardOrder[data.id]?.map((ele, i) => {
                    return (
                      <Card
                        data={cards[ele.id]}
                        pos={i}
                        key={ele.id}
                        cardOrder={cardOrder}
                        setCardOrder={setCardOrder}
                      />
                    );
                  })}
                  {provided.placeholder}
                  {form === "False" ? (
                    <div
                      className={classes.addCard}
                      onClick={(e) => setForm("True")}
                    >
                      + New Card
                    </div>
                  ) : (
                    <CreateCard
                      stackId={data.id}
                      disabled={disabled}
                      setForm={setForm}
                      cardOrder={cardOrder}
                      setCardOrder={setCardOrder}
                    />
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
