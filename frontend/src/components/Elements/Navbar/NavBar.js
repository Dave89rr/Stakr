import classes from './NavBar.module.css';
import Logo from '../Logo';
import LogoutButton from '../LogoutButton';
import Menu from '../Menu';
import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { login } from '../../../store/session';

let useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let checkHandler = (e) => {
      if (!domNode.current.contains(e.target)) {
        handler();
      }
    }

    document.addEventListener("mousedown", checkHandler);

    return () => {
      document.removeEventListener("mousedown", checkHandler);
    }
  });
  return domNode;
}

function NavBar({ user }) {
  const dispatch = useDispatch();
  const [wsView, setWsView] = useState(false);

  const handleDemoLogin = async () => {
    await dispatch(login('demo@aa.io', 'password'));
  }

  let ref = useClickOutside(() => {
    setWsView(false);
  });

  return (
    <nav>
      <div className={classes.leftContainer}>
        <Logo user={user} />
        {user?<Menu innerRef={ref} wsView={wsView} setWsView={setWsView}/>:null}
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
