import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme, setTheme } from "../features/theme/themeSlice";

const useToggleTheme = () => {
	const { theme } = useSelector(selectTheme);
	const dispatch = useDispatch();
	console.log(theme);

	const toggleTheme = () => {
		theme === "light"
			? dispatch(setTheme("dark"))
			: dispatch(setTheme("light"));
	};

	useEffect(() => {
		document.querySelector("html").setAttribute("data-theme", theme);
	}, [theme]);

	return toggleTheme;
};

export default useToggleTheme;
