function BaseSelect({
	id,
	name,
	label,
	options,
	value,
	onChange,
	placeholder,
}) {
	return (
		<div>
			<select id={id} name={name} value={value} onChange={onChange}>
				{placeholder && <option value="">{placeholder}</option>}
				{options.map((opt) => (
					<option key={opt.value} value={opt.value}>
						{opt.label}
					</option>
				))}
			</select>
		</div>
	);
}

export default BaseSelect;
