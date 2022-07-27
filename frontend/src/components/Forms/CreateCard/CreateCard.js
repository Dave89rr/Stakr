import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkCreateCard } from "../../../store/cards";

function CreateCard({ stackId, setForm }) {
  const [name, setName] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const { workspaceId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const card = {
      stackId,
      username: user.username,
      name,
      position: 100000,
      description: "Add a description...",
      color: "White",
      workspaceId,
    };

    await dispatch(thunkCreateCard(card));
    setName("");
    setForm("False");
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
