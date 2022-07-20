import classes from './UserHomepage.module.css';
import uniCss from '../pagesuniversal.module.css';
import BoardCard from '../../Elements/BoardCard';
import WorkspaceCluster from '../../Elements/WorkspaceCluster';

function UserHomepage() {
  return (
    <div className={uniCss.mainContainer}>
      <h3>Your Workspaces</h3>
      <WorkspaceCluster />
    </div>
  );
}

export default UserHomepage;
