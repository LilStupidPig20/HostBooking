import React, { useContext, useState } from "react";
import { Logo } from "../../components/Logo";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
import styles from "./auth.module.css";

export const AuthPage = () => {
  const auth = useContext(AuthContext);

  const [fail, setFail] = useState(false);

  const { loading, error, clearError, request } = useHttp();
  const [form, setForm] = useState({
    login: "",
    password: "",
  });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/Auth/Login", "POST", { ...form });
        auth.login(data.token, data.userId, data.fullName);
    } catch (error) {
      setFail(true);
    }
  };

  let failText = fail ? styles.errorMsgFail : styles.errorMsg;
  let failLogin = fail ? styles.loginInputFail : styles.loginInput;
  let failPassword = fail ? styles.passwordInputFail : styles.passwordInput

  return (
    <div className={styles.mainBlock}>
      <div className={styles.topBlock}>
        <span className={styles.textBlock}>Сервис бронирования коворкинга</span>
        <div className={styles.logo}><Logo /></div>
      </div>
        <div className={styles.authCard}>
          <h2 className={styles.authPageTitle}>Войдите в свой аккаунт</h2>
          {/* <label htmlFor="email">Логин</label> */}
          <div className={styles.box}>
            <div className={styles.loginPic}></div>
            <input
              className={failLogin}
              placeholder="Логин"
              name="login"
              type="email"
              autoComplete="off"
              onChange={changeHandler}
            />
          </div>
          {/* <label htmlFor="password">Пароль</label> */}
          <div className={styles.box}>
            <div className={styles.passPic}></div>
            <input
              className={failPassword}
              placeholder="Пароль"
              name="password"
              type="password"
              onChange={changeHandler}
            />
          </div>
          
          <button className={styles.enterButton}disabled={loading} onClick={loginHandler}>
            Войти
          </button>
          <div className={failText}>
            Неверный логин и пароль. Повторите попытку.
          </div>
      </div>
    </div>
  );
};
