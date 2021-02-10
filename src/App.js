import React from 'react';
import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom'
import { ApplicationView } from './components/applicationviews';
import { FirebaseProvider } from './components/fbAuth/FirebaseProvider';

function App() {

  return (
    <div className="App">
      <Router>
        <FirebaseProvider>
          <ApplicationView />
        </FirebaseProvider>
      </Router>
    </div>
  );
}

export default App;
