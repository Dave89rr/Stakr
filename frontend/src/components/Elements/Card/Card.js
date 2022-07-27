import { Draggable } from 'react-beautiful-dnd';

import classes from './Card.module.css';

function Card({ data, pos, disabled }) {
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
          className={classes.cardContainer}
          >
          <div
            className={classes.dragHandle}
            {...provided.dragHandleProps}
          >
            <p className={classes.description}>{data.name}</p>
          </div>
          <div className={classes.editButton}>
            <img src='/media/icons/pencil.svg' alt='pencil' className={classes.pencil}/>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default Card;
