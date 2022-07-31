import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunkUpdateCardData, thunkDeleteCard } from '../../../store/cards';
import classes from './EditCardForm.module.css';
import { useParams } from 'react-router-dom';

function EditCardForm({ setDisplay, data, cardOrder, setCardOrder }) {
  const [name, setName] = useState(data.name);
  const [description, setDescription] = useState(data.description);
  const [color, setColor] = useState(data.color);
  const { workspaceId } = useParams();

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const card = {
      id: data.id,
      name,
      description,
      color,
    };

    if (card) {
      dispatch(thunkUpdateCardData(card, workspaceId));
      setDisplay(false);
    }
  };

  return (
    <>
      <div className={classes.background}></div>
      <div className={classes.container}>
        <div className={classes.formBody}>
          <div className={`${classes.modalCap} ${classes[data.color]}`}>
            <span>{data.name}</span>
            <img
              onClick={() => setDisplay(false)}
              className={classes.x}
              src="/static/icons/x.svg"
              alt="x"
              style={{
                filter:
                  data.color === 'Grey'
                    ? 'invert(100%) sepia(0%) saturate(7500%) hue-rotate(171deg) brightness(99%) contrast(104%)'
                    : null,
              }}
            />
          </div>
          <form className={classes.form} onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" style={{ color: '#172b4d' }}>
                Name
              </label>
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
                <label htmlFor="color" style={{ color: '#172b4d' }}>
                  Select a color
                </label>
                <select
                  className={classes.selectField}
                  color={color}
                  onChange={(e) => setColor(e.target.value)}
                >
                  <option value={data.color}>Choose a color</option>
                  <option value={'White'}>White</option>
                  <option value={'Red'}>Red</option>
                  <option value={'Orange'}>Orange</option>
                  <option value={'Blue'}>Blue</option>
                  <option value={'Yellow'}>Yellow</option>
                  <option value={'Green'}>Green</option>
                  <option value={'Purple'}>Purple</option>
                  <option value={'Pink'}>Pink</option>
                  <option value={'Grey'}>Grey</option>
                </select>
              </div>
              <label htmlFor="description" style={{ color: '#172b4d' }}>
                Description
              </label>
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
              <div className={classes.buttonHolder}>
                <button type="submit" className={classes.subButton}>
                  Submit
                </button>
                <img
                  src="/static/icons/trashcan.svg"
                  className={classes.delButton}
                  onClick={(e) => {
                    e.preventDefault();
                    setDisplay(false);
                    const newOrder = { ...cardOrder };
                    newOrder[data.stackId].splice(data.position, 1);
                    setCardOrder(newOrder);
                    dispatch(thunkDeleteCard(data.id, workspaceId));
                  }}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditCardForm;
