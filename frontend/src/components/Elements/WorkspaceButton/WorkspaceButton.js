import classes from './WorkspaceButton.module.css';
function WorkspaceButton(props) {
  return (
    <div className={classes.btnContainer}>
      <img src={`/media/icon/${props.name}.svg`} alt={`${props.name} button`} />
      <span>{`${props.name}s`}</span>
    </div>
  );
}

export default WorkspaceButton;
