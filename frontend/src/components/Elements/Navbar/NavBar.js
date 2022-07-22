import classes from './NavBar.module.css';
import Logo from '../Logo';
import LogoutButton from '../LogoutButton';
import Menu from '../Menu';

function NavBar({ user }) {
  return (
    <nav>
      <div className={classes.leftContainer}>
        <Logo user={user} />
        <Menu />
      </div>
      <div className={classes.userInteractionsContainer}>
        {user ? <LogoutButton /> : null}
      </div>
    </nav>
  );
}

export default NavBar;
