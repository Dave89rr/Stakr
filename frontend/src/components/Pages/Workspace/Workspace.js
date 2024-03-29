import classes from './Workspace.module.css';
import uniCss from '../pagesuniversal.module.css';
import BoardCard from '../../Elements/BoardCard';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import BoardsForm from '../../Forms/BoardsForm';

function Workspace() {
  const { workspaceId } = useParams();
  const [showBoardForm, setShowBoardForm] = useState(true);
  let workspace = useSelector((state) => state.workspaces[workspaceId]);
  let boards;
  if (workspace) {
    boards = Object.values(workspace.boards);
  } else {
    return null;
  }

  return (
    <div className={uniCss.mainContainer}>
      <div className={classes.wsTitle}>
        <div className={classes.letter}>{workspace.name[0].toUpperCase()}</div>
        <span>{workspace.name}</span>
      </div>
      <div className={classes.boardContainer}>
        {boards && boards.length > 0 ? (
          boards.map((ele, i) => {
            return (
              <div className={classes.cardHolder} key={ele.id}>
                <div className={classes.settings}>
                  <div className={classes.card}>
                    <BoardCard data={ele} key={i} />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div
            className={classes.createBoardcard}
            onClick={() => setShowBoardForm(true)}
          >
            {showBoardForm ? (
              <BoardsForm
                wsId={workspaceId}
                setShowBoardForm={setShowBoardForm}
                showBoardForm={showBoardForm}
              />
            ) : (
              <span>Create New Board</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Workspace;
