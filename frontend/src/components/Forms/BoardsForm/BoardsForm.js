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
            placeholder="Board Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Create Board</button>
        </div>
      </form>
    </>
  );
}

export default BoardsForm;
