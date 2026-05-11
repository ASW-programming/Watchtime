function BaseBtn({
	id,
	className,
	title,
	type,
	text,
	icon,
	onClick,
	disabled,
}) {
	return (
		<button>
			{text}
			{icon}
		</button>
	);
}

export default BaseBtn;
