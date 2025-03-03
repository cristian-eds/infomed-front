import { useContext } from 'react'
import './App.css'
import Login from './pages/Login/Login'
import { AuthContext } from './context/AuthContext';
import Register from './pages/Register/Register';

function App() {

  const {user} = useContext(AuthContext);
 
  return (<>
    {user ? <Login></Login> : <Register></Register>}
  </>
  )
}

export default App
