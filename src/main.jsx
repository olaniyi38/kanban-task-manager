import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Providers from "./features/Providers.jsx";

import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import "./styles/main.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
	<Providers>
		<App />
	</Providers>
);
