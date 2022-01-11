import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
import styles from "./auth.module.css";

export const AuthPage = () => {
  const auth = useContext(AuthContext);

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
      const data = await request("/api/auth/login", "POST", { ...form });
        auth.login(data.token);
    } catch (error) {}
  };

  return (
    <div className={styles.mainBlock}>
        <div className={styles.authCard}>
          <h2 className={styles.authPageTitle}>Войдите в свой аккаунт</h2>
          {/* <label htmlFor="email">Логин</label> */}
          <div className={styles.box}>
            <div className={styles.loginPic}></div>
            <input
              className={styles.loginInput}
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
              className={styles.passwordInput}
              placeholder="Пароль"
              name="password"
              type="password"
              onChange={changeHandler}
            />
          </div>
          <button className={styles.enterButton}disabled={loading} onClick={loginHandler}>
            Войти
          </button>
      </div>
    </div>
  );
};
