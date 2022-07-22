import classes from './UserHomepage.module.css';
import uniCss from '../pagesuniversal.module.css';
import WorkspaceCluster from '../../Elements/WorkspaceCluster';

import { useSelector } from 'react-redux';

function UserHomepage() {
  let workspaces = useSelector((state) => state.workspaces)

  return (
    <div className={uniCss.mainContainer}>
      <div className={classes.container}>
        <div className={classes.workspacesMenu}></div>
        <div className={classes.workspacesView}>
          <h3>Your Workspaces</h3>
          {Object.values(workspaces).map(ele => {
            return ele ? <WorkspaceCluster key={ele.id} data={ele} /> : null
          })}
        </div>
      </div>
    </div>
  );
}

export default UserHomepage;
