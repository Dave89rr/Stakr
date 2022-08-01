import classes from "./BoardsCreateMenuForm.module.css";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkCreateBoard } from "../../../store/boards";

function BoardsCreateMenuForm({ setShowBF, setToggleView }) {
  const [validationErrors, setValidationErrors] = useState([]);
  const [name, setName] = useState("");
  const [inputErr, setInputErr] = useState("none");
  const [selectErr, setSelectErr] = useState("none");
  const [color, setColor] = useState("Blue");
  const [workspaceId, setWorkspaceId] = useState("");
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
      errors.push("Name");
    }
    if (workspaceId === "") {
      errors.push("Workspace");
    }
    if (errors.length > 0) {
      if (errors.includes("Name")) {
        setInputErr("fieldError");
      } else {
        setInputErr("none");
      }
      if (errors.includes("Workspace")) {
        setSelectErr("fieldError");
      } else {
        setSelectErr("none");
      }
    } else {
      setValidationErrors([]);
      dispatch(thunkCreateBoard(board));
      setName("");
      setShowBF(false);
      setToggleView(false);
    }
  };

  const check = (
    <img src="/static/icons/check.svg" alt="color selection indicator" />
  );

  return (
    <div className={classes.container}>
      <div className={classes.miniContainer}>
        <div className={`${classes.miniBoard} ${classes[`${color}`]}`}>
          <img
            className={classes.boardImg}
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
            <label className={`${classes.Blue} ${classes.radio}`}>
              <input
                type="radio"
                value="Blue"
                className={classes.radiobtn}
                checked={color === "Blue"}
                onChange={(e) => setColor(e.target.value)}
              />
              {color === "Blue" ? (
                <div className={classes.check}>{check}</div>
              ) : null}
            </label>
          </div>
          <div className={classes.radioColor}>
            <label className={`${classes.Orange} ${classes.radio}`}>
              <input
                type="radio"
                value="Orange"
                className={classes.radiobtn}
                checked={color === "Orange"}
                onChange={(e) => setColor(e.target.value)}
              />
              {color === "Orange" ? (
                <div className={classes.check}>{check}</div>
              ) : null}
            </label>
          </div>
          <div className={classes.radioColor}>
            <label className={`${classes.Green} ${classes.radio}`}>
              <input
                type="radio"
                value="Green"
                className={classes.radiobtn}
                checked={color === "Green"}
                onChange={(e) => setColor(e.target.value)}
              />
              {color === "Green" ? (
                <div className={classes.check}>{check}</div>
              ) : null}
            </label>
          </div>
          <div className={classes.radioColor}>
            <label className={`${classes.Red} ${classes.radio}`}>
              <input
                type="radio"
                value="Red"
                className={classes.radiobtn}
                checked={color === "Red"}
                onChange={(e) => setColor(e.target.value)}
              />
              {color === "Red" ? (
                <div className={classes.check}>{check}</div>
              ) : null}
            </label>
          </div>
          <div className={classes.radioColor}>
            <label className={`${classes.Purple} ${classes.radio}`}>
              <input
                type="radio"
                value="Purple"
                className={classes.radiobtn}
                checked={color === "Purple"}
                onChange={(e) => setColor(e.target.value)}
              />
              {color === "Purple" ? (
                <div className={classes.check}>{check}</div>
              ) : null}
            </label>
          </div>
          <div className={classes.radioColor}>
            <label className={`${classes.Pink} ${classes.radio}`}>
              <input
                type="radio"
                value="Pink"
                className={classes.radiobtn}
                checked={color === "Pink"}
                onChange={(e) => setColor(e.target.value)}
              />
              {color === "Pink" ? (
                <div className={classes.check}>{check}</div>
              ) : null}
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
            className={`${classes.inputField} ${classes[inputErr]}`}
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
            className={`${classes.selectField} ${classes[selectErr]}`}
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
          Create
        </button>
      </form>
    </div>
  );
}

export default BoardsCreateMenuForm;
