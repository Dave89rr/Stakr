import classesFWS from './FirstWorkspace.module.css';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AuthPageBg from '../../Elements/AuthPageBg/index.js';
import classes from '../SignUpPage/SignUpPage.module.css';
import { useState } from 'react';

function FirstWorkspace() {
  const workspaces = useSelector((state) => state.workspaces);
  const [workspace, setWorkspace] = useState('');
  const [errors, setErrors] = useState([]);
  // Commented out for development
  //   if (Object.values(workspaces).length > 0) {
  //     return <Redirect to="/" />;
  //   }
  const onCreate = (e) => {
    e.preventDefault();
  };
  return (
    <div className={classesFWS.mainContainer}>
      <div className={classes.formContainer}>
        <img src="/static/icons/stakr-logo.svg" className={classes.logo} />
        <div className={classes.formWrapper}>
          <form onSubmit={onCreate} className={classesFWS.form}>
            <div className={classesFWS.topImg}>
              <img src="/media/icons/first-workspace.svg" />
            </div>
            <div className={classesFWS.title}>
              <h2>Let's set up your Workspace</h2>
            </div>
            <div>
              {errors.map((error, ind) => (
                <div className={classes.error}>
                  <div key={ind}>{error}</div>
                </div>
              ))}
            </div>
            <div className={classesFWS.signupText}>
              Your Stakr Workspace is the place where you can quickly organize
              and start getting things done.
            </div>
            <div>
              <label htmlFor="workspace" className={classesFWS.label}>
                Name Your Workspace
              </label>
              <input
                className={classes.input}
                name="workspace"
                type="text"
                placeholder="Stakr Workspace"
                value={workspace}
                onChange={(e) => {
                  setWorkspace(e.target.value);
                }}
              />
            </div>
            <button type="submit" className={classesFWS.btn}>
              Continue
            </button>
          </form>
        </div>
      </div>
      <div className={classesFWS.bgContainer}>
        <AuthPageBg />
      </div>
    </div>
  );
}

export default FirstWorkspace;
