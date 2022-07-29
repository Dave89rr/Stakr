import classes from "./Homepage.module.css";
import { useHistory } from "react-router-dom";

function HomePage() {
  const history = useHistory();
  return (
    <div className={classes.mainContainer}>
      <div className={classes.gradient}>
        <div className={classes.topContainer}>
          <div className={classes.textContainer}>
            <h1 className={classes.header}>
              Stakr helps teams move work forward.
            </h1>
            <p className={classes.subHeaderText}>
              Collaborate, manage projects, and reach new productivity peaks.
              From high rises to the home office, the way your team works is
              unique—accomplish it all with Stakr.
            </p>
            <div>
              <input className={classes.input} placeholder="Email"></input>
              <button className={classes.button}>Sign up - it's free</button>
            </div>
          </div>
          <div>
            <img
              className={classes.img}
              src="https://images.ctfassets.net/rz1oowkt5gyp/5QIzYxue6b7raOnVFtMyQs/113acb8633ee8f0c9cb305d3a228823c/hero.png?w=1200&fm=webp"
            />
          </div>
        </div>
        <div className={classes.line}></div>
        <div className={classes.bottom}>
          <div className={classes.bottomContainer}>
            <p className={classes.subHeader}>Discover Stakr</p>{" "}
            <p className={classes.subText}>
              The productivity tool teams love, paired with the features and
              security needed for scale.
            </p>
            <div
              className={classes.button}
              onClick={(e) => {
                history.push("/signup");
              }}
            >
              Sign up
            </div>
          </div>
          <div className={classes.bottomContainer}>
            <p className={classes.subHeader}>What is Stakr?</p>{" "}
            <p className={classes.subText}>
              Stakr is the visual tool that empowers your team to manage any
              type of project, workflow, or task tracking.
            </p>
            <a
              href="https://github.com/Dave89rr/Stakr"
              target="_blank"
              rel="noreferrer"
              className={classes.button}
            >
              Learn More
            </a>
          </div>
          <div className={classes.bottomContainer}>
            <p className={classes.subHeader}>Inspiration</p>{" "}
            <p className={classes.subText}>
              Our inspiration for this project comes from Trello. Go checkout
              there products and see why we love it so much we made a clone!
            </p>
            <a
              href="https://trello.com/"
              target="_blank"
              rel="noreferrer"
              className={classes.button}
            >
              To Trello
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
