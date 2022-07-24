import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkCreateStack } from "../../../store/stacks";

function StacksForm() {
  const [name, setName] = useState("");
  const user = useSelector((state) => state.session.user);
  const workspaces = useSelector((state) => state.workspaces);
  dispatch = useDispatch();
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          {/* {validationErrors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))} */}
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
