import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { thunkGetAllStacks, thunkUpdateStackOrder } from '../../../store/stacks';
import { thunkUpdateCard } from '../../../store/cards';

import classes from './BoardPage.module.css';
import Stack from '../../Elements/Stack/Stack';

function BoardPage() {
  const workspaces = useSelector((state) => state.workspaces);
  const dispatch = useDispatch();

  const { workspaceId, boardId } = useParams();

  const [loaded, setLoaded] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    (async () => {
      if (workspaces[workspaceId]) {
        await dispatch(thunkGetAllStacks(boardId));
        setLoaded(true);
      }
    })();
  }, [dispatch, workspaces[workspaceId]]);

  if (!loaded) return null;

  let stacks;
  if (loaded) {
    stacks = workspaces[workspaceId].stacks
  }
  let sortedStacks;
  if (workspaces[workspaceId].stacks) {
    let stackIds = Object.values(stacks).map(ele => (ele.id).toString());
    let filterStackIds = stackIds.filter(id => stacks[id].boardId === parseInt(boardId))
    sortedStacks = filterStackIds.sort((a, b) => stacks[a].position-stacks[b].position)
  }

  let cards;
  let sortedCards = [];
  if (workspaces[workspaceId].cards) {
    cards = workspaces[workspaceId].cards;
  }


  const onDragStart = () => {
    setDisabled(true)
  }

  const onDragEnd = async (res) => {
    const { destination, source, draggableId, type } = res;


    if (type === 'column') {
      // dont do anything when dragged into the same spot as before
      if (destination.droppableId === source.droppableId &&
        destination.index === source.index) {
          setDisabled(false);
          return;
        }

      const newStackOrder = Array.from(sortedStacks);
      newStackOrder.splice(source.index, 1);
      newStackOrder.splice(destination.index, 0, draggableId);
      sortedStacks = newStackOrder;
      await dispatch(thunkUpdateStackOrder(sortedStacks, boardId))
      setDisabled(false);
    }
    if (type === 'row') {
      // dont do anything when dragged into the same spot as before
      if ((destination && destination.droppableId === source.droppableId &&
        destination.index === source.index) || !destination) {
          setDisabled(false);
          return;
      }

      const cardOrder = Object.values(cards).filter(ele => {
        return (ele.stackId === parseInt(res.destination.droppableId.split(':')[1]))
      }).map(ele => ele.id)
      console.log('yyyyy', cardOrder)
      if (cardOrder.includes(parseInt(res.draggableId.split(':')[1]))) {
        cardOrder.splice(source.index, 1);
      }
      cardOrder.splice(destination.index, 0, parseInt(res.draggableId.split(':')[1]));

      const otherCards = Object.values(cards).filter(ele => {
        return (
          (ele.stackId === parseInt(res.source.droppableId.split(':')[1]))
          &&
          ele.id !== parseInt(res.draggableId.split(':')[1])
        )
      }).map(ele => ele.id);

      const data = {
        cardId: parseInt(res.draggableId.split(':')[1]),
        stackId: parseInt(res.destination.droppableId.split(':')[1]),
        newPos: res.destination.index,
        cardOrder,
        otherCards
      }

      sortedCards = cardOrder;

      await dispatch(thunkUpdateCard(data, workspaceId));
      setDisabled(false);
    }
  }

  return (
    <div className={classes.containerWrapper}>
      <h1>BoardPage #{boardId} {workspaceId}</h1>
      <DragDropContext
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
      >
        <Droppable droppableId='allStacks' direction='horizontal' type='column'>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={classes.stackContainer}
            >
              <div className={classes.stackContainer}>
                {stacks ? sortedStacks.map(ele => {
                  if (cards) {
                    let cardIds = Object.values(cards).map(ele => (ele.id));
                    let filterCardIds = cardIds.filter(id => cards[id].stackId === stacks[ele].id)
                    sortedCards = filterCardIds.sort((a, b) => cards[a].position-cards[b].position)
                  }
                  return (
                    <Stack
                      data={stacks[ele]}
                      cards={cards}
                      sortedCards={sortedCards}
                      disabled={disabled}
                      key={stacks[ele].id}
                      workspaces={workspaces}
                    />
                  )
                }) : null}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default BoardPage;
