interface BaseBtnProps {
	id?: string;
	className?: string;
	title?: string;
	type?: "button" | "submit" | "reset";
	text?: string;
	icon?: React.ReactNode;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
}

function BaseBtn({
	id,
	className,
	title,
	type,
	text,
	icon,
	onClick,
	disabled,
}: BaseBtnProps) {
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
