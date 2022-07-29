import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import classes from './UserHomepage.module.css';
import uniclass from '../pagesuniversal.module.css';

const WorkspaceMenuCard = ({ data }) => {
    const [dropdown, setDropdown] = useState(false);

    return (
    <>
        <div className={classes.cardContainer} onClick={() => setDropdown(!dropdown)}>
            <div className={classes.letter}>{data.name[0].toUpperCase()}</div>
            <div className={classes.cardText}>
                {data.name}
                {Object.values(data.boards).length>0?
                    <img
                      className={classes.dropArrow}
                      src="/static/icons/downarrow.svg"
                      alt="dropdown menu arrow"
                      style={dropdown?{transform:'scale(1, -1)'}:null}
                    />
                :null}
                </div>
        </div>
        {dropdown ?
            Object.values(data.boards).map(board => {
                return (
                    <NavLink
                        to={`/b/${board.workspaceId}/${board.id}/${board.name}`}
                        style={{textDecoration: 'none', color: (board.color!=='White'?'white':'#172b4d')}}
                    >
                        <div
                            className={`
                                ${classes.boardCard}
                                ${board.color!=='White' ?
                                    uniclass[board.color] : classes.White }
                            `}
                        >{board.name}</div>
                    </NavLink>
                );
            })
        :null}
    </>
    );
}

export default WorkspaceMenuCard
