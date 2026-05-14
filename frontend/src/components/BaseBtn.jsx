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
		<button
			id={id}
			className={className}
			title={title}
			type={type}
			onClick={onClick}
			disabled={disabled}>
			{text}
			{icon}
		</button>
	);
}

export default BaseBtn;
