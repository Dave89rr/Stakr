import { useState } from 'react';
import WorkspacesForm from '../../Forms/WorkspacesForm/WorkspacesForm';
import classes from './CreateMenu.module.css';
import BoardsCreateMenuForm from '../../Forms/BoardsCreateMenuForm';

function CreateMenu({ setToggleView, innerRef }) {
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
  const handleBack = () => {
    setShowBF(false);
    setShowWSF(false);
    setShowMenu(true);
  };
  const handleClose = () => {
    setToggleView(false);
  };
  const backArrow = (
    <div onClick={handleBack}>
      <img
        className={classes.stakrIcon}
        src="/static/icons/backarrow.svg"
        alt="back button"
      />
    </div>
  );
  const closeIcon = (
    <div onClick={handleClose}>
      <img
        className={classes.stakrIcon}
        src="/static/icons/x.svg"
        alt="close menu button"
      />
    </div>
  );
  const workspaceIcon = (
    <img
      className={classes.stakrIcon}
      style={{ height: '20px' }}
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
      <div className={classes.createTitle}>
        <span></span>Create<span></span>
      </div>
      <div className={classes.line}></div>
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
      {showMenu ? menuContent : null}
      {showWSF ? (
        <div className={classes.formContainer}>
          <div className={classes.createTitle}>
            <div className={classes.userInteraction}>{backArrow}</div>
            <span>Create Workspace</span>
            <div className={classes.userInteraction}>{closeIcon}</div>
          </div>
          <div className={classes.line}></div>
          <WorkspacesForm
            setToggleView={setToggleView}
            setShowWSF={setShowWSF}
          />
        </div>
      ) : null}
      {showBF ? (
        <div className={classes.formContainer}>
          <div className={classes.createTitle}>
            <div className={classes.userInteraction}>{backArrow}</div>
            <span>Create Board</span>
            <div className={classes.userInteraction}>{closeIcon}</div>
          </div>
          <div className={classes.line}></div>
          <BoardsCreateMenuForm
            setToggleView={setToggleView}
            setShowBF={setShowBF}
          />
        </div>
      ) : null}
    </div>
  );
}

export default CreateMenu;
