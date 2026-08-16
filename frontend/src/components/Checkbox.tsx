interface CheckboxProps {
	checked?: boolean;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	id?: string;
	className?: string;
}

function Checkbox({
	checked,
	onChange,
	id,
	className,
}: CheckboxProps): React.JSX.Element {
	return (
		<input
			type="checkbox"
			checked={checked ?? false}
			onChange={onChange}
			id={id}
			className={className}
		/>
	);
}

export default Checkbox;
