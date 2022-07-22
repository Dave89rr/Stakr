import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkGetAllStacks } from '../../../store/stacks';

// import classes from './BoardPage.module.css';
import uniCss from '../pagesuniversal.module.css';

function BoardPage() {
  const { boardId } = useParams();
  // let stacks = useSelector((state) => state.workspaces[workId].stacks);
  const workspaces = useSelector((state) => state.workspaces);
  let workspaceId;
  Object.values(workspaces).forEach(workspace => {
    const boards = workspace.boards
    Object.values(boards).forEach(board => {
      if (board.id === boardId) {
        workspaceId = workspace.id
      }
    })
  });
  console.log(workspaceId)

  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      // if (!stacks) {
      //   await dispatch(thunkGetAllStacks(boardId));
      //   setLoaded(true);
      // }
    })();
  }, [dispatch]);

  if (!loaded) return null;

  return (
    <div className={uniCss.mainContainer}>
      <h1>BoardPage #{boardId}</h1>
    </div>
  );
}

export default BoardPage;
