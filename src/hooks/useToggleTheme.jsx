
import { useEffect } from "react";
import { useState } from "react";

const useToggleTheme = () => {
	const [theme, setTheme] = useState("light");

	const toggleTheme = () => {
		theme === "light" ? setTheme("dark") : setTheme("light");
	};

	useEffect(() => {
		document.querySelector("html").setAttribute("data-theme", theme);
	}, [theme]);

	return toggleTheme;
};

export default useToggleTheme;
