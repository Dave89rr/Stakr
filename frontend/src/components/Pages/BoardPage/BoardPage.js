import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

import {
  thunkGetAllStacks,
  thunkUpdateStackOrder,
} from "../../../store/stacks";
import { thunkUpdateCard } from '../../../store/cards';

import classes from "./BoardPage.module.css";
import Stack from "../../Elements/Stack/Stack";
import StacksForm from "../../Forms/StacksForm/StacksForm";

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
    stacks = workspaces[workspaceId].stacks;
  }
  let sortedStacks;
  if (workspaces[workspaceId].stacks) {
    let stackIds = Object.values(stacks).map((ele) => ele.id.toString());
    let filterStackIds = stackIds.filter(
      (id) => stacks[id].boardId === parseInt(boardId)
    );
    sortedStacks = filterStackIds.sort(
      (a, b) => stacks[a].position - stacks[b].position
    );
  }

  let cards;
  let sortedCards = [];
  if (workspaces[workspaceId].cards) {
    cards = workspaces[workspaceId].cards;
  }

  const onDragStart = () => {
    setDisabled(true);
  };

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
      await dispatch(thunkUpdateStackOrder(sortedStacks, boardId));
      setDisabled(false);
    }
    if (type === 'row') {
      // dont do anything when dragged into the same spot as before
      if ((destination && destination.droppableId === source.droppableId &&
        destination.index === source.index) || !destination) {
          setDisabled(false);
          return;
      }

      const cardId = parseInt(res.draggableId.split(':')[1]);
      const stackId = parseInt(res.destination.droppableId.split(':')[1]);

      const cardOrder = Object.values(cards).filter(ele => {
        return (ele.stackId === stackId)
      }).map(ele => ele.id).sort((a, b) => cards[a].position-cards[b].position)

      if (cardOrder.includes(cardId)) {
        cardOrder.splice(source.index, 1);
      }
      cardOrder.splice(destination.index, 0, cardId);

      const otherCards = Object.values(cards).filter(ele => {
        return (
          (ele.stackId === parseInt(res.source.droppableId.split(':')[1]))
          &&
          ele.id !== cardId
        )
      }).map(ele => ele.id);

      const data = {
        cardId,
        stackId,
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
      <h1>
        BoardPage #{boardId} {workspaceId}
      </h1>
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <Droppable droppableId="allStacks" direction="horizontal" type="column">
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
                    let filterCardIds = cardIds.filter(id => cards[id].stackId === parseInt(ele))
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
                <StacksForm positionNum={sortedStacks.length} />
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default BoardPage;
