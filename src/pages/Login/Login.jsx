import React, { useState } from 'react'
import { useNavigate } from 'react-router';

import logo from '../../assets/InfoMed.png'

import styles from './Login.module.css'

import ButtonGroup from '../../components/Button/ButtonGroup';
import Button from '../../components/Button/Button';

const Login = ({ login }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const user = {
      email,
      password
    }

    const res = await login(user);

    if (res && res.status) {
      setError(res.description);
    }
  }

  return (
    <div className={styles.container_login}>
      <div className={styles.img}>
        <img src={logo} alt="Image Logo" />
      </div>
      <h2 className='title_text_color'>Login</h2>
      <form className={styles.login} onSubmit={handleLogin}>
        <input type="text" name="email" id="email" placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" name="password" id="" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className={styles.error}>{error}</p>}

        <ButtonGroup>
          <Button type="submit" value="Entrar" variant="button_confirm" />
          <Button type="button" value="Registrar" variant="button_cancel" onClick={() => navigate("/register")} />
        </ButtonGroup>


      </form>
    </div>
  )
}

export default Login