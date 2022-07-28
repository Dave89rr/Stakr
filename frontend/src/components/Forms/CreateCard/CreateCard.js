import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkCreateCard } from "../../../store/cards";
import classes from "../StacksForm/StacksForm.module.css";

function CreateCard({ stackId, setForm, cardOrder, setCardOrder }) {
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

    setName("");
    setForm("False");
    const newCard = await dispatch(thunkCreateCard(card, workspaceId));

    const newCardOrder = { ...cardOrder };
    let curOrder;
    if (newCardOrder[stackId]) {
      curOrder = newCardOrder[stackId];
      curOrder.push(newCard);
      newCardOrder[stackId] = curOrder;
    } else {
      newCardOrder[stackId] = [newCard];
    }
    setCardOrder(newCardOrder);
  };
  console.log(cardOrder);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <div>
          <input
            className={classes.formName}
            name="name"
            type="text"
            placeholder="Enter Card Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <div className={classes.formButtonHolder}>
            <button className={classes.formButton} type="submit">
              Create Card
            </button>
            <div className={classes.formClose} onClick={() => setForm("False")}>
              X
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateCard;
