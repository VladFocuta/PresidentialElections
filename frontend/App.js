import React from 'react';
import Login from "./User/Login";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './User/Signup';
import StartPage from './StartPage';
import PartElections from './Candidate/PartElections';
import CandidateProfile from './Candidate/CandidateProfile';
import Logout from './Components/Logout';
import Home from './User/Home';
import UpdateEmail from './User/UpdateEmail';
import UpdatePassword from './User/UpdatePassword';
import VotingPage from './Candidate/VotingPage';

function App() {
  return (
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<StartPage />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<Home />} />
          <Route path='/UpdatePassword' element={<UpdatePassword />} />
          <Route path='/UpdateEmail' element={<UpdateEmail />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/PartElections' element={<PartElections />} />
          <Route path='/candidate/:id' element={<CandidateProfile />} />
          <Route path='/VotingPage' element={<VotingPage />} />
          <Route path='/Logout' element={<Logout />} />
        </Routes>
      </BrowserRouter>
  );
}
export default App;
