import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditBoardForm from "../../Forms/EditBoardForm/EditBoardForm";

import classes from "./BoardCard.module.css";

function BoardCard({ data }) {
  const board = data;
  const [bgc, setBgc] = useState("#ffffff");
  useEffect(() => {
    // ==== handle color ==== //
    switch (data.color) {
      case "White":
        setBgc(classes.white);
        break;
      case "Red":
        setBgc(classes.red);
        break;
      case "Orange":
        setBgc(classes.orange);
        break;
      case "Blue":
        setBgc(classes.blue);
        break;
      case "Yellow":
        setBgc(classes.yellow);
        break;
      case "Green":
        setBgc(classes.green);
        break;
      case "Purple":
        setBgc(classes.purple);
        break;
      case "Pink":
        setBgc(classes.pink);
        break;
      case "Grey":
        setBgc(classes.grey);
        break;
      default:
        setBgc(classes.white);
        break;
    }
  }, [data.color]);

  return (
    <>
      <div>
        <Link
          to={`/b/${data.workspaceId}/${data.id}/${data.name}`}
          style={{
            textDecoration: "none",
            height: "100%",
            width: "100%",
            backgroundColor: "Black",
          }}
        >
          <div className={`${classes.boardcard} ${bgc}`}>{data.name}</div>
        </Link>
      </div>
    </>
  );
}

export default BoardCard;
