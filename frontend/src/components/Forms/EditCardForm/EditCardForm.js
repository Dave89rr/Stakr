import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkUpdateCardData, thunkDeleteCard } from "../../../store/cards";
import classes from "./EditCardForm.module.css";
import { useParams } from "react-router-dom";

function EditCardForm({ setDisplay, data, cardOrder, setCardOrder }) {
  const [name, setName] = useState(data.name);
  const [description, setDescription] = useState(data.description);
  const [color, setColor] = useState(data.color);
  const { workspaceId } = useParams();

  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const card = {
      id: data.id,
      stackId: data.stackId,
      username: user.username,
      name,
      position: data.position,
      description,
      color,
    };

    if (card) {
      dispatch(thunkUpdateCardData(card, workspaceId));
      console.log(card);
      setDisplay(false);
    }
  };

  return (
    <>
      <div className={classes.background}></div>
      <div className={classes.container}>
        <div>
          <div
            className={classes.closeModel}
            onClick={(e) => {
              setDisplay(false);
            }}
          >
            x
          </div>
          <div className={classes.formBody}>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Name</label>
                <div>
                  <input
                    className={classes.nameField}
                    name="name"
                    type="text"
                    placeholder="Enter a card name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="color">Select a color</label>
                  <select
                    className={classes.selectField}
                    color="color"
                    onChange={(e) => setColor(e.target.value)}
                  >
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
                </div>
                <label htmlFor="description">Description</label>
                <div>
                  <textarea
                    className={classes.textArea}
                    description="description"
                    type="text"
                    placeholder="Enter your card description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className={classes.subButton}>
                  Submit
                </button>
              </div>
            </form>
            <button
              className={classes.delButton}
              onClick={(e) => {
                e.preventDefault();
                setDisplay(false);
                const newOrder = { ...cardOrder };
                newOrder[data.stackId].splice(data.position, 1);
                setCardOrder(newOrder);
                dispatch(thunkDeleteCard(data.id, workspaceId));
              }}
            >
              Delete Card
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditCardForm;
