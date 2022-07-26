import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkCreateCard } from "../../../store/cards";

function CardForm(stackId, positionNum) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("White");
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
      description,
      color,
    };

    if (card) {
      dispatch(thunkCreateCard(card));
      setName("");
      setColor("White");
      setDescription("");
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              name="name"
              type="text"
              placeholder="Enter Card Title..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="color">Select A Color</label>
            <select color="color" onChange={(e) => setColor(e.target.value)}>
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
            <label htmlFor="description">Description</label>
            <textarea
              description="description"
              type="text"
              placeholder="Enter Your Card Description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Create Card</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CardForm;
