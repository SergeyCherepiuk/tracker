import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';

function App() {
  const token = localStorage.getItem("token")
  
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={ token ? <Navigate to="/" replace /> : <SignUp/> }/>
        <Route path="/login" element={ token ? <Navigate to="/" replace /> : <LogIn/> }/>
        <Route path='/' element={ token ? <Home/> : <Navigate to="/login" replace /> }/>
        <Route path='/details/:id?' element={ <Details/> }/>
      </Routes>
    </div>
  );
}

export default App;
