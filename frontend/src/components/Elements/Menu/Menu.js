import { useState } from 'react';
import { useSelector } from 'react-redux';

import WorkspacesForm from '../../Forms/WorkspacesForm/WorkspacesForm';
import classes from "./Menu.module.css";

function Menu({ innerRef, wsView, setWsView }) {
  const user = useSelector((state) => state.session.user);

  const [toggleView, setToggleView] = useState(false);

  const handleCreateWs = (e) => {
    setToggleView(!toggleView);
  };

  const handleDropdown = () => {
    setWsView(true);
  }

  const loggedinMenu = (
    <div className={classes.wsContainer}>
      <div ref={innerRef} onClick={() => handleDropdown()}>
        <span className={classes.wsButton}>
          Workspaces
          <img
            className={classes.dropArrow}
            src="/media/icons/downarrow-white.svg"
            alt="dropdown menu arrow"
          />
        </span>
        {wsView?
          <div className={classes.wsDropdown}>
            <p>Workspaces</p>
            <p>Workspaces</p>
            <p>Workspaces</p>
            <p>Workspaces</p>
            <p>Workspaces</p>
            <p>Workspaces</p>
            <p>Workspaces</p>
            <p>Workspaces</p>
            <p>Workspaces</p>
            <p>Workspaces</p>
          </div>:null}
      </div>
      {user && (
        <div className={classes.createBtn} onClick={(e) => handleCreateWs()}>
          <span>Create</span>
        </div>
      )}
      {toggleView && (
        <div className={classes.formContainer}>
          <WorkspacesForm
            toggleView={toggleView}
            setToggleView={setToggleView}
          />
        </div>
      )}
    </div>
  );
  return <div className={classes.menuContainer}>{loggedinMenu}</div>;
}

export default Menu;
