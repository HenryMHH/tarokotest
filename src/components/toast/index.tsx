import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectSlice } from "redux/selector";
import style from "./toast.module.scss";
import { AiFillExclamationCircle, AiFillCheckCircle } from "react-icons/ai";

type MsgQueue = { msg: string; isFailed: boolean };
interface ToastItemProps {
	msg: string;
	isFailed: boolean;
	index: number;
	handleDestory: (index: number) => void;
}

function ToastItem({ msg, isFailed, index, handleDestory }: ToastItemProps) {
	useEffect(() => {
		setTimeout(() => {
			handleDestory(index);
		}, 3000);
	}, []);
	return (
		<div
			className={`${style.toast} ${
				isFailed ? style.error : style.primary
			}`}
			style={{ bottom: index * 100 + "px" }}
		>
			<div className={style.img}>
				{isFailed ? <AiFillExclamationCircle /> : <AiFillCheckCircle />}
			</div>
			<div>
				<div className={style.toast__title}>
					{isFailed ? "Error" : "Success"}
				</div>
				<div>{msg}</div>
			</div>
		</div>
	);
}

export default function Toast() {
	const contactState = useSelector(selectSlice);
	const [msgQueue, setMsgQueue] = useState<Array<MsgQueue>>([]);
	useEffect(() => {
		if (contactState.msg && contactState.isFailed !== null) {
			setMsgQueue([
				...msgQueue,
				{
					msg: contactState.msg,
					isFailed: contactState.isFailed,
				},
			]);
		}
	}, [contactState.isFetching]);
	function handleDestory(index: number) {
		setMsgQueue((pre) => {
			const tempArr = JSON.parse(JSON.stringify(pre));
			tempArr.splice(index, index + 1);

			return tempArr;
		});
	}

	return (
		<div className={style.toast__portal}>
			{msgQueue.map((item, index) => (
				<ToastItem
					key={index}
					index={index}
					msg={item.msg}
					isFailed={item.isFailed}
					handleDestory={handleDestory}
				/>
			))}
		</div>
	);
}
