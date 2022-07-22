import classes from './WorkspacesForm.module.css';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  thunkCreateWorkspace,
  thunkGetAllWorkspaces,
} from '../../../store/workspaces';

function WorkspacesForm({ toggleView, setToggleView }) {
  const [validationErrors, setValidationErrors] = useState([]);
  const [name, setName] = useState('');
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const workspace = {
      ownerId: user.id,
      name,
    };
    const data = dispatch(thunkCreateWorkspace(workspace));
    dispatch(thunkGetAllWorkspaces(user.id));

    setName('');
    if (data) {
      setValidationErrors(data);
    }
  };

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <div>
          {/* {validationErrors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))} */}
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            placeholder="Workspace Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Create WS</button>
        </div>
      </form>
    </div>
  );
}

export default WorkspacesForm;
