import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import classes from './BoardCard.module.css';

function BoardCard({ data }) {

  const [bgc, setBgc] = useState('#ffffff');

  useEffect(() => {
    //handle color
    switch(data.color) {
      case 'White':
        setBgc(classes.white);
        break;
      case 'Red':
        setBgc(classes.red);
        break;
      case 'Orange':
        setBgc(classes.orange);
        break;
      case 'Blue':
        setBgc(classes.blue);
        break;
      case 'Yellow':
        setBgc(classes.yellow);
        break;
      case 'Green':
        setBgc(classes.green);
        break;
      case 'Purple':
        setBgc(classes.purple);
        break;
      case 'Pink':
        setBgc(classes.pink);
        break;
      case 'Grey':
        setBgc(classes.grey);
        break;
    }
  }, []);

  return (
    <Link to={`/b/${data.workspaceId}/${data.id}/${data.name}`} style={{textDecoration:'none'}}>
      <div className={`${classes.boardcard} ${bgc}`} >
        {data.name}
      </div>
    </Link>
  );
}

export default BoardCard;
