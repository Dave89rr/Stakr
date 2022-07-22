import classes from './BoardCard.module.css';

function BoardCard({ data }) {
  return (
    <div className={classes.boardcard}>
      <span>{data.name}</span>
    </div>
  );
}

export default BoardCard;
