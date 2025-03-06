import React, { useState } from 'react'
import { useNavigate } from 'react-router';

import logo from '../../assets/react.svg'

import styles from './Login.module.css'

import ButtonGroup from '../../components/Button/ButtonGroup';

const Login = ({login}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError(null);
    const user = {
      email,
      password
    }
    login(user);
  }

  return (
    <div className={styles.container_login}>
        <div className="img">
            <img src={logo} alt="Image Logo" />
        </div>
        <h2>Login</h2>
        <form className={styles.login} onSubmit={handleLogin}>
            <input type="text" name="email" id="email" placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" name="password" id="" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            {error && <p className={styles.error}>{error}</p>  }
            
            <ButtonGroup>
              <input type="submit" value="Enter" />
              <input type="button" value="Register" onClick={() => navigate("/register")}/>
            </ButtonGroup>
            
            
        </form>
    </div>
  )
}

export default Login