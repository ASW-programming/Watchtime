interface CheckboxProps {
	checked?: boolean;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Checkbox({ checked, onChange }: CheckboxProps): React.JSX.Element {
	return (
		<div>
			<input type="checkbox" checked={checked} onChange={onChange} />
		</div>
	);
}

export default Checkbox;
