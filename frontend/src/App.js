import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import BoardPage from './components/Pages/BoardPage';
import CardPage from './components/Pages/CardPage';
import HomePage from './components/Pages/Homepage';
import LoginPage from './components/Pages/LoginPage';
import SignUpPage from './components/Pages/SignUpPage';
import LogoutButton from './components/Elements/LogoutButton';
import UserHomepage from './components/Pages/UserHomepage';
import Workspace from './components/Pages/Workspace/Workspace';

import { authenticate } from './store/session';

function App() {
  const user = useSelector(state => state.session.user);

  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {user ? <LogoutButton /> : null}
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/signup">
          <SignUpPage />
        </Route>
        <Route exact path="/:username/boards">
          <UserHomepage />
        </Route>
        <Route exact path="/:workspace/home">
          <Workspace />
        </Route>
        <Route exact path="/b/:boardId/:boardname">
          <BoardPage />
        </Route>
        <Route exact path="/c/:cardId/:cardname">
          <CardPage />
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
