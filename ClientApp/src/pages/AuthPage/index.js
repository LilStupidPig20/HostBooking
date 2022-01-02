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
      <div className={styles.authSide}>
        <div className={styles.authCard}>
          <h2>Авторизация</h2>
          {/* <label htmlFor="email">Логин</label> */}

          <input
            className={styles.data}
            placeholder="Введите Логин"
            name="login"
            type="email"
            autoComplete="off"
            onChange={changeHandler}
          />
          {/* <label htmlFor="password">Пароль</label> */}

          <input
            className={styles.data}
            placeholder="Введите пароль"
            name="password"
            type="password"
            onChange={changeHandler}
          />
          <button className={styles.enterButton}disabled={loading} onClick={loginHandler}>
            Войти
          </button>
        </div>
      </div>
      <div className={styles.infoCard}></div>
    </div>
  );
};
