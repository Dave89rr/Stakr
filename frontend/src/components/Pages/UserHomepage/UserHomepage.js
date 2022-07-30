import classes from './UserHomepage.module.css';
import uniCss from '../pagesuniversal.module.css';
import WorkspaceCluster from '../../Elements/WorkspaceCluster';

import { useSelector } from 'react-redux';
import WorkspaceMenuCard from './WorkspaceMenuCard';

function UserHomepage() {
  let workspaces = useSelector((state) => state.workspaces);
  if (!workspaces) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={uniCss.mainContainer}>
      <div className={classes.container}>
        <div className={classes.workspacesMenu}>
          <p className={classes.wsmTitle}>Workspaces</p>
          {Object.values(workspaces).length>0 ?
            Object.values(workspaces).map((ws, i) => {
              return <WorkspaceMenuCard data={ws} key={i}/>
            }):<p className={classes.noWsYet}>No workspaces yet!</p>}
        </div>
        <div className={classes.workspacesView}>
          <h3>YOUR WORKSPACES</h3>
          {Object.values(workspaces).map((ele) => {
            return ele ? <WorkspaceCluster key={ele.id} id={ele.id} /> : null;
          })}
        </div>
      </div>
    </div>
  );
}

export default UserHomepage;
