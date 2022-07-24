import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkCreateStack } from "../../../store/stacks";
import { useParams } from "react-router-dom";

function StacksForm() {
  const [name, setName] = useState("");
  const user = useSelector((state) => state.session.user);
  const url = useParams();
  const workspaceId = url.workspaceId;
  const boardId = url.boardId;
  dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const stack = {
      boardId,
      workspaceId,
      username: user.name,
      name,
    };
    if (stack) {
      dispatch(thunkCreateStack(stack));
      setName("");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          {validationErrors.map((error, i) => (
            <div key={i}>{error}</div>
          ))}
        </div>
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
    </>
  );
}

export default StacksForm;
