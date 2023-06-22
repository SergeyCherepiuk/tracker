import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import Panel from './components/Panel';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Home/> }/>
        <Route path='/details/:id?' element={ <Details/> }/>
      </Routes>
    </div>
  );
}

export default App;
