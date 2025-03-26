import { useContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { AuthContext } from './context/AuthContext';

import './App.css'

import Login from './pages/Login/Login'
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';

function App() {

  const {user, loading , error, login, logout, register} = useContext(AuthContext);
 
  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={user ?  <Home logout={logout}/> : <Navigate to="/login"/>}/>
      <Route path='/login' element={!user ?  <Login login={login}/> : <Navigate to="/"/>}/>
      <Route path='/register' element={!user ?  <Register register={register} loading={loading} serverError={error}/> : <Navigate to="/"/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
