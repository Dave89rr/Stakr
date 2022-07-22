import WorkspaceButton from '../WorkspaceButton/WorkspaceButton';
import classes from './WorkspaceCluster.module.css';
import BoardCard from '../BoardCard';

function WorkspaceCluster({ data }) {

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
        {Object.values(data.boards).map((ele, i) => {
          return <BoardCard data={ele} key={i} />
        })}
      </div>
    </div>
  );
}

export default WorkspaceCluster;
