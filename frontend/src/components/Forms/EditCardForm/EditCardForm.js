import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkCreateCard } from '../../../store/cards';
import classes from './EditCardForm.module.css';

function EditCardForm(stackId, positionNum) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('White');
  const [display, setDisplay] = useState(true);
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
      // dispatch(thunkCreateCard(card));
      console.log('This would update');
      setName('');
      setColor('White');
      setDescription('');
      setDisplay('none');
    }
  };

  return (
    <>
      <div className={classes.background} style={{ display: display }}></div>
      <div className={classes.container} style={{ display: display }}>
        <div>
          <div
            className={classes.closeModel}
            onClick={(e) => {
              console.log('This would close');
              setDisplay('none');
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
                  />
                </div>
                <div>
                  <label htmlFor="color">Select a color</label>
                  <select
                    className={classes.selectField}
                    color="color"
                    onChange={(e) => setColor(e.target.value)}
                  >
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
                <label htmlFor="description">Description</label>
                <div>
                  <textarea
                    className={classes.textArea}
                    description="description"
                    type="text"
                    placeholder="Enter your card description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                setDisplay('none');
                console.log('this would del');
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