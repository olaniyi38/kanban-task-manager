import  { AiOutlineCheck } from 'react-icons/ai'

const CheckBox = ({ label, name, ...inputProps }) => {
	return (
		<div className="form-group checkbox">
			<label className="form-group__label">
		        <span className="check">
					<AiOutlineCheck />
				</span>
				<input
					type="checkbox"
					{...inputProps}
				/>
				{label}
			</label>
		</div>
	);
};

export default CheckBox;
