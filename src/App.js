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
  const userId = token ? jwtDecode(token)._id : null

  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={ userId ? <Navigate to="/" replace /> : <SignUp/> }/>
        <Route path="/login" element={ userId ? <Navigate to="/" replace /> : <LogIn/> }/>
        <Route path='/' element={ userId ? <Home userId={userId}/> : <Navigate to="/login" replace /> }/>
        <Route path='/details/:id?' element={ userId ? <Details userId={userId} /> : <Navigate to="/login" replace /> }/>
      </Routes>
    </div>
  );
}

export default App;
