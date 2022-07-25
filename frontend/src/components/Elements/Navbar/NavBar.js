import classes from './NavBar.module.css';
import Logo from '../Logo';
import LogoutButton from '../LogoutButton';
import Menu from '../Menu';
import { NavLink } from 'react-router-dom';

function NavBar({ user }) {
  return (
    <nav>
      <div className={classes.leftContainer}>
        <Logo user={user} />
        <Menu />
      </div>
      <div className={classes.userInteractionsContainer}>
        {user ? (
          <LogoutButton />
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
