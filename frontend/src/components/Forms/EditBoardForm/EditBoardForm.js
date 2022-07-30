import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { thunkUpdateBoard, thunkDeleteBoard } from "../../../store/boards";
import classes from "../EditCardForm/EditCardForm.module.css";

function EditBoardForm({ data, setDisplay }) {
  const { workspaceId } = useParams();
  const id = parseInt(workspaceId, 10);
  console.log(id);

  const board = useSelector((state) => state.workspaces[id].boards[data]);
  board
    ? console.log("we got a board", board)
    : console.log("we got no boards", board);
  const [name, setName] = useState(data);
  const [color, setColor] = useState(board.color);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    const _board = {
      id: board.id,
      workspaceId: board.workspaceId,
      username: board.username,
      name,
      color,
    };

    dispatch(thunkUpdateBoard(_board));
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
                <label htmlFor="name">Name {data.id}</label>
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
                dispatch(
                  thunkDeleteBoard({
                    id: board.id,
                    workspaceId: workspaceId,
                  })
                );
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
