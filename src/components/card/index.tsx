import React from "react";
import { UserInfo } from "redux/contactSlice";
import { FaUserAlt } from "react-icons/fa";
import Button from "components/button/button";
import style from "./card.module.scss";
import { ModalMode, onOpen } from "redux/userModalSlice";
import { useDispatch } from "react-redux";

interface CardProps {
	info: UserInfo;
}

export default function Card({ info }: CardProps) {
	const { first_name, last_name, job, description, id } = info;
	const dispatch = useDispatch();
	function handleOpenModal(mode: ModalMode) {
		dispatch(onOpen({ mode, userInfo: info }));
	}

	return (
		<div className={style.card}>
			<div className={style.user}>
				<div className={style["user-img"]}>
					<FaUserAlt size={40} />
				</div>

				<span className={style.name}>
					{first_name} {last_name}
				</span>
			</div>
			<div className={style.jd}>
				<div className={style.name}>
					{first_name} {last_name}
				</div>
				<div>Job: {job}</div>
				<div>Description: {description}</div>
			</div>
			<div className={style.function}>
				<Button
					context="Edit"
					mode="primary"
					handleClick={() => handleOpenModal("Edit")}
					customStyle={{ width: "100%" }}
				/>

				<Button
					context="Delete"
					mode="danger"
					customStyle={{ width: "100%", marginTop: "5px" }}
					handleClick={() => handleOpenModal("Delete")}
				/>
			</div>
			<div className={style.jd__bottom}>
				<div>Job: {job}</div>
				<div>Description: {description}</div>
			</div>
		</div>
	);
}
