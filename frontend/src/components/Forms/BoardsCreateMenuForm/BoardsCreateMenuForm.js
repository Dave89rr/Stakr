import classes from './BoardsCreateMenuForm.module.css';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkCreateBoard } from '../../../store/boards';

function BoardsCreateMenuForm({ setShowBF }) {
  const [validationErrors, setValidationErrors] = useState([]);
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [workspaceId, setWorkspaceId] = useState('');
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

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
    }
  };

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="radio"
            value="Blue"
            checked={color === 'Blue'}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div>
          <input
            type="radio"
            value="Orange"
            checked={color === 'Orange'}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div>
          <input
            type="radio"
            value="Green"
            checked={color === 'Green'}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div>
          <input
            type="radio"
            value="Red"
            checked={color === 'Red'}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div>
          <input
            type="radio"
            value="Purple"
            checked={color === 'Purple'}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div>
          <input
            type="radio"
            value="Pink"
            checked={color === 'Pink'}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <input
          name="name"
          type="text"
          placeholder="Board Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          // style={{
          //   border:
          //     validationErrors.length > 0
          //       ? '1px solid #e33d3d'
          //       : '1px solid rgb(221, 221, 221)',
          //   borderRadius: '3px',
          //   outline: 'none',
          // }}
        />

        <button type="submit">Create Board</button>
      </form>
    </div>
  );
}

export default BoardsCreateMenuForm;
