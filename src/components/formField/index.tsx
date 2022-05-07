import React, { useRef, useState } from "react";
import { useEffect } from "react";
import style from "./input.module.scss";
interface Props {
	children?: React.ReactNode;
	isError?: boolean;
	isRequired?: boolean;
	name: string;
	value: string;
	submitError: boolean;
	[x: string]: any;
}

export default function FormVield({
	children,
	isError = false,
	isRequired = false,
	submitError = false,
	name,
	value,
	...rest
}: Props) {
	const [isBlurred, setIsBlurred] = useState<boolean>(false);
	function returnFirstCapital(value: string) {
		return value.replace(value[0], value[0].toUpperCase());
	}

	function handleOnBlur() {
		setIsBlurred(true);
	}

	return (
		<div className={style.formfield}>
			<div className={style.label}>
				{returnFirstCapital(name)}
				{isRequired && <span className={style.required}>*</span>}
			</div>
			<input
				className={style.input}
				name={name}
				onBlur={handleOnBlur}
				value={value}
				{...rest}
			/>
			{(isRequired && isBlurred && !value) ||
			(submitError && isRequired && !value) ? (
				<div className={style["error-message"]}>
					This field is required.
				</div>
			) : null}
		</div>
	);
}
