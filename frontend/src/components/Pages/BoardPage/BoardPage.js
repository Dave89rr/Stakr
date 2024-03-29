import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

import {
  thunkGetAllStacks,
  thunkUpdateStackOrder,
} from "../../../store/stacks";
import { thunkGetCards, thunkUpdateCard } from "../../../store/cards";

import classes from "./BoardPage.module.css";
import uniclass from "../pagesuniversal.module.css";
import Stack from "../../Elements/Stack/Stack";
import StacksForm from "../../Forms/StacksForm/StacksForm";

function BoardPage() {
  const workspaces = useSelector((state) => state.workspaces);
  const dispatch = useDispatch();

  const { workspaceId, boardId } = useParams();

  const [loaded, setLoaded] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [cardOrder, setCardOrder] = useState({});

  useEffect(() => {
    (async () => {
      if (workspaces[workspaceId]) {
        await dispatch(thunkGetAllStacks(boardId, workspaceId));
        setLoaded(true);
      }
      if (workspaces[workspaceId] && workspaces[workspaceId].stacks) {
        await dispatch(thunkGetCards(boardId, workspaceId));
      }
      if (workspaces[workspaceId] && workspaces[workspaceId].cards) {
        let cards = workspaces[workspaceId].cards;
        let stacks = workspaces[workspaceId].stacks;

        let stackIds = Object.values(stacks).map((ele) => ele.id);
        let filterStackIds = stackIds.filter(
          (id) => stacks[id].boardId === parseInt(boardId)
        );
        let cardsObj = {};
        filterStackIds.forEach((id) => {
          let stackCards = Object.values(cards)
            .filter((ele) => ele.stackId === id)
            .sort((a, b) => a.position - b.position);
          cardsObj[id] = stackCards;
        });

        await setCardOrder(cardsObj);
      }
    })();
  }, [dispatch, workspaces[workspaceId]]);

  if (!loaded || !workspaces[workspaceId]) return null;
  let boardData;
  if (loaded && workspaces[workspaceId]) {
    boardData = workspaces[workspaceId].boards[boardId];
  }

  let stacks;
  if (loaded && workspaces[workspaceId]) {
    stacks = workspaces[workspaceId].stacks;
  }
  let sortedStacks;
  if (workspaces[workspaceId] && workspaces[workspaceId].stacks) {
    let stackIds = Object.values(stacks).map((ele) => ele.id.toString());
    let filterStackIds = stackIds.filter(
      (id) => stacks[id].boardId === parseInt(boardId)
    );
    sortedStacks = filterStackIds.sort(
      (a, b) => stacks[a].position - stacks[b].position
    );
  }

  let cards;
  if (workspaces[workspaceId] && workspaces[workspaceId].cards) {
    cards = workspaces[workspaceId].cards;
  }

  const onDragStart = () => {
    setDisabled(true);
  };

  const onDragEnd = async (res) => {
    const { destination, source, draggableId, type } = res;

    if (type === "column") {
      // dont do anything when dragged into the same spot as before
      if (
        (destination &&
          destination.droppableId === source.droppableId &&
          destination.index === source.index) ||
        !destination
      ) {
        setDisabled(false);
        return;
      }

      const newStackOrder = Array.from(sortedStacks);
      newStackOrder.splice(source.index, 1);
      newStackOrder.splice(destination.index, 0, draggableId);
      sortedStacks = newStackOrder;
      await dispatch(thunkUpdateStackOrder(sortedStacks, boardId, workspaceId));
      setDisabled(false);
    }
    if (type === "row") {
      // dont do anything when dragged into the same spot as before
      if (
        (destination &&
          destination.droppableId === source.droppableId &&
          destination.index === source.index) ||
        !destination
      ) {
        setDisabled(false);
        return;
      }

      const cardId = parseInt(res.draggableId.split(":")[1]);
      const stackId = parseInt(res.destination.droppableId.split(":")[1]);

      let orderList = Object.values(cards)
        .filter((ele) => {
          return ele.stackId === stackId;
        })
        .map((ele) => ele.id)
        .sort((a, b) => cards[a].position - cards[b].position);

      if (orderList.includes(cardId)) {
        orderList.splice(source.index, 1);
      }
      orderList.splice(destination.index, 0, cardId);

      const otherCards = Object.values(cards)
        .filter((ele) => {
          return (
            ele.stackId === parseInt(res.source.droppableId.split(":")[1]) &&
            ele.id !== cardId
          );
        })
        .map((ele) => ele.id)
        .sort((a, b) => cards[a].position - cards[b].position);

      const newCardOrder = { ...cardOrder };
      const list = orderList.map((id) => cards[id]);
      const otherList = otherCards.map((id) => cards[id]);
      newCardOrder[source.droppableId.split(":")[1]] = otherList;
      newCardOrder[stackId] = list;
      setCardOrder(newCardOrder);

      const data = {
        cardId,
        stackId,
        newPos: res.destination.index,
        orderList,
        otherCards,
      };

      await dispatch(thunkUpdateCard(data, workspaceId));
      setDisabled(false);
    }
  };

  let color;
  if (loaded && workspaces[workspaceId])
    color = workspaces[workspaceId].boards[boardId].color;

  return (
    <div className={`${classes.containerWrapper} ${uniclass[color]}`}>
      <h1 className={`${classes[color]}`}>{boardData.name}</h1>
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <Droppable droppableId="allStacks" direction="horizontal" type="column">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={classes.stackContainer}
            >
              {stacks
                ? sortedStacks.map((ele) => {
                    return (
                      <Stack
                        data={stacks[ele]}
                        disabled={disabled}
                        cards={cards}
                        cardOrder={cardOrder}
                        setCardOrder={setCardOrder}
                        sortedStacks={sortedStacks}
                        key={stacks[ele].id}
                      />
                    );
                  })
                : null}
              {provided.placeholder}
              <StacksForm />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default BoardPage;
