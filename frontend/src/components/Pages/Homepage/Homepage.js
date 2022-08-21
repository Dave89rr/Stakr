import classes from './Homepage.module.css';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import Footer from '../../Elements/Footer'

function HomePage() {
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const [email, setEmail] = useState('');
  const homePageSignUp = (e) => {
    e.preventDefault();
    localStorage.setItem('email', email);
    history.push('/signup');
  };
  return (
    <div className={classes.mainContainer}>
      <section className={classes.splashContentWrap}>
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
            <form onSubmit={homePageSignUp}>
              <input
                className={classes.input}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ></input>
              <button type="submit" className={classes.button}>
                Sign up - it's free
              </button>
            </form>
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
        <div className={classes.sectionContainer}>
          <div>
            <img
              className={classes.bottomImgs}
              src="/static/icons/compass.svg"
            ></img>
          </div>
          <div className={classes.bottomContainer}>
            <p className={classes.subHeader}>Discover Stakr</p>{' '}
            <p className={classes.subText}>
              The productivity tool teams love, paired with the features and
              security needed for scale.
            </p>
            <div
              className={classes.button}
              onClick={(e) => {
                history.push('/signup');
              }}
            >
              Sign up
            </div>
          </div>
        </div>
        <div className={classes.sectionContainer}>
          <div>
            <img
              className={classes.bottomImgs}
              src="/static/icons/solutions.svg"
            ></img>
          </div>
          <div className={classes.bottomContainer}>
            <p className={classes.subHeader}>What is Stakr?</p>{' '}
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
        </div>
        <div className={classes.sectionContainer}>
          <div>
            <img
              className={classes.bottomImgs}
              src="/static/icons/solutions.svg"
            ></img>
          </div>
          <div className={classes.bottomContainer}>
            <p className={classes.subHeader}>Inspiration</p>{' '}
            <p className={classes.subText}>
              Our inspiration for this project comes from Trello. Go checkout
              their products and see why we love it so much we made a clone!
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
      </section>
      <Footer user={user}/>
    </div>
  );
}

export default HomePage;
