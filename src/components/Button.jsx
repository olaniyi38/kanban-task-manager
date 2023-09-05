import React from "react";

const Button = ({ inverted, text, del, svgEl, ...otherProps }) => {
	return (
		<button
			className={`button ${inverted ? `button--inverted` : ""}${
				del ? "button--delete" : ""
			} `}
			{...otherProps}
		>
			{svgEl && <span className="icon">{svgEl}</span>}
			<span>{text}</span>
		</button>
	);
};

export default Button;
