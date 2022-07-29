import classes from './Workspace.module.css';
import uniCss from '../pagesuniversal.module.css';
import BoardCard from '../../Elements/BoardCard';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import BoardsForm from '../../Forms/BoardsForm';

function Workspace() {
  const { workspaceId } = useParams();
  const [showBoardForm, setShowBoardForm] = useState(false);
  let workspace = useSelector((state) => state.workspaces[workspaceId]);
  let boards;
  if (workspace) {
    boards = Object.values(workspace.boards);
  }

  return (
    <div className={uniCss.mainContainer}>
      <h1>{workspace.name}</h1>
      {boards && boards.length > 0 ? (
        boards.map((ele, i) => {
          return <BoardCard data={ele} key={i} />;
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
  );
}

export default Workspace;
