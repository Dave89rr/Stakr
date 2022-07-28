import { Draggable } from "react-beautiful-dnd";
import EditCardForm from "../../Forms/EditCardForm";
import { useState } from "react";

import classes from "./Card.module.css";

function Card({ data, pos, disabled, cardOrder, setCardOrder }) {
  const [display, setDisplay] = useState(false);

  if (!data) return null;

  return (
    <Draggable
      draggableId={`drag:${data.id}`}
      index={pos}
      key={data.id}
      isDragDisabled={disabled}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`${classes.cardContainer} ${classes[data.color]}`}
        >
          <div className={classes.dragHandle} {...provided.dragHandleProps}>
            <p className={classes.description}>{data.name}</p>
          </div>
          <div className={classes.editButton} onClick={() => setDisplay(true)}>
            <img
              src="/media/icons/pencil.svg"
              alt="pencil"
              className={classes.pencil}
            />
          </div>
          {display ? (
            <EditCardForm setDisplay={setDisplay} data={data} cardOrder={cardOrder} setCardOrder={setCardOrder} />
          ) : null}
        </div>
      )}
    </Draggable>
  );
}

export default Card;
