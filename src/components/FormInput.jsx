import React from "react";

const FormInput = ({ label, name, errors, register, ...inputProps }) => {

	return (
		<div className="form-group">
			{label && (
				<label className="form-group__label">
					{label}
				</label>
			)}
			<input
				{...(register && register(name.toLowerCase(), { required: true }))}
				// aria-invalid={errors[label.toLowerCase()] ? "true" : "false"}
				{...inputProps}
				type="text"
			/>
		</div>
	);
};

export default FormInput;
