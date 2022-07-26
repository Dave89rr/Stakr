import WorkspaceButton from '../WorkspaceButton/WorkspaceButton';
import classes from './WorkspaceCluster.module.css';
import BoardCard from '../BoardCard';

function WorkspaceCluster({ data }) {
  let boards;
  if (data.boards !== undefined) {
    boards = Object.values(data.boards);
  }
  return (
    <div className={classes.clusterContainer}>
      <div className={classes.clusterInteractions}>
        <span>{data.name}</span>
        <div className={classes.btnContainer}>
          <WorkspaceButton name={'board'} />
          <WorkspaceButton name={'member'} />
          <WorkspaceButton name={'settings'} />
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

export default WorkspaceCluster;
