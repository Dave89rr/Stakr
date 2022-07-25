import { Draggable } from 'react-beautiful-dnd'
import Card from '../Card';

import classes from './Stack.module.css';

const Stack = ({ data, disabled }) => {
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
                </div>
                <div className={classes.stackContent}>
                    {Array(10).fill('x').map((ele, i) => <Card />)}
                </div>
            </div>
            </div>
        )}
        </Draggable>
    );
}

export default Stack
