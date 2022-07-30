import { useState } from 'react';
import WorkspacesForm from '../../Forms/WorkspacesForm/WorkspacesForm';
import classes from './CreateMenu.module.css';

function CreateMenu({ setToggleView }) {
  const [showMenu, setShowMenu] = useState(true);
  const [showWSF, setShowWSF] = useState(false);
  return (
    <div className={classes.container}>
      <div className={classes.createTitle}>Create</div>
      <div className={classes.line}></div>
      {showMenu ? <span>Create Workspace</span> : null}
      <WorkspacesForm setToggleView={setToggleView} setShowWSF={setShowWSF} />
      {/* {showWSF ? (
        <WorkspacesForm setToggleView={setToggleView} setShowWSF={setShowWSF} />
      ) : null} */}
    </div>
  );
}

export default CreateMenu;
