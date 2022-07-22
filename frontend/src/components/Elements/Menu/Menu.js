import classes from './Menu.module.css';
import { useSelector } from 'react-redux';

function Menu() {
  // const workspacesState = useSelector((state) => state.workspaces);
  const workspaces = (
    <div className={classes.wsContainer}>
      <span>Workspaces</span>
      <img
        className={classes.dropArrow}
        src="/media/icons/downarrow-white.svg"
        alt="dropdown menu arrow"
      />
    </div>
  );
  return <div className={classes.menuContainer}>{workspaces}</div>;
}

export default Menu;
