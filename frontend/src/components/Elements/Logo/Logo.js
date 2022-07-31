import { useState } from 'react';
import { Link } from 'react-router-dom';
import AboutMenu from '../AboutMenu/AboutMenu';
import classes from './Logo.module.css';

import { useClickOutside } from '../Navbar/NavBar';

function Logo() {
  const [toggleAbout, setToggleAbout] = useState(false);

  const aboutRef = useClickOutside(() => {
    setToggleAbout(false);
  });

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
      <div
        className={classes.about}
        onClick={() => setToggleAbout(!toggleAbout)}
      >
        {about}
      </div>
      {toggleAbout ? <AboutMenu setToggleAbout={setToggleAbout} innerRef={aboutRef} /> : null}
      <Link to="/">{logo}</Link>
    </div>
  );
}

export default Logo;
