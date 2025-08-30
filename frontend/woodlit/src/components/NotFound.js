import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div style={styles.container}>
      <h1 style={styles.code}>404</h1>
      <h2 style={styles.text}>{t('notFound.title')}</h2>
      <p style={styles.desc}>
        {t('notFound.desc')}
      </p>
      <Link to="/" style={styles.link}>{t('notFound.backHome')}</Link>
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
