import classes from './WorkspaceButton.module.css';
function WorkspaceButton({ name, plural }) {
  return (
    <div className={classes.btnContainer}>
      <img
        className={classes.icon}
        src={`/media/icons/${name}.svg`}
        alt={`${name} button`}
      />
      <span>{`${name}${plural}`}</span>
    </div>
  );
}

export default WorkspaceButton;
