import { useState } from 'react';
import { useSelector } from 'react-redux';

import WorkspacesForm from '../../Forms/WorkspacesForm/WorkspacesForm';
import WorkspaceDropdownCard from './WorkspaceDropdownCard'
import classes from "./Menu.module.css";

function Menu({ innerRef, wsView, setWsView }) {
  const user = useSelector((state) => state.session.user);
  const workspaces = useSelector((state) => state.workspaces);

  const [toggleView, setToggleView] = useState(false);

  const handleCreateWs = (e) => {
    setToggleView(!toggleView);
  };

  const handleDropdown = () => {
    setWsView(!wsView);
  }

  const loggedinMenu = (
    <div className={classes.wsContainer}>
      <div ref={innerRef}>
        <span className={classes.wsButton} onClick={() => handleDropdown()}>
          Workspaces
          <img
            className={classes.dropArrow}
            src="/media/icons/downarrow-white.svg"
            alt="dropdown menu arrow"
          />
        </span>
        {wsView?
          <div className={classes.wsDropdown}>
            <div className={classes.wsdTitle}>
              <span>Workspaces</span>
            </div>
            <div className={classes.wsdContent}>
              <p className={classes.wsdContentTitle}>Your Workspaces</p>
              {Object.values(workspaces).length>0 ?
                Object.values(workspaces).map((ws, i) => {
                  return <WorkspaceDropdownCard data={ws} setWsView={setWsView} wsView={wsView} key={i} />
                })
              :<p className={classes.noWsp}>No workspaces...</p>}
            </div>
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
