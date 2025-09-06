import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router';

import { useTranslation } from 'react-i18next';

import logo from '../../assets/InfoMed.png'

import styles from './Login.module.css'

import ButtonGroup from '../../components/Button/ButtonGroup';
import Button from '../../components/Button/Button';
import Divider from '../../components/Divider/Divider';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {

  const { t } = useTranslation();

  const { login, loginWithAccessCode} = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [accessCode, setAccessCode] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    let res = null;

    if (accessCode.length > 0) {
      const code = {
        accessCode
      }
      res = await loginWithAccessCode(code);
    } else {
      const user = {
        email,
        password
      }
      res = await login(user);
    }

    if (res && res.status) {
      setError(res.description);
    }
  }

  const handleSetAccessCode = (e) => {
    if (accessCode.length < 6) {
      setAccessCode(e.target.value.toLocaleUpperCase())
    }
  }

  return (
    <div className={styles.container_login}>
      <div className={styles.img}>
        <img src={logo} alt="Image Logo" />
      </div>
      <h2 className='title_text_color'>{t('page-login.text-login')}</h2>
      <form className={styles.login} onSubmit={handleLogin}>
        <input type="text" name="email" id="email" placeholder={t("page-login.placeholder-email")} value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" name="password" id="" placeholder={t("page-login.placeholder-password")} value={password} onChange={(e) => setPassword(e.target.value)} />
        <Divider />
        <h3 className='title_text_color'>{t('page-login.text-access-code')}</h3>
        <input type="text" name="accessCode" id="accessCode" placeholder={t("page-login.placeholder-access-code")} value={accessCode} onChange={handleSetAccessCode} />

        {error && <p className={styles.error}>{error}</p>}
        <ButtonGroup>
          <Button type="submit" value={t('page-login.value-button-confirm-login')} variant="button_confirm" />
          <Button type="button" value={t('page-login.value-button-register')} variant="button_cancel" onClick={() => navigate("/register")} />
        </ButtonGroup>

      </form>
    </div>
  )
}

export default Login