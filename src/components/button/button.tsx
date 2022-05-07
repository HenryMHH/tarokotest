import React, { CSSProperties } from "react";
import style from "styles/button.module.scss";

type ButtonMode = "primary" | "danger";

interface ButtonProps {
	context: string;
	mode: ButtonMode;
	handleClick: () => void;
	customStyle?: CSSProperties;
}

export default function Button({
	context,
	mode,
	handleClick,
	customStyle,
}: ButtonProps) {
	return (
		<button
			onClick={handleClick}
			className={`${style.button} ${style[mode]}`}
			style={{ ...customStyle }}
		>
			{context}
		</button>
	);
}
