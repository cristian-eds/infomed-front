import React, { useState } from 'react'

import logo from '../../assets/react.svg'

import styles from './Login.module.css'

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
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

            <div className={styles.login__buttons}>
              <input type="submit" value="Entrar" />
              <input type="button" value="Cadastrar" />
            </div>
            
        </form>
    </div>
  )
}

export default Login