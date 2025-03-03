import React from 'react'

import logo from '../../assets/react.svg'

import styles from './Login.module.css'

const Login = () => {

  return (
    <div className={styles.container_login}>
        <div className="img">
            <img src={logo} alt="Image Logo" />
        </div>
        <h2>Login</h2>
        <form className=''>
            <input type="text" name="email" id="email" placeholder='E-mail'/>
            <input type="password" name="password" id="" placeholder='Password'/>
        </form>
    </div>
  )
}

export default Login