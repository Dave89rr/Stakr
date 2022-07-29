import { NavLink } from 'react-router-dom'
import classes from './WorkspaceDropdownCard.module.css';

const WorkspaceDropdownCard = ({ data, setWsView, wsView }) => {
    return (
        <NavLink to={`/w/${data.id}/home`} style={{textDecoration:'none'}}>
            <div className={classes.cardContainer} onClick={() => setWsView(!wsView)}>
                <div className={classes.letter}>{data.name[0]}</div>
                <p>
                    {data.name}
                </p>
            </div>
        </NavLink>
    );
}

export default WorkspaceDropdownCard;
