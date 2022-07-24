import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { thunkGetAllStacks, thunkUpdateStackOrder } from '../../../store/stacks';

import classes from './BoardPage.module.css';
import Stack from '../../Elements/Stack/Stack';

function BoardPage() {
  const workspaces = useSelector((state) => state.workspaces);

  const { workspaceId, boardId } = useParams();

  let stacks;
  if (Object.values(workspaces).length) {
    stacks = workspaces[workspaceId].stacks
  }

  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (Object.values(workspaces).length) {
        await dispatch(thunkGetAllStacks(boardId));
      }
      setLoaded(true)
    })();
  }, [dispatch, Object.values(workspaces).length]);

  if (!loaded) return null;

  let sortedStacks;
  if (stacks) {
    let stackIds = Object.values(stacks).map(ele => (ele.id).toString());
    let filterStackIds = stackIds.filter(id => stacks[id].boardId === parseInt(boardId))
    sortedStacks = filterStackIds.sort((a, b) => stacks[a].position-stacks[b].position)
  }

  const onDragEnd = async (res) => {
    const { destination, source, draggableId, type } = res;

    if (type === 'column') {
      const newStackOrder = Array.from(sortedStacks);
      newStackOrder.splice(source.index, 1);
      newStackOrder.splice(destination.index, 0, draggableId);
      sortedStacks = newStackOrder;
      await dispatch(thunkUpdateStackOrder(sortedStacks, boardId));
    }

  }

  return (
    <div className={classes.containerWrapper}>
      <h1>BoardPage #{boardId} {workspaceId}</h1>
      <DragDropContext
        onDragEnd={onDragEnd}
      >
        <Droppable droppableId='allStacks' direction='horizontal' type='column'>
          {(provided) => (
            <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={classes.stackContainer}
            >
              <div className={classes.stackContainer}>
                {stacks ? sortedStacks.map((ele, i) => {
                  return <Stack data={stacks[ele]} key={i}/>
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
