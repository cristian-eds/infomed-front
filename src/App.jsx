import { useContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { AuthContext } from './context/AuthContext';

import './App.css'
import './styles/theme.css'

import Login from './pages/Login/Login'
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import Medicines from './pages/Medicines/Medicines';
import Navbar from './components/Navbar/Navbar';
import Profile from './pages/Profile/Profile';
import Person from './pages/Person/Person';
import PersonDetails from './pages/Person/PersonDetails';
import NavbarPhone from './components/Navbar/NavbarPhone';
import NotFound from './pages/NotFound/NotFound';

function App() {

  const {user, loading , role, error, login, logout, register} = useContext(AuthContext);
 
  return (
  <BrowserRouter>
    {user && <Navbar logout={logout} role={role} />}
    {user && <NavbarPhone /> }
    <Routes>
      <Route path='/' element={user ?  <Home/> : <Navigate to="/login"/>}/>
      <Route path='/login' element={!user ?  <Login login={login}/> : <Navigate to="/"/>}/>
      <Route path='/register' element={!user ?  <Register register={register} loading={loading} serverError={error}/> : <Navigate to="/"/>}/>
      <Route path='/medicines' element={!user ? <Login login={login}/> : <Medicines/> }/>
      <Route path='/profile' element={!user ? <Login login={login}/> : <Profile userContext={user}/> }/>
      <Route path='/person' element={!user ? <Login login={login} /> : role === "ADMIN" ? <Person /> : <Home/>} />
      <Route path='/person/:id' element={!user ? <Login login={login} /> : role === "ADMIN" ? <PersonDetails />: <Home/>} />
      <Route path='*' element={!user ?  <Login login={login}/> : <NotFound />}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
