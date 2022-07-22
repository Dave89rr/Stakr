import classes from './WorkspaceButton.module.css';
function WorkspaceButton({ name }) {
  // console.log('this is the props');
  // console.log(name);
  return (
    <div className={classes.btnContainer}>
      <img
        className={classes.icon}
        src={`/media/icons/${name}.svg`}
        alt={`${name} button`}
      />
      <span>{`${name}`}</span>
    </div>
  );
}

export default WorkspaceButton;
