import { Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import EditCardForm from "../../Forms/EditCardForm";
import CardInfoModal from "./CardInfoModal";

import classes from "./Card.module.css";

function Card({ data, pos, disabled, cardOrder, setCardOrder}) {
  const [display, setDisplay] = useState(false);
  const [cardModal, setCardModal] = useState(false);

  if (!data) return null;

  return (
    <>
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
          onDoubleClick={() => setCardModal(true)}
        >
          <div className={classes.dragHandle} {...provided.dragHandleProps}>
            <p className={classes.description}>{data.name}</p>
          </div>
          <div className={classes.editButton} onClick={() => setDisplay(true)}>
            <img
              src="/static/icons/pencil.svg"
              alt="pencil"
              className={classes.pencil}
            />
          </div>
          {display ? (
            <EditCardForm
              setDisplay={setDisplay}
              data={data}
              cardOrder={cardOrder}
              setCardOrder={setCardOrder}
            />
          ) : null}
        </div>
      )}
    </Draggable>
    <CardInfoModal cardModal={cardModal} data={data} setCardModal={setCardModal}/>
    </>
  );
}

export default Card;
