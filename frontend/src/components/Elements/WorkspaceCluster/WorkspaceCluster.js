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
        {Object.values(data.boards).map(ele => {
          return <BoardCard data={ele}/>
        })}
      </div>
    </div>
  );
}

export default WorkspaceCluster;
