import classes from './Card.module.css';

function Card({ data }) {
  return (
    <div className={classes.cardContainer}>
        <p className={classes.description}>{data.name}</p>
    </div>
  );
}

export default Card;
