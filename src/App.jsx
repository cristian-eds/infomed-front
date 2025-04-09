import { useContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { AuthContext } from './context/AuthContext';

import './App.css'

import Login from './pages/Login/Login'
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import Medicines from './pages/Medicines/Medicines';
import Navbar from './components/Navbar/Navbar';
import Profile from './pages/Profile/Profile';

function App() {

  const {user, loading , error, login, logout, register} = useContext(AuthContext);
 
  return (
  <BrowserRouter>
    <Navbar logout={logout} />
    <Routes>
      <Route path='/' element={user ?  <Home/> : <Navigate to="/login"/>}/>
      <Route path='/login' element={!user ?  <Login login={login}/> : <Navigate to="/"/>}/>
      <Route path='/register' element={!user ?  <Register register={register} loading={loading} serverError={error}/> : <Navigate to="/"/>}/>
      <Route path='/medicines' element={!user ? <Login login={login}/> : <Medicines/> }/>
      <Route path='/profile' element={!user ? <Login login={login}/> : <Profile userContext={user}/> }/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
