import classes from './NavBar.module.css';
import Logo from '../Logo';
import LogoutButton from '../LogoutButton';

function NavBar({ user }) {
  return (
    <nav>
      <div className={classes.logoContainer}>
        <Logo user={user} />
      </div>
      <div className={classes.userInteractionsContainer}>
        {user ? <LogoutButton /> : null}
      </div>
    </nav>
  );
}

export default NavBar;
