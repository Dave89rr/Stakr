import WorkspaceButton from '../WorkspaceButton/WorkspaceButton';
import classes from './WorkspaceCluster.module.css';
import BoardCard from '../BoardCard';

function WorkspaceCluster() {
  return (
    <div className={classes.clusterContainer}>
      <div className={classes.clusterInteractions}>
        <span>WorkspaceCluster</span>
        <div className={classes.btnContainer}>
          <WorkspaceButton name={'board'} />
          <WorkspaceButton name={'member'} />
          <WorkspaceButton name={'settings'} />
        </div>
      </div>
      <div className={classes.boardsContainer}>
        <BoardCard />
        <BoardCard />
        <BoardCard />
        <BoardCard />
      </div>
    </div>
  );
}

export default WorkspaceCluster;
