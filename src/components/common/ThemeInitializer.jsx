import { useEffect } from "react";

function applyTheme(theme) {
  const root = document.documentElement;

  root.classList.remove("light", "dark");
  root.classList.add(theme);
  root.setAttribute("data-theme", theme);
}

function ThemeInitializer() {
  useEffect(() => {
    const savedTheme =
      localStorage.getItem("snapdl-theme") ||
      localStorage.getItem("linkflow-theme") ||
      "dark";

    applyTheme(savedTheme);
  }, []);

  return null;
}

export default ThemeInitializer;