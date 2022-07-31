import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";

import Card from "../Card";
import { thunkDeleteStack, thunkUpdateStackOrder } from "../../../store/stacks";

import classes from "./Stack.module.css";
import CreateCard from "../../Forms/CreateCard";

const Stack = ({ data, disabled, cards, cardOrder, setCardOrder, sortedStacks }) => {
  const workspaces = useSelector((state) => state.workspaces);
  const { boardId, workspaceId } = useParams();
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
                className={classes.trashCan}
                style={{ cursor: "pointer" }}
                onClick={async (e) => {
                  e.preventDefault();
                  const payload = {
                    stackId: data.id,
                    workspaceId,
                  };
                  await dispatch(thunkDeleteStack(payload));
                  const newOrder = Array.from(sortedStacks);
                  newOrder.splice(sortedStacks.indexOf((data.id).toString()), 1);
                  sortedStacks = newOrder;
                  await dispatch(thunkUpdateStackOrder(sortedStacks, boardId, workspaceId));
                }}
              >
                <img
                  src="/static/icons/trashcan.svg"
                  className={classes.trashCan}
                />
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
                      <div className={classes.plusContainer}>
                        <img
                          src="/static/icons/plus.svg"
                          className={classes.plus}
                        />
                        New Card
                      </div>
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
