import { Route, Switch, Redirect } from 'react-router-dom';
import BoardPage from './components/Pages/BoardPage';
import CardPage from './components/Pages/CardPage';
import HomePage from './components/Pages/Homepage';
import LoginPage from './components/Pages/LoginPage';
import SignUpPage from './components/Pages/SignUpPage';
import UserHomepage from './components/Pages/UserHomepage';
import Workspace from './components/Pages/Workspace/Workspace';

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
