import { useState } from 'react';
import WorkspacesForm from '../../Forms/WorkspacesForm/WorkspacesForm';
import classes from './CreateMenu.module.css';
import BoardsCreateMenuForm from '../../Forms/BoardsCreateMenuForm';

function CreateMenu({ setToggleView }) {
  const [showMenu, setShowMenu] = useState(true);
  const [showWSF, setShowWSF] = useState(false);
  const [showBF, setShowBF] = useState(false);

  const boardIcon = (
    <img
      className={classes.stakrIcon}
      src="/static/icons/boardicon.svg"
      alt="stakr icon"
    />
  );
  const workspaceIcon = (
    <img
      className={classes.stakrIcon}
      src="/static/icons/workspaceicon.svg"
      alt="stakr icon"
    />
  );
  const toggleCreateBoard = () => {
    setShowBF(true);
    setShowMenu(false);
  };
  const toggleCreateWorkspace = () => {
    setShowWSF(true);
    setShowMenu(false);
  };
  const menuContent = (
    <div className={classes.contentContainer}>
      <div className={classes.createAction} onClick={toggleCreateBoard}>
        <span>
          {boardIcon} <span>Create Board</span>
        </span>
        <div className={classes.createDescription}>
          <p>
            A board is made up of cards ordered on stacks. Use it to manage
            projects, track information, or organize anything.
          </p>
        </div>
      </div>
      <div className={classes.createAction} onClick={toggleCreateWorkspace}>
        <span>
          {workspaceIcon} <span>Create Workspace</span>
        </span>
        <div className={classes.createDescription}>
          <p>
            A Workspace is a group of boards. Use it to organize your company,
            side hustle, family, or friends.
          </p>
        </div>
      </div>
    </div>
  );
  return (
    <div className={classes.container}>
      <div className={classes.createTitle}>Create</div>
      <div className={classes.line}></div>
      {showMenu ? menuContent : null}
      {showWSF ? (
        <WorkspacesForm setToggleView={setToggleView} setShowWSF={setShowWSF} />
      ) : null}
      {showBF ? (
        <BoardsCreateMenuForm
          setToggleView={setToggleView}
          setShowBF={setShowBF}
        />
      ) : null}
    </div>
  );
}

export default CreateMenu;
