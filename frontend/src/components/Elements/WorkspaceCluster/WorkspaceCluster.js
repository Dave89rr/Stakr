import WorkspaceButton from '../WorkspaceButton/WorkspaceButton';
import classes from './WorkspaceCluster.module.css';
import BoardCard from '../BoardCard';
import { useSelector } from 'react-redux';
import WsSettings from '../WsSettings/WsSettings';
import { useState } from 'react';
import BoardsForm from '../../Forms/BoardsForm';
import EditWorkspaceForm from '../../Forms/EditWorkspaceForm';

function WorkspaceCluster({ id }) {
  const [showSettings, setShowSettings] = useState(false);
  const [showBoardForm, setShowBoardForm] = useState(false);
  const [editWsMode, setEditWsMode] = useState(true);
  const [editWsId, setEditWsId] = useState(null);
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
          {editWsMode && id == editWsId ? (
            <EditWorkspaceForm
              id={id}
              wsname={data.name}
              setEditWsMode={setEditWsMode}
              setEditWsId={setEditWsId}
            />
          ) : (
            <span>{data.name}</span>
          )}
          <div className={classes.btnContainer}>
            <WorkspaceButton name={'board'} plural={'s'} />
            <WorkspaceButton name={'member'} plural={'s'} />
            <div onClick={() => setShowSettings(!showSettings)}>
              <WorkspaceButton name={'settings'} plural={''} />
            </div>
            {showSettings && (
              <WsSettings
                id={id}
                settingsState={(showSettings, setShowSettings)}
                setEditWsId={setEditWsId}
                setEditWsMode={setEditWsMode}
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
            <div
              className={classes.createBoardcard}
              onClick={() => setShowBoardForm(true)}
            >
              {showBoardForm ? (
                <BoardsForm
                  wsId={id}
                  setShowBoardForm={setShowBoardForm}
                  showBoardForm={showBoardForm}
                />
              ) : (
                <span>Create New Board</span>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default WorkspaceCluster;
