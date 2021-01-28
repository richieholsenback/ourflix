

import './App.scss';
import { ApplicationView } from './components/applicationviews';
import { NavBar } from './components/nav/Nav';

function App() {
  return (
    <div className="App">
      <NavBar />
      <ApplicationView />
    </div>
  );
}

export default App;
