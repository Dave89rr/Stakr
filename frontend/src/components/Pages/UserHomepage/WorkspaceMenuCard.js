import classes from './UserHomepage.module.css';

const WorkspaceMenuCard = ({ data }) => {
    return (
        <div className={classes.cardContainer}>
            <div className={classes.letter}>{data.name[0].toUpperCase()}</div>
            <div className={classes.cardText}>
                {data.name}
                <img
                  className={classes.dropArrow}
                  src="/static/icons/downarrow.svg"
                  alt="dropdown menu arrow"
                />
            </div>
        </div>
    );
}

export default WorkspaceMenuCard
