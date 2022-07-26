import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkCreateStack } from "../../../store/stacks";
import { useParams } from "react-router-dom";
import classes from "./StacksForm.module.css";

function StacksForm(positionNum) {
  const [name, setName] = useState("");
  const [form, setForm] = useState(1);
  const user = useSelector((state) => state.session.user);
  const { workspaceId, boardId } = useParams();
  let position = positionNum.positionNum;

  const test = useSelector((state) => state.workspaces[workspaceId]);
  let stacks;

  if (test) {
    stacks = test.stacks;
  }

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const stack = {
      boardId,
      username: user.username,
      name,
      position,
      workspaceId,
    };

    if (stack) {
      dispatch(thunkCreateStack(stack));
      setName("");
      setForm(1);
    }
  };
  if (form === 1) {
    return (
      <div
        className={classes.addStack}
        onClick={(e) => {
          e.preventDefault();
          setForm(2);
        }}
      >
        + Add another stack
      </div>
    );
  }

  return (
    <div className={classes.stackForm}>
      <div>
        <form onSubmit={handleSubmit}>
          {/* <div>
          {validationErrors.map((error, i) => (
            <div key={i}>{error}</div>
            ))}
          </div> */}
          <div>
            <label htmlFor="name">Name</label>
            <input
              name="name"
              type="text"
              placeholder="Enter Stack Title..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit">Create Stack</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StacksForm;
