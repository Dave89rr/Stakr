import WorkspaceButton from '../WorkspaceButton/WorkspaceButton';
import classes from './WorkspaceCluster.module.css';
import BoardCard from '../BoardCard';
import { useDispatch, useSelector } from 'react-redux';
import { thunkDeleteWorkspace } from '../../../store/workspaces';

function WorkspaceCluster({ id }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.workspaces[id]);
  let boards;
  if (data) {
    boards = Object.values(data.boards);
  }

  const handleDelete = (wsId) => {
    dispatch(thunkDeleteWorkspace(wsId));
  };
  if (!data) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className={classes.clusterContainer}>
        <div className={classes.clusterInteractions}>
          <span>{data.name}</span>
          <div className={classes.btnContainer}>
            <WorkspaceButton name={'board'} />
            <WorkspaceButton name={'member'} />
            <div onClick={() => handleDelete(id)}>
              <WorkspaceButton name={'settings'} />
            </div>
          </div>
        </div>
        <div className={classes.boardsContainer}>
          {boards && boards.length > 0 ? (
            boards.map((ele, i) => {
              return <BoardCard data={ele} key={i} />;
            })
          ) : (
            // TODO - Refactor BoardCards or make new component
            // to placehold "create new board" button
            <h2>No boards in this workspace</h2>
          )}
        </div>
      </div>
    );
  }
}

export default WorkspaceCluster;
