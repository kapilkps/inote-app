
import './App.css';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { About } from './components/About';
import Login from './components/Login';
import  Signup from './components/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react';
import NoteState from './context/notes/NoteState';

function App() {
  return (
    <>
    <NoteState>

      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/about' element={<About></About>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/signup' element={<Signup></Signup>}></Route>
        </Routes>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
