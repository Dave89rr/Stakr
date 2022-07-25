import { Draggable } from 'react-beautiful-dnd';

import classes from './Card.module.css';

function Card({ data }) {
  return (
    <Draggable
      draggableId={`drag${data.id}`}
      index={data.position}
      key={data.id}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={classes.cardContainer}
        >
            <p className={classes.description}>{data.name}</p>
        </div>
      )}
    </Draggable>
  );
}

export default Card;
