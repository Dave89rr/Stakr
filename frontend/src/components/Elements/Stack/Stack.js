import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import Card from '../Card';
import { thunkGetCards } from '../../../store/cards';

import classes from './Stack.module.css';

const Stack = ({ data, disabled, workspaces }) => {
    const { workspaceId, boardId } = useParams();
    const dispatch = useDispatch();

    let cards;
    if (workspaces[workspaceId].cards) {
        const allCards = Object.values(workspaces[workspaceId].cards);
        cards = allCards.filter(ele => ele.stackId === data.id)
    }

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
                <Droppable droppableId={`drop${data.id}`} direction='vertical' type='row'>
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={classes.stackContent}
                    >
                        {cards ? cards.map((ele) => {
                            return <Card data={ele} key={ele.id}/>
                        })
                        : null}
                        {provided.placeholder}
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
