import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkCreateCard } from "../../../store/cards";

function CreateCard({ stackId }) {
  const [name, setName] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  // console.log(stackId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const card = {
      stackId,
      username: user.username,
      name,
      position: 100000,
      description: "Add a description...",
      color: "White",
    };

    await dispatch(thunkCreateCard(card));
    setName("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            placeholder="Enter Card Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Create Card</button>
        </div>
      </form>
    </div>
  );
}

export default CreateCard;
