import React from 'react';
import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom'
import { ApplicationView } from './components/applicationviews';
import { NavBar } from './components/nav/Nav';
import { FirebaseProvider } from './components/fbAuth/FirebaseProvider';

function App() {

  return (
    <div className="App">
      <Router>
        <FirebaseProvider>
          <NavBar />
          <ApplicationView />
        </FirebaseProvider>
      </Router>

    </div>
  );
}

export default App;
