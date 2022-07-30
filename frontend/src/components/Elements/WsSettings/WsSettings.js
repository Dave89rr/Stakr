import classes from './WsSettings.module.css';
import { useDispatch } from 'react-redux';
import {
  thunkDeleteWorkspace,
} from '../../../store/workspaces';

const WsSettings = ({ id, setEditWsId, setEditWsMode, innerRef }) => {
  const dispatch = useDispatch();
  const handleDelete = (wsId) => {
    dispatch(thunkDeleteWorkspace(wsId));
  };

  const toggleEditView = (wsId) => {
    setEditWsId(wsId);
    setEditWsMode(true);
  };
  return (
    <div className={classes.settingsMenuContainer} ref={innerRef}>
      <span className={classes.title}>Options</span>
      <div className={classes.btn} onClick={() => toggleEditView(id)}>
        <span>Edit</span>
      </div>
      <div className={classes.btn} onClick={() => handleDelete(id)}>
        <span>Delete</span>
      </div>
    </div>
  );
};

export default WsSettings;
