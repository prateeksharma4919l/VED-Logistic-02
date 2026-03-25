"use client";

import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

type ThemeMode = "light" | "dark";

const STORAGE_KEY = "ved_theme_mode";

function applyTheme(mode: ThemeMode) {
  if (typeof document === "undefined") {
    return;
  }

  document.body.classList.remove("theme-light", "theme-dark");
  document.body.classList.add(mode === "dark" ? "theme-dark" : "theme-light");
  document.documentElement.dataset.theme = mode;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const nextTheme: ThemeMode = stored === "dark" ? "dark" : "light";
    applyTheme(nextTheme);
    setTheme(nextTheme);
    setMounted(true);
  }, []);

  function toggleTheme() {
    const nextTheme: ThemeMode = theme === "light" ? "dark" : "light";
    applyTheme(nextTheme);
    setTheme(nextTheme);
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
  }

  const currentTheme = mounted ? theme : "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle-dock"
      aria-label={`Switch to ${currentTheme === "light" ? "dark" : "light"} theme`}
    >
      <span className="theme-toggle-icon">
        {currentTheme === "light" ? <FaSun /> : <FaMoon />}
      </span>
      <span className="theme-toggle-copy">
        <span className="theme-toggle-label">Theme</span>
        <strong className="theme-toggle-value">
          {currentTheme === "light" ? "Light" : "Dark"}
        </strong>
      </span>
      <span className={`theme-toggle-pill ${currentTheme === "dark" ? "is-active" : ""}`}>
        <span className="theme-toggle-knob" />
      </span>
    </button>
  );
}
