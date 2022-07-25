import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';

import Card from '../Card';
import { thunkGetCards } from '../../../store/cards';

import classes from './Stack.module.css';

const Stack = ({ data, disabled, workspaces }) => {
    const { workspaceId, boardId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
          if (workspaces[workspaceId]) {
            await dispatch(thunkGetCards(data.id));
          }
        })();
      }, [dispatch, workspaces[workspaceId]]);

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
                    {Array(10).fill('x').map((ele, i) => <Card key={i}/>)}
                </div>
            </div>
            </div>
        )}
        </Draggable>
    );
}

export default Stack
