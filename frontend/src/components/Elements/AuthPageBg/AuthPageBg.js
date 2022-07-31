import classes from './AuthPageBg.module.css';
function AuthPageBg() {
  return (
    <div className={classes.imgContainer}>
      <div className={classes.right}>
        <img
          className={classes.imgBottom}
          src="/static/icons/left-bg-login.svg"
        />
      </div>
      <div className={classes.right}>
        <img
          className={classes.imgBottomRight}
          src="/static/icons/right-bg-login.svg"
        />
      </div>
    </div>
  );
}

export default AuthPageBg;
