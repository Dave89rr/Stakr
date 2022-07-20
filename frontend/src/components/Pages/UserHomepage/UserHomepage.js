import classes from './UserHomepage.module.css';
import uniCss from '../pagesuniversal.module.css';
import WorkspaceCluster from '../../Elements/WorkspaceCluster';

function UserHomepage() {
  return (
    <div className={uniCss.mainContainer}>
      <div className={classes.container}>
        <div className={classes.workspacesMenu}></div>
        <div className={classes.workspacesView}>
          <h3>Your Workspaces</h3>
          <WorkspaceCluster />
          <WorkspaceCluster />
        </div>
      </div>
    </div>
  );
}

export default UserHomepage;
