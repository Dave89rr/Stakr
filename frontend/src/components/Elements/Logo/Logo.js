import { Link } from 'react-router-dom';
import classes from './Logo.module.css';
function Logo({ user }) {
  const logo = (
    <img
      className={classes.icon}
      src="/media/icons/stakr-logo-white.svg"
      alt="stakr logo"
    />
  );
  const about = (
    <img
      className={classes.grid}
      src="/media/icons/abouticon.svg"
      alt="about icon"
    />
  );
  return (
    <div className={classes.container}>
      <Link to="/">{about}</Link>
      <Link to="/">{logo}</Link>
    </div>
  );
}

export default Logo;
