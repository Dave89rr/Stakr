import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import NavBar from './components/Elements/Navbar/NavBar';
import BoardPage from './components/Pages/BoardPage';
import CardPage from './components/Pages/CardPage';
import HomePage from './components/Pages/Homepage';
import LoginPage from './components/Pages/LoginPage';
import SignUpPage from './components/Pages/SignUpPage';
import UserHomepage from './components/Pages/UserHomepage';
import Workspace from './components/Pages/Workspace/Workspace';
import ProtectedRoute from './components/utils/ProtectedRoute';

import { authenticate } from './store/session';
import { thunkGetAllWorkspaces } from './store/workspaces';

function App() {
  const user = useSelector((state) => state.session.user);

  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (!user) await dispatch(authenticate());
      if (loaded && user) {
        await dispatch(thunkGetAllWorkspaces(user.id));
      }
      setLoaded(true);
    })();
  }, [dispatch, loaded, user]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar user={user} />
      <Switch>
        <Route exact path="/">
          {user ? <Redirect to={`/${user.username}/boards`} /> : <HomePage />}
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/signup">
          <SignUpPage />
        </Route>
        <ProtectedRoute exact path="/:username/boards">
          <UserHomepage />
        </ProtectedRoute>
        <ProtectedRoute exact path="/:workspace/home">
          <Workspace />
        </ProtectedRoute>
        <ProtectedRoute exact path="/b/:workspaceId/:boardId/:boardname">
          <BoardPage />
        </ProtectedRoute>
        <ProtectedRoute exact path="/c/:cardId/:cardname">
          <CardPage />
        </ProtectedRoute>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
