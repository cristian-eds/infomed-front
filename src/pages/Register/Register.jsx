import React, { useState } from 'react'

import logo from '../../assets/react.svg'

import styles from '../Login/Login.module.css'
import { useNavigate } from 'react-router';

const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        setError(null);

        if(password !== confirmPassword) {
            setError("Passwords don't match.")
        }

    }

    return (
        <div className={styles.container_login}>
            <div className="img">
                <img src={logo} alt="Image Logo" />
            </div>
            <h2>Register</h2>
            <form className={styles.login} onSubmit={handleRegister}>
                <input type="text" name="email" id="email" placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name="password" id="" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="password" name="confirmPassword" id="" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                {error && <p className={styles.error}>{error}</p>  }
                <div className={styles.login__buttons}>
                    <input type="submit" value="Register" />
                    <input type="button" value="Login" onClick={() => navigate("/login")}/>
                </div>

            </form>
        </div>
    )
}

export default Register