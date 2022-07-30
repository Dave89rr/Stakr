import classes from "./Workspace.module.css";
import uniCss from "../pagesuniversal.module.css";
import BoardCard from "../../Elements/BoardCard";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import { useState } from "react";

import BoardsForm from "../../Forms/BoardsForm";
import EditBoardForm from "../../Forms/EditBoardForm/EditBoardForm";

function Workspace() {
  const { workspaceId } = useParams();
  const [showBoardForm, setShowBoardForm] = useState(true);
  const [display, setDisplay] = useState(false);
  let workspace = useSelector((state) => state.workspaces[workspaceId]);
  let boards;
  if (workspace) {
    boards = Object.values(workspace.boards);
  } else {
    return null;
  }

  return (
    <div className={uniCss.mainContainer}>
      <h1>{workspace.name}</h1>
      {boards && boards.length > 0 ? (
        boards.map((ele) => {
          return (
            <div className={classes.cardHolder}>
              <div className={classes.settings}>
                <div className={classes.card}>
                  <BoardCard data={ele} key={ele.id} />
                </div>
                <div classes={classes.gearDiv}>
                  <img
                    className={classes.gear}
                    src="/static/icons/settings-light.svg"
                    onClick={async () => {
                      setDisplay(true);
                    }}
                  />
                </div>
              </div>
              {display ? (
                <EditBoardForm setDisplay={setDisplay} data={ele} />
              ) : null}
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
  );
}

export default Workspace;
