import './App.scss';
import { NavBar } from './components/navbar/NavBar';
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
