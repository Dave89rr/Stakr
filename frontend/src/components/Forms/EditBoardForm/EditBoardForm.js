import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkUpdateBoard, thunkDeleteBoard } from "../../../store/boards";
import classes from "../EditCardForm/EditCardForm.module.css";

function EditBoardForm({ data, setDisplay }) {
  const [name, setName] = useState(data.name);
  const [color, setColor] = useState(data.color);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const board = {
      id: data.id,
      workspaceId: data.workspaceId,
      username: data.username,
      name,
      color,
    };

    console.log(data);

    dispatch(thunkUpdateBoard(board));
    setDisplay(false);
  };

  return (
    <>
      <div className={classes.background}></div>
      <div className={classes.container}>
        <div>
          <div
            className={classes.closeModel}
            onClick={(e) => {
              setDisplay(false);
            }}
          >
            x
          </div>
          <div className={classes.formBody}>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Name</label>
                <div>
                  <input
                    className={classes.nameField}
                    name="name"
                    type="text"
                    placeholder="Enter a card name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="color">Select a color</label>
                  <select
                    className={classes.selectField}
                    color={color}
                    onChange={(e) => setColor(e.target.value)}
                  >
                    <option value={data.color}>Choose a color</option>
                    <option value={"White"}>White</option>
                    <option value={"Red"}>Red</option>
                    <option value={"Orange"}>Orange</option>
                    <option value={"Blue"}>Blue</option>
                    <option value={"Yellow"}>Yellow</option>
                    <option value={"Green"}>Green</option>
                    <option value={"Purple"}>Purple</option>
                    <option value={"Pink"}>Pink</option>
                    <option value={"Grey"}>Grey</option>
                  </select>
                </div>
                <button type="submit" className={classes.subButton}>
                  Submit
                </button>
              </div>
            </form>
            <button
              className={classes.delButton}
              onClick={(e) => {
                e.preventDefault();
                setDisplay(false);
                dispatch(thunkDeleteBoard(data.id));
              }}
            >
              Delete Board
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditBoardForm;
