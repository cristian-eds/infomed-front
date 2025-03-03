import { useState } from 'react'
import './App.css'
import Login from './pages/Login/Login'

function App() {

  const [isLogged, setIsLogged] = useState(true);

  return (
    <>
      {isLogged ? <Login></Login> : <Register></Register>}
    </>
  )
}

export default App
