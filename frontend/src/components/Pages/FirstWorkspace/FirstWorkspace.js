import classes from './FirstWorkspace.module.css';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AuthPageBg from '../../Elements/AuthPageBg/index.js';

function FirstWorkspace() {
  const workspaces = useSelector((state) => state.workspaces);
  // Commented out for development
  //   if (Object.values(workspaces).length > 0) {
  //     return <Redirect to="/" />;
  //   }
  return (
    <div className={classes.mainContainer}>
      <div className={classes.bgContainer}>
        <AuthPageBg />
      </div>
    </div>
  );
}

export default FirstWorkspace;
