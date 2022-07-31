import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkUpdateBoard, thunkDeleteBoard } from "../../../store/boards";
import classes from "../EditCardForm/EditCardForm.module.css";

function EditBoardForm({ data, setDisplay2 }) {
  const board = useSelector(
    (state) => state.workspaces[data.workspaceId].boards[data.id]
  );

  const [name, setName] = useState(data.name);
  const [color, setColor] = useState(data.color);

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
    setDisplay2(1);
  };
  return (
    <>
      <div className={classes.background}>
        <div className={classes.container}>
          <div className={classes.formBody}>
            <div className={`${classes.modalCap} ${classes[data.color]}`}>
              <span>{data.name}</span>
              <img
                onClick={() => setDisplay2(1)}
                className={classes.x}
                src="/static/icons/x.svg"
                alt="x"
                style={{
                  filter:
                    data.color === "Grey"
                      ? "invert(100%) sepia(0%) saturate(7500%) hue-rotate(171deg) brightness(99%) contrast(104%)"
                      : null,
                }}
              />
            </div>
            <form className={classes.form} onSubmit={handleSubmit}>
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
                <div className={classes.buttonHolder}>
                  <button type="submit" className={classes.subButton}>
                    Submit
                  </button>
                  <img
                    src="/static/icons/trashcan.svg"
                    className={classes.delButton}
                    onClick={(e) => {
                      e.preventDefault();
                      setDisplay2(1);
                      dispatch(
                        thunkDeleteBoard({
                          id: board.id,
                          workspaceId: board.workspaceId,
                        })
                      );
                    }}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditBoardForm;
{
  /* <button
  className={classes.delButton}
  onClick={(e) => {
    e.preventDefault();
    setDisplay2(1);
    dispatch(
      thunkDeleteBoard({
        id: board.id,
        workspaceId: board.workspaceId,
      })
    );
  }}
>
  Delete Board
</button> */
}
