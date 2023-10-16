import React from "react";
import { useState } from "react";

const ToggleSwitch = ({ onClick = () => {} }) => {
	const [isActive, setIsActive] = useState(false);

	function onClickHandler() {
		setIsActive(!isActive);
		onClick();
	}

	return (
		<div
			onClick={onClickHandler}
			className={`toggle-switch ${isActive ? "active" : ""}`}
		>
			<div className="toggle-switch__thumb"></div>
		</div>
	);
};

export default ToggleSwitch;
