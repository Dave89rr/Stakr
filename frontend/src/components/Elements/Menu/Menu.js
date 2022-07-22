import classes from './Menu.module.css';
import { useSelector } from 'react-redux';

function Menu() {
  const workspacesState = useSelector((state) => state.workspaces);
  const loggedinMenu = (
    <div className={classes.wsContainer}>
      <span>Workspaces</span>
      <img
        className={classes.dropArrow}
        src="/media/icons/downarrow-white.svg"
        alt="dropdown menu arrow"
      />
      <div className={classes.createBtn}>Create</div>
    </div>
  );
  return <div className={classes.menuContainer}>{loggedinMenu}</div>;
}

export default Menu;
