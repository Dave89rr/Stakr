import classes from './BoardsForm.module.css';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkCreateBoard } from '../../../store/boards';

function BoardsForm({ wsId, setShowBoardForm, showBoardForm }) {
  const [validationErrors, setValidationErrors] = useState([]);
  const [name, setName] = useState('');
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = [];
    const board = {
      username: user.username,
      name,
      color: 'White',
      workspaceId: wsId,
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
      setShowBoardForm(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={classes.form}>
        <input
          name="name"
          type="text"
          placeholder="Board Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            border: (validationErrors.length>0?'1px solid #e33d3d':'1px solid rgb(221, 221, 221)'),
            borderRadius: '3px',
            outline: 'none'
          }}
        />
        <div>
          <button type="submit">Create Board</button>
          <img
            onClick={() => setShowBoardForm(false)}
            className={classes.x}
            src="/static/icons/x.svg"
            alt="plus"
          />
        </div>
      </form>
    </>
  );
}

export default BoardsForm;
