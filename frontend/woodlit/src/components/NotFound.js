import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={styles.container}>
      <h1 style={styles.code}>404</h1>
      <h2 style={styles.text}>Страница не найдена</h2>
      <p style={styles.desc}>
        Возможно, вы перешли по неверной ссылке или у вас нет доступа к этой странице.
      </p>
      <Link to="/" style={styles.link}>Вернуться на главную</Link>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    margin: "10vh",
    fontFamily: "Arial, sans-serif",
  },
  code: {
    fontSize: "6rem",
    color: "#d9534f",
  },
  text: {
    fontSize: "2rem",
    margin: "1rem 0",
  },
  desc: {
    fontSize: "1rem",
    color: "#666",
  },
  link: {
    marginTop: "2rem",
    display: "inline-block",
    padding: "0.8rem 1.2rem",
    backgroundColor: "#41aa57ff",
    color: "white",
    borderRadius: "8px",
    textDecoration: "none",
  },
};
