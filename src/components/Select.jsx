

const Select = ({
	options = [],
	defaultOption,
	label,
	name,
	register,
	errors,
	onChangeHandler = () => {}
}) => {
	return (
		<div className="form-group select">
			<label className="form-group__label">{label}</label>
			<select { ...register && register(name, { required: true })} onChange={onChangeHandler}>
				{defaultOption && (
					<option value={defaultOption}>{defaultOption}</option>
				)}
				{options.map((o) => {
					if (o === defaultOption) return;
					return (
						<option key={o} value={o}>
							{o}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default Select;
