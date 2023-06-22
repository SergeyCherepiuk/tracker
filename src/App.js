import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import jwtDecode from 'jwt-decode'
import { useState, useEffect } from 'react';
import { fetchUserById } from './hooks/fetchUser';

function App() {
  const token = localStorage.getItem("token")
  const [user, setUser] = useState({})

  useEffect(() => {
    if (token) {
      const id = jwtDecode(token)._id
      fetchUserById(id).then(response => {
        if (response.isOk) {
          setUser(response.data)
          console.log(response)
        } else {
          setUser(null)
        }
      })
    } else {
      setUser(null)
    }
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={ token ? <Navigate to="/" replace /> : <SignUp/> }/>
        <Route path="/login" element={ token ? <Navigate to="/" replace /> : <LogIn/> }/>
        <Route path='/' element={ token ? <Home user={user}/> : <Navigate to="/login" replace /> }/>
        <Route path='/details/:id?' element={ token ? <Details user={user} /> : <Navigate to="/login" replace /> }/>
      </Routes>
    </div>
  );
}

export default App;
