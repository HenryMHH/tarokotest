import React from "react";
import style from "./spinner.module.scss";

interface Props {
	isFullScreen?: boolean;
}

export default function LoadingAnimation({ isFullScreen = false }: Props) {
	return (
		<div
			className={`${style.spinner} ${
				isFullScreen ? style.fullscreen : ""
			}`}
		>
			<div className={style["lds-ring"]}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
}
