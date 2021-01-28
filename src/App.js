import './App.scss';
import { NavBar } from './components/NavBar/NavBar';
import { ApplicationView } from './components/applicationviews';

function App() {
  return (
    <div className="App">
      <NavBar />
      <ApplicationView />
    </div>
  );
}

export default App;
