import classes from "./Menu.module.css";
import { useState } from 'react';
import WorkspacesForm from '../../Forms/WorkspacesForm/WorkspacesForm';
import { useSelector } from 'react-redux';

function Menu() {
  const [toggleView, setToggleView] = useState(false);
  const user = useSelector((state) => state.session.user);
  const handleCreateWs = (e) => {
    setToggleView(!toggleView);
  };
  const loggedinMenu = (
    <div className={classes.wsContainer}>
      <span>
        Workspaces
        <img
          className={classes.dropArrow}
          src="/media/icons/downarrow-white.svg"
          alt="dropdown menu arrow"
        />
      </span>
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
