import React from 'react'
import Navbar from './components/Navbar'
import { Routes,Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from './store/useThemeStore';

function App() {
  const {authUser,checkauth,isCheckingAuth} = useAuthStore();
  const{theme} = useThemeStore();

  useEffect(()=>{
    checkauth();
  },[checkauth])

  console.log("Auth User:", authUser);

  if(isCheckingAuth && !authUser) {
    return(
      <div className='flex justify-center items-center h-screen'>
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }
  
  return (
    
    <div data-theme = {theme} >
     <Navbar/>

     <Routes>
      <Route path="/" element={authUser? <HomePage/> : <Navigate to="/login"/>} />
      <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/"/>} />
      <Route path="/signup" element={!authUser ?  <SignUpPage/>: <Navigate to="/"/>} />
      <Route path="/profile" element={authUser? <ProfilePage/>: <Navigate to="/login"/>} />
      <Route path="/settings" element={authUser? <SettingsPage/>: <Navigate to="/login"/>} />
     </Routes>

     <Toaster/>
    </div>
  )
} 

export default App
