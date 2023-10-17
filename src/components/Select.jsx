const Select = ({
	options = [],
	defaultOption,
	label,
	name,
	register,
	errors,
	onChangeHandler = () => {},
}) => {
	return (
		<div className="form-group select">
			<label className="form-group__label">{label}</label>
			<select
				{...(register && register(name, { required: true }))}
				onChange={onChangeHandler}
			>
				{options.map((o) => {
					return (
						<option key={o} value={o} selected={o === defaultOption}>
							{o}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default Select;
