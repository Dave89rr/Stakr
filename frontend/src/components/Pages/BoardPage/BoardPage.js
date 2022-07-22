import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkGetAllStacks } from '../../../store/stacks';

// import classes from './BoardPage.module.css';
import uniCss from '../pagesuniversal.module.css';

function BoardPage() {
  const { workspaceId, boardId } = useParams();
  let stacks = useSelector((state) => state.workspaces[workspaceId].stacks);

  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (!stacks) {
        await dispatch(thunkGetAllStacks(boardId));
      }
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) return null;

  return (
    <div className={uniCss.mainContainer}>
      <h1>BoardPage #{boardId} {workspaceId}</h1>
    </div>
  );
}

export default BoardPage;
