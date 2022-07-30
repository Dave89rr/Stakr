import classesFWS from './FirstWorkspace.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AuthPageBg from '../../Elements/AuthPageBg/index.js';
import classes from '../SignUpPage/SignUpPage.module.css';
import { useState } from 'react';
import { thunkCreateWorkspace } from '../../../store/workspaces';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function FirstWorkspace() {
  const workspaces = useSelector((state) => state.workspaces);
  const user = useSelector((state) => state.session.user);
  const [name, setName] = useState('');
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  if (Object.values(workspaces).length > 0) {
    return <Redirect to="/" />;
  }
  const onCreate = async (e) => {
    e.preventDefault();
    const errors = [];
    const workspace = {
      ownerId: user.id,
      name,
    };

    if (name.length === 0) {
      errors.push('Name for a workspace cannot be left blank');
    }
    if (errors.length > 0) {
      setErrors(errors);
    } else {
      setErrors([]);
      dispatch(thunkCreateWorkspace(workspace));
      history.push('/');
    }
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
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
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
