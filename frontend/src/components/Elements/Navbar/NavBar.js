import classes from './NavBar.module.css';
import Logo from '../Logo';
import LogoutButton from '../LogoutButton';
import Menu from '../Menu';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { login } from '../../../store/session';

function NavBar({ user }) {
  const dispatch = useDispatch();

  const handleDemoLogin = async () => {
    await dispatch(login('demo@aa.io', 'password'));
  }

  return (
    <nav>
      <div className={classes.leftContainer}>
        <Logo user={user} />
        {user?<Menu />:null}
      </div>
      <div className={classes.userInteractionsContainer}>
        {user ? (
          <LogoutButton />
        ) : (
          <>
            <div
              onClick={handleDemoLogin}
              className={classes.demoLoginBtn}
            >
              Demo
            </div>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
