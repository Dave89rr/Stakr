import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkGetAllStacks } from '../../../store/stacks';

import Stack from '../../Elements/Stack/Stack';

import classes from './BoardPage.module.css';

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
    sortedStacks = Object.values(stacks).sort((a, b) => a.position-b.position);
  }

  return (
    <div className={classes.containerWrapper}>
      <h1>BoardPage #{boardId} {workspaceId}</h1>
      <div className={classes.stackContainer}>
        {stacks ? sortedStacks.map((ele, i) => {
          if (ele.boardId === parseInt(boardId)) return <Stack data={ele} key={i}/>
        }) : null}
      </div>
    </div>
  );
}

export default BoardPage;
