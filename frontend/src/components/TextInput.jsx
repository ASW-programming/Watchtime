function TextInput({ placeholder, value, onChange, type, className, id }) {
	return (
		<input
			id={id}
			className={className}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			type={type}
		/>
	);
}

export default TextInput;
