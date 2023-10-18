import React from "react";
import { useState } from "react";

const ToggleSwitch = ({ onClick = () => {}, isActive = false }) => {
	return (
		<div
			onClick={onClick}
			className={`toggle-switch ${isActive ? "active" : ""}`}
		>
			<div className="toggle-switch__thumb"></div>
		</div>
	);
};

export default ToggleSwitch;
