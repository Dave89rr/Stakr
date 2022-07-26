import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import Card from '../Card';
import { thunkGetCards } from '../../../store/cards';

import classes from './Stack.module.css';

const Stack = ({ data, disabled, workspaces, cards, sortedCards }) => {
    const { workspaceId, boardId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
          if (workspaces[workspaceId]) {
            await dispatch(thunkGetCards(data.id, workspaceId));
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
                <Droppable droppableId={`drop:${data.id}`} direction='vertical' type='row'>
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={classes.stackContent}
                    >
                        {sortedCards ? sortedCards.map((ele, i) => {
                            return <Card data={cards[ele]} pos={i} key={ele}/>
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
}

export default Stack
