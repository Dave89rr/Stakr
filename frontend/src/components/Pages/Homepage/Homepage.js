import classes from "./Homepage.module.css";

function HomePage() {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.gradient}>
        <div className={classes.topContainer}>
          <h1 className={classes.header}>
            Stakr helps teams move work forward.
          </h1>
          <p className={classes.subHeaderText}>
            Collaborate, manage projects, and reach new productivity peaks. From
            high rises to the home office, the way your team works is
            unique—accomplish it all with Stakr.
          </p>
        </div>
        <div className={classes.line}></div>
      </div>
    </div>
  );
}

export default HomePage;
