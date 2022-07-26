import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkCreateCard } from "../../../store/cards";

function CreateCard(stackId, positionNum) {
  const [name, setName] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  let position = positionNum.positionNum;

  const handleSubmit = (e) => {
    e.preventDefault();
    const card = {
      stackId,
      username: user.username,
      name,
      position,
      description: "",
      color: "White",
    };

    if (card) {
      dispatch(thunkCreateCard(card));
      setName("");
    }
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
