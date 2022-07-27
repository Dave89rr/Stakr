import classes from './EditWorkspaceForm.module.css';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkUpdateWorkspace } from '../../../store/workspaces';

function EditWorkspaceForm({ id, wsname, setEditWsMode, setEditWsId }) {
  const [validationErrors, setValidationErrors] = useState([]);
  const user = useSelector((state) => state.session.user);

  const [name, setName] = useState(wsname);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    console.log('attempted handle submit ws name');
    e.preventDefault();
    const errors = [];
    const workspace = {
      id: id,
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
      dispatch(thunkUpdateWorkspace(workspace));
      setName('');
      setEditWsMode(false);
      setEditWsId(null);
    }
  };

  return (
    <div className={classes.editWsContainer}>
      <form onSubmit={handleSubmit}>
        <div>
          {validationErrors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          {/* <label htmlFor="name">Name</label> */}
          <input
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {/* <button type="submit">Update Name</button> */}
        </div>
      </form>
    </div>
  );
}

export default EditWorkspaceForm;
