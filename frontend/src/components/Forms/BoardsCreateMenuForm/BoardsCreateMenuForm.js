import classes from './BoardsCreateMenuForm.module.css';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkCreateBoard } from '../../../store/boards';

function BoardsCreateMenuForm({ setShowBF, setToggleView }) {
  const [validationErrors, setValidationErrors] = useState([]);
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [workspaceId, setWorkspaceId] = useState('');
  const user = useSelector((state) => state.session.user);
  const workspaces = useSelector((state) => state.workspaces);
  const dispatch = useDispatch();

  let workspacesArr;
  if (workspaces) {
    workspacesArr = Object.values(workspaces);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = [];
    const board = {
      username: user.username,
      name,
      color,
      workspaceId,
    };

    if (name.length === 0) {
      errors.push('Name for a board cannot be left blank');
    }
    if (errors.length > 0) {
      setValidationErrors(errors);
    } else {
      setValidationErrors([]);
      dispatch(thunkCreateBoard(board));
      setName('');
      setShowBF(false);
      setToggleView(false);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.miniContainer}>
        <div className={classes.miniBoard}>
          <img
            src="https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg"
            alt=""
            role="presentation"
          />
        </div>
      </div>
      <form onSubmit={handleSubmit} className={classes.form}>
        <span className={classes.label}>Background</span>
        <div className={classes.radioContainer}>
          <div className={classes.radioColor}>
            <label className={`${classes.blue} ${classes.radio}`}>
              <input
                type="radio"
                value="Blue"
                className={classes.radiobtn}
                checked={color === 'Blue'}
                onChange={(e) => setColor(e.target.value)}
              />
            </label>
          </div>
          <div className={classes.radioColor}>
            <label className={`${classes.orange} ${classes.radio}`}>
              <input
                type="radio"
                value="Orange"
                className={classes.radiobtn}
                checked={color === 'Orange'}
                onChange={(e) => setColor(e.target.value)}
              />
            </label>
          </div>
          <div className={classes.radioColor}>
            <label className={`${classes.green} ${classes.radio}`}>
              <input
                type="radio"
                value="Green"
                className={classes.radiobtn}
                checked={color === 'Green'}
                onChange={(e) => setColor(e.target.value)}
              />
            </label>
          </div>
          <div className={classes.radioColor}>
            <label className={`${classes.red} ${classes.radio}`}>
              <input
                type="radio"
                value="Red"
                className={classes.radiobtn}
                checked={color === 'Red'}
                onChange={(e) => setColor(e.target.value)}
              />
            </label>
          </div>
          <div className={classes.radioColor}>
            <label className={`${classes.purple} ${classes.radio}`}>
              <input
                type="radio"
                value="Purple"
                className={classes.radiobtn}
                checked={color === 'Purple'}
                onChange={(e) => setColor(e.target.value)}
              />
            </label>
          </div>
          <div className={classes.radioColor}>
            <label className={`${classes.pink} ${classes.radio}`}>
              <input
                type="radio"
                value="Pink"
                className={classes.radiobtn}
                checked={color === 'Pink'}
                onChange={(e) => setColor(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className={classes.input}>
          <label className={classes.label} htmlFor="name">
            Board Title
          </label>
          <input
            name="name"
            type="text"
            className={classes.inputField}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={classes.intput}>
          <label className={classes.label} htmlFor="workspace">
            Workspace
          </label>
          <select
            name="workspace"
            className={classes.selectField}
            onChange={(e) => setWorkspaceId(e.target.value)}
          >
            <option value="">Select Workspace</option>
            {workspacesArr.map((workspace) => {
              return (
                <option
                  className={classes.option}
                  value={workspace.id}
                  key={workspace.id}
                >
                  {workspace.name}
                </option>
              );
            })}
          </select>
        </div>
        <button className={classes.submitBtn} type="submit">
          Create Board
        </button>
      </form>
    </div>
  );
}

export default BoardsCreateMenuForm;
