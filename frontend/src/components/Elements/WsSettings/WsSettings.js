import classes from './WsSettings.module.css';
import { useDispatch } from 'react-redux';
import { thunkDeleteWorkspace } from '../../../store/workspaces';

const WsSettings = ({ id }) => {
  const dispatch = useDispatch();
  const handleDelete = (wsId) => {
    dispatch(thunkDeleteWorkspace(wsId));
  };
  return (
    <div className={classes.settingsMenuContainer}>
      <div>
        <span>Options</span>
      </div>
      <div>
        <span>Edit</span>
      </div>
      <div className={classes.deleteBtn} onClick={() => handleDelete(id)}>
        <span>Delete</span>
      </div>
    </div>
  );
};

export default WsSettings;
