import classes from './Menu.module.css';
// import { useSelector } from 'react-redux';
import { useState } from 'react';
import WorkspacesForm from '../../Forms/WorkspacesForm/WorkspacesForm';

function Menu() {
  const [toggleView, setToggleView] = useState(false);
  // const workspacesState = useSelector((state) => state.workspaces);
  const handleCreateWs = (e) => {
    console.log('Clicked');
    setToggleView(true);
  };
  const loggedinMenu = (
    <div className={classes.wsContainer}>
      <span>Workspaces</span>
      <img
        className={classes.dropArrow}
        src="/media/icons/downarrow-white.svg"
        alt="dropdown menu arrow"
      />
      <div className={classes.createBtn} onClick={(e) => handleCreateWs()}>
        Create
      </div>
      {toggleView ? (
        // <div className={classes.formContainer}>
          <WorkspacesForm
            toggleView={toggleView}
            setToggleView={setToggleView}
          />
        // </div>
      ) : null}
    </div>
  );
  return <div className={classes.menuContainer}>{loggedinMenu}</div>;
}

export default Menu;
