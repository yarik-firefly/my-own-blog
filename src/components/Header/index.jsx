import React from "react";
import Button from "@mui/material/Button";

import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuth } from "../../redux/slices/authLogin";

export const Header = () => {
  const isAuth = useSelector(selectIsAuth);
  const { statusGetMe } = useSelector((state) => state.authLogin);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onClickLogout = async () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      window.localStorage.removeItem("token");
      navigate("/");
      dispatch(logout());
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div> TOPORKOV BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                {statusGetMe !== "loading" ? (
                  <>
                    <Link to="/login">
                      <Button variant="outlined">Войти</Button>
                    </Link>
                    <Link to="/register">
                      <Button variant="contained">Создать аккаунт</Button>
                    </Link>
                  </>
                ) : (
                  "Загрузка..."
                )}
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
