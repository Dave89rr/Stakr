import classes from './WorkspacesForm.module.css';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkCreateWorkspace } from '../../../store/workspaces';

function WorkspacesForm({ setToggleView, setShowWSF }) {
  const [validationErrors, setValidationErrors] = useState([]);
  const [name, setName] = useState('');
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
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
      setValidationErrors(errors);
    } else {
      setValidationErrors([]);
      dispatch(thunkCreateWorkspace(workspace));
      setName('');
      setShowWSF(false);
      setToggleView(false);
    }
  };

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.errors}>
          {validationErrors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <span className={classes.title}>Let's Build a Workspace</span>
          <p>
            Boost your productivity by making it easier for everyone to access
            boards in one location.
          </p>
        </div>
        <div className={classes.input}>
          <label className={classes.label} htmlFor="name">
            Workspace Name
          </label>
          <input
            name="name"
            type="text"
            placeholder="Workspace Name"
            className={classes.inputField}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className={classes.submitBtn} type="submit">
            Create WS
          </button>
        </div>
      </form>
    </div>
  );
}

export default WorkspacesForm;
