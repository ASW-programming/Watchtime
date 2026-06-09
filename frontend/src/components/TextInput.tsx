interface TextInputProps {
	placeholder?: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	type?: React.HTMLInputTypeAttribute;
	className?: string;
	id?: string;
}

function TextInput({
	placeholder,
	value,
	onChange,
	type,
	className,
	id,
}: TextInputProps) {
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
