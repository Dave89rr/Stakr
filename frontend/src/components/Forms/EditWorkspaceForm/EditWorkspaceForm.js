import classes from './EditWorkspaceForm.module.css';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkUpdateWorkspace } from '../../../store/workspaces';

function EditWorkspaceForm({
  id,
  wsname,
  setEditWsMode,
  setEditWsId,
  setShowSettings,
}) {
  const [validationErrors, setValidationErrors] = useState([]);
  const user = useSelector((state) => state.session.user);

  const [name, setName] = useState(wsname);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
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
      setShowSettings(false);
    }
  };

  return (
    <div className={classes.editWsContainer}>
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="name">Name</label> */}
        <input
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            border: (validationErrors.length>0?'1px solid #e33d3d':'1px solid rgb(221, 221, 221)'),
            borderRadius: '3px',
            outline: 'none'
          }}
        />
        {/* <button type="submit">Update Name</button> */}
      </form>
    </div>
  );
}

export default EditWorkspaceForm;
