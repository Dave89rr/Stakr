import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

import {
  thunkGetAllStacks,
  thunkUpdateStackOrder,
} from "../../../store/stacks";

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

  const onDragStart = () => {
    setDisabled(true);
  };

  const onDragEnd = async (res) => {
    const { destination, source, draggableId, type } = res;

    // dont do anything when dragged into the same spot as before
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      setDisabled(false);
      return;
    }

    if (type === "column") {
      const newStackOrder = Array.from(sortedStacks);
      newStackOrder.splice(source.index, 1);
      newStackOrder.splice(destination.index, 0, draggableId);
      sortedStacks = newStackOrder;
      await dispatch(thunkUpdateStackOrder(sortedStacks, boardId));
      setDisabled(false);
    }
  };

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
                {stacks
                  ? sortedStacks.map((ele) => {
                      return (
                        <>
                          <Stack
                            data={stacks[ele]}
                            disabled={disabled}
                            key={stacks[ele].id}
                          />
                        </>
                      );
                    })
                  : null}
                {provided.placeholder}
                <StacksForm />
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default BoardPage;
