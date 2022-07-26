import WorkspaceButton from '../WorkspaceButton/WorkspaceButton';
import classes from './WorkspaceCluster.module.css';
import BoardCard from '../BoardCard';
import { useSelector } from 'react-redux';
import WsSettings from '../WsSettings/WsSettings';
import { useState } from 'react';

function WorkspaceCluster({ id }) {
  const [showSettings, setShowSettings] = useState(false);
  const data = useSelector((state) => state.workspaces[id]);
  let boards;
  if (data) {
    boards = Object.values(data.boards);
  }

  if (!data) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className={classes.clusterContainer}>
        <div className={classes.clusterInteractions}>
          <span>{data.name}</span>
          <div className={classes.btnContainer}>
            <WorkspaceButton name={'board'} plural={'s'} />
            <WorkspaceButton name={'member'} plural={'s'} />
            {/* <div onClick={() => handleDelete(id)}> */}
            <div onClick={() => setShowSettings(!showSettings)}>
              <WorkspaceButton name={'settings'} plural={''} />
            </div>
            {showSettings && (
              <WsSettings
                id={id}
                settingsState={(showSettings, setShowSettings)}
              />
            )}
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
