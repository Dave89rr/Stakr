import { Link } from 'react-router-dom'

import classes from './BoardCard.module.css';

function BoardCard({ data }) {
  return (
    <Link to={`/b/${data.workspaceId}/${data.id}/${data.name}`}>
      <div className={classes.boardcard} >
        <span>{data.name}</span>
      </div>
    </Link>
  );
}

export default BoardCard;
