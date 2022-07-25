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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = [];
    const workspace = {
      ownerId: user.id,
      name,
    };

    if (!name.length) {
      errors.push(
        'Name for a workspace cannot be left blank. Please provide a name'
      );
    }
    if (errors.length > 0) {
      setValidationErrors(errors);
    } else {
      const data = dispatch(thunkCreateWorkspace(workspace));
      if (data) {
        console.log(data);
        setValidationErrors(data);
      }
      dispatch(thunkGetAllWorkspaces(user.id));
    }

    setName('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          {validationErrors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
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
    </>
  );
}

export default WorkspacesForm;
