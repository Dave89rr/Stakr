import classes from './WorkspaceDropdownCard.module.css';

const WorkspaceDropdownCard = ({ data }) => {
    return (
        <p className={classes.cardContainer}>{data.name}</p>
    );
}

export default WorkspaceDropdownCard;
