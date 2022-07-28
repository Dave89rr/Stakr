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
        {stacks && Object.values(stacks).length
          ? "+ Add another stack"
          : "+ Add stack"}
      </div>
    );
  }

  return (
    <div className={classes.stackForm}>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <div>
            <input
              name="name"
              type="text"
              placeholder="Enter Stack Title..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <button type="submit">Create Stack</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default StacksForm;
