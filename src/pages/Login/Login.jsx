import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { Bounce, ToastContainer, toast } from 'react-toastify';

import logo from '../../assets/react.svg'

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

    if (res.status) {
      toast(res.description);
    }
  }

  return (
    <div className={styles.container_login}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
        transition={Bounce}
      />
      <div className="img">
        <img src={logo} alt="Image Logo" />
      </div>
      <h2>Login</h2>
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