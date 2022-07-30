import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkCreateStack } from "../../../store/stacks";
import { useParams } from "react-router-dom";
import classes from "./StacksForm.module.css";

function StacksForm() {
  const [name, setName] = useState("");
  const [form, setForm] = useState(1);
  const user = useSelector((state) => state.session.user);
  const { workspaceId, boardId } = useParams();

  const workspaces = useSelector((state) => state.workspaces[workspaceId]);
  const stacks = workspaces.stacks;
  let position;
  if (workspaces && stacks) {
    // calculate new stack position:
    let stackIds = Object.values(stacks).map((ele) => ele.id.toString());
    let filterStackIds = stackIds.filter(
      (id) => stacks[id].boardId === parseInt(boardId)
    );
    let sortedStacks = filterStackIds.sort(
      (a, b) => stacks[a].position - stacks[b].position
    );
    position = sortedStacks.length;
  } else if (workspaces && !stacks) {
    position = 0;
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
        {stacks && Object.values(stacks).length ? (
          <div className={classes.plusContainer}>
            <img src="/static/icons/plus.svg" className={classes.plus} /> Add
            another stack
          </div>
        ) : (
          <div className={classes.plusContainer}>
            <img src="/static/icons/plus.svg" className={classes.plusFirst} />{" "}
            Add stack
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={classes.stackForm}>
      <div className={classes.formContainer}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className={classes.nameText}>
            Name
          </label>
          <div>
            <input
              className={classes.formName}
              name="name"
              type="text"
              placeholder="Enter Stack Title..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <div className={classes.formButtonHolder}>
              <button className={classes.formButton} type="submit">
                Add Stack
              </button>
              <div className={classes.formClose} onClick={() => setForm(1)}>
                <img src="/static/icons/x.svg" className={classes.formClose} />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default StacksForm;
