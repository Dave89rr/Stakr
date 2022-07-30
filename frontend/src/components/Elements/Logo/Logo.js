import { useState } from 'react';
import { Link } from 'react-router-dom';
import AboutMenu from '../AboutMenu/AboutMenu';
import classes from './Logo.module.css';
function Logo() {
  const [toggleAbout, setToggleAbout] = useState(false);
  const logo = (
    <img
      className={classes.icon}
      src="/static/icons/stakr-logo-white.svg"
      alt="stakr logo"
    />
  );
  const about = (
    <img
      className={classes.grid}
      src="/static/icons/abouticon.svg"
      alt="about icon"
    />
  );
  return (
    <div className={classes.container}>
      <div onClick={() => setToggleAbout(!toggleAbout)}>
        <Link to="/">{about}</Link>
      </div>
      {toggleAbout ? <AboutMenu setToggleAbout={setToggleAbout} /> : null}
      <Link to="/">{logo}</Link>
    </div>
  );
}

export default Logo;
