const smallWidth = "20px";
const smallHeight = "20px";
const mediumWidth = "25px";
const mediumHeight = "25px";
const largeWidth = "32px";
const largeHeight = "32px";

// Props-typer för ikoner som tar emot props
interface SizeProps {
	size: string;
}

interface TransformProps {
	transform?: string;
}

interface SortIconProps {
	transform?: string;
	style?: React.CSSProperties;
}

export function SearchIcon() {
	return (
		<svg
			width={smallWidth}
			height={smallHeight}
			viewBox="0 0 32 32"
			version="1.1">
			<g
				id="Page-1"
				stroke="none"
				strokeWidth="1"
				fill="none"
				fillRule="evenodd">
				<g
					id="Icon-Set"
					transform="translate(-256.000000, -1139.000000)"
					fill="#000000">
					<path
						d="M269.46,1163.45 C263.17,1163.45 258.071,1158.44 258.071,1152.25 C258.071,1146.06 263.17,1141.04 269.46,1141.04 C275.75,1141.04 280.85,1146.06 280.85,1152.25 C280.85,1158.44 275.75,1163.45 269.46,1163.45 L269.46,1163.45 Z M287.688,1169.25 L279.429,1161.12 C281.591,1158.77 282.92,1155.67 282.92,1152.25 C282.92,1144.93 276.894,1139 269.46,1139 C262.026,1139 256,1144.93 256,1152.25 C256,1159.56 262.026,1165.49 269.46,1165.49 C272.672,1165.49 275.618,1164.38 277.932,1162.53 L286.224,1170.69 C286.629,1171.09 287.284,1171.09 287.688,1170.69 C288.093,1170.3 288.093,1169.65 287.688,1169.25 L287.688,1169.25 Z"
						id="search"></path>
				</g>
			</g>
		</svg>
	);
}
export function HamburgerIcon() {
	return (
		<svg
			width={mediumWidth}
			height={mediumHeight}
			viewBox="0 0 24 24"
			fill="none">
			<path
				d="M4 6H20M4 12H20M4 18H20"
				stroke="#000000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export function CancelIcon() {
	return (
		<svg
			fill="#000000"
			width={mediumWidth}
			height={mediumHeight}
			viewBox="0 0 32 32"
			version="1.1">
			<path d="M10.771 8.518c-1.144 0.215-2.83 2.171-2.086 2.915l4.573 4.571-4.573 4.571c-0.915 0.915 1.829 3.656 2.744 2.742l4.573-4.571 4.573 4.571c0.915 0.915 3.658-1.829 2.744-2.742l-4.573-4.571 4.573-4.571c0.915-0.915-1.829-3.656-2.744-2.742l-4.573 4.571-4.573-4.571c-0.173-0.171-0.394-0.223-0.657-0.173v0zM16 1c-8.285 0-15 6.716-15 15s6.715 15 15 15 15-6.716 15-15-6.715-15-15-15zM16 4.75c6.213 0 11.25 5.037 11.25 11.25s-5.037 11.25-11.25 11.25-11.25-5.037-11.25-11.25c0.001-6.213 5.037-11.25 11.25-11.25z"></path>
		</svg>
	);
}

export function ShoppingCartIcon() {
	return (
		<svg
			width={mediumWidth}
			height={mediumHeight}
			viewBox="0 0 24 24"
			fill="none">
			<g id="Interface / Shopping_Cart_01">
				<path
					id="Vector"
					d="M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM17 17H9.29395C8.83288 17 8.60193 17 8.41211 16.918C8.24466 16.8456 8.09938 16.7291 7.99354 16.5805C7.8749 16.414 7.82719 16.1913 7.73274 15.7505L5.27148 4.26465C5.17484 3.81363 5.12587 3.58838 5.00586 3.41992C4.90002 3.27135 4.75477 3.15441 4.58732 3.08205C4.39746 3 4.16779 3 3.70653 3H3M6 6H18.8732C19.595 6 19.9555 6 20.1978 6.15036C20.41 6.28206 20.5653 6.48862 20.633 6.729C20.7104 7.00343 20.611 7.34996 20.411 8.04346L19.0264 12.8435C18.9068 13.2581 18.8469 13.465 18.7256 13.6189C18.6185 13.7547 18.4772 13.861 18.317 13.9263C18.1361 14 17.9211 14 17.4921 14H7.73047M8 21C6.89543 21 6 20.1046 6 19C6 17.8954 6.89543 17 8 17C9.10457 17 10 17.8954 10 19C10 20.1046 9.10457 21 8 21Z"
					stroke="#000000"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</g>
		</svg>
	);
}

export function AddIcon() {
	return (
		<svg
			width={mediumWidth}
			height={mediumHeight}
			viewBox="0 0 24 24"
			fill="none">
			<circle
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
			<path
				d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
		</svg>
	);
}

export function RemoveIcon() {
	return (
		<svg
			width={mediumWidth}
			height={mediumHeight}
			viewBox="0 0 24 24"
			fill="none">
			<circle
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
			<path
				d="M15 12L9 12"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
		</svg>
	);
}

export function ReturnIcon() {
	return (
		<svg
			width={mediumWidth}
			height={mediumHeight}
			viewBox="0 0 48 48"
			fill="none">
			<path
				d="M12.9998 8L6 14L12.9998 21"
				stroke="#000000"
				strokeWidth="4"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M6 14H28.9938C35.8768 14 41.7221 19.6204 41.9904 26.5C42.2739 33.7696 36.2671 40 28.9938 40H11.9984"
				stroke="#000000"
				strokeWidth="4"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export function EmptyListIcon() {
	return (
		<svg
			width={mediumWidth}
			height={mediumHeight}
			viewBox="0 0 24 24"
			fill="none">
			<path
				d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17"
				stroke="#000000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export function ArrowIcon({ transform }: TransformProps) {
	return (
		<svg
			width={largeWidth}
			height={largeHeight}
			viewBox="0 0 32 32"
			version="1.1">
			<defs></defs>
			<g
				transform={transform}
				id="Page-1"
				stroke="none"
				strokeWidth="1"
				fill="none"
				fillRule="evenodd">
				<g
					id="Icon-Set"
					transform="translate(-256.000000, -1087.000000)"
					fill="#000000ff">
					<path
						d="M279,1102 L268.414,1102 L272.536,1097.88 C272.926,1097.49 272.926,1096.86 272.536,1096.46 C272.145,1096.07 271.512,1096.07 271.121,1096.46 L265.464,1102.12 C265.225,1102.36 265.15,1102.69 265.205,1103 C265.15,1103.31 265.225,1103.64 265.464,1103.88 L271.121,1109.54 C271.512,1109.93 272.145,1109.93 272.536,1109.54 C272.926,1109.15 272.926,1108.51 272.536,1108.12 L268.414,1104 L279,1104 C279.552,1104 280,1103.55 280,1103 C280,1102.45 279.552,1102 279,1102 L279,1102 Z M272,1117 C264.268,1117 258,1110.73 258,1103 C258,1095.27 264.268,1089 272,1089 C279.732,1089 286,1095.27 286,1103 C286,1110.73 279.732,1117 272,1117 L272,1117 Z M272,1087 C263.164,1087 256,1094.16 256,1103 C256,1111.84 263.164,1119 272,1119 C280.836,1119 288,1111.84 288,1103 C288,1094.16 280.836,1087 272,1087 L272,1087 Z"
						id="arrow-left-circle"></path>
				</g>
			</g>
		</svg>
	);
}

export function EnterIcon() {
	return (
		<svg
			width={mediumWidth}
			height={mediumHeight}
			viewBox="0 0 64 64"
			strokeWidth="3"
			stroke="#000000"
			fill="none">
			<path d="M55.4,32V53.58a1.81,1.81,0,0,1-1.82,1.82H10.42A1.81,1.81,0,0,1,8.6,53.58V10.42A1.81,1.81,0,0,1,10.42,8.6H32" />
			<polyline points="40.32 8.6 55.4 8.6 55.4 24.18" />
			<line x1="19.32" y1="45.72" x2="54.61" y2="8.91" />
		</svg>
	);
}

export function HomeIcon({ size }: SizeProps) {
	return (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none">
			<path
				d="M22 22L2 22"
				stroke="#1C274C"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
			<path
				d="M2 11L6.06296 7.74968M22 11L13.8741 4.49931C12.7784 3.62279 11.2216 3.62279 10.1259 4.49931L9.34398 5.12486"
				stroke="#1C274C"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
			<path
				d="M15.5 5.5V3.5C15.5 3.22386 15.7239 3 16 3H18.5C18.7761 3 19 3.22386 19 3.5V8.5"
				stroke="#1C274C"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
			<path
				d="M4 22V9.5"
				stroke="#1C274C"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
			<path
				d="M20 9.5V13.5M20 22V17.5"
				stroke="#1C274C"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
			<path
				d="M15 22V17C15 15.5858 15 14.8787 14.5607 14.4393C14.1213 14 13.4142 14 12 14C10.5858 14 9.87868 14 9.43934 14.4393M9 22V17"
				stroke="#1C274C"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M14 9.5C14 10.6046 13.1046 11.5 12 11.5C10.8954 11.5 10 10.6046 10 9.5C10 8.39543 10.8954 7.5 12 7.5C13.1046 7.5 14 8.39543 14 9.5Z"
				stroke="#1C274C"
				strokeWidth="1.5"
			/>
		</svg>
	);
}

export function AcceptIcon() {
	return (
		<div>
			<svg
				width={mediumWidth}
				height={mediumHeight}
				viewBox="0 0 28 28"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M6.65263 14.0304C6.29251 13.6703 6.29251 13.0864 6.65263 12.7263C7.01276 12.3662 7.59663 12.3662 7.95676 12.7263L11.6602 16.4297L19.438 8.65183C19.7981 8.29171 20.382 8.29171 20.7421 8.65183C21.1023 9.01195 21.1023 9.59583 20.7421 9.95596L12.3667 18.3314C11.9762 18.7219 11.343 18.7219 10.9525 18.3314L6.65263 14.0304Z"
					fill="#000000"
				/>
				<path
					clipRule="evenodd"
					d="M14 1C6.8203 1 1 6.8203 1 14C1 21.1797 6.8203 27 14 27C21.1797 27 27 21.1797 27 14C27 6.8203 21.1797 1 14 1ZM3 14C3 7.92487 7.92487 3 14 3C20.0751 3 25 7.92487 25 14C25 20.0751 20.0751 25 14 25C7.92487 25 3 20.0751 3 14Z"
					fill="#000000"
					fillRule="evenodd"
				/>
			</svg>
		</div>
	);
}

export function ClearListIcon() {
	return (
		<div>
			<svg
				width={mediumWidth}
				height={mediumHeight}
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M15 18.5L20 13.5M20 18.5L15 13.5"
					stroke="#1C274C"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M11 14L3 14"
					stroke="#1C274C"
					strokeWidth="1.5"
					strokeLinecap="round"
				/>
				<path
					d="M11 18H3"
					stroke="#1C274C"
					strokeWidth="1.5"
					strokeLinecap="round"
				/>
				<path
					d="M3 6L13.5 6M20 6L17.75 6"
					stroke="#1C274C"
					strokeWidth="1.5"
					strokeLinecap="round"
				/>
				<path
					d="M20 10L9.5 10M3 10H5.25"
					stroke="#1C274C"
					strokeWidth="1.5"
					strokeLinecap="round"
				/>
			</svg>
		</div>
	);
}

export function SortIcon({ transform, style }: SortIconProps) {
	return (
		<svg
			width={mediumWidth}
			height={mediumHeight}
			viewBox="0 -0.5 17 17"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			className="si-glyph si-glyph-triangle-up"
			style={style}>
			<defs></defs>
			<g
				stroke="none"
				strokeWidth="1"
				fill="none"
				fillRule="evenodd"
				transform={`rotate(180, 8.5, 5.5) ${transform ?? ""}`}>
				<path
					d="M7.96,2.392 C8.541,1.812 9.482,1.812 10.064,2.392 L16.506,8.836 C17.088,9.417 17.345,10.939 15.506,10.939 L2.518,10.939 C0.616,10.939 0.936,9.418 1.517,8.836 L7.96,2.392 L7.96,2.392 Z"
					fill="#434343"
					className="si-glyph-fill"></path>
			</g>
		</svg>
	);
}
