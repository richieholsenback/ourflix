

import { Redirect, Route } from 'react-router-dom';
import './App.scss';
import { ApplicationView } from './components/applicationviews';
import { Login } from './components/login/LogIn';
import { Register } from './components/login/Register';
import { NavBar } from './components/nav/Nav';

function App() {
  return (
    <>
    <Route
      render={() => {
        if (sessionStorage.getItem("active_user")) {
          return (
            <>
              <NavBar />
              <ApplicationView />
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </>
  );
}

export default App;
