import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import './App.css';
import ForgotPage from './pages/ForgotPage';
import ResetPage from './pages/ResetPage';
import ProfilePage from './pages/Profile';

const App = () => {
  return (
    <div className='App'>
      <Routes>
        {/* Use element prop instead of component, and wrap Route components inside Routes */}
        <Route path='/' element={<HomePage />} />
        <Route path="/forgotPassword" element={<ForgotPage/>} />
        <Route path='/ResetPassword' element={<ResetPage/>} ></Route>
        <Route path='/chats' element={<ChatPage />} />
        <Route path='/profile' element={<ProfilePage/>} />
      </Routes>
    </div>
  );
};

export default App;