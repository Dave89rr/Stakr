import classes from './WorkspaceDropdownCard.module.css';

const WorkspaceDropdownCard = ({ data }) => {
    return (
        <div className={classes.cardContainer}>
            <div className={classes.letter}>{data.name[0]}</div>
            <p>
                {data.name}
            </p>
        </div>
    );
}

export default WorkspaceDropdownCard;
