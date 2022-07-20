import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './components/Pages/Homepage';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <HomePage />;
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </>
  );
}

export default App;
