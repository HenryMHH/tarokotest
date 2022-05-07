import Button from "components/button/button";
import FormVield from "components/formField";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	createUser,
	deleteUser,
	updateUser,
	UserInfo,
} from "redux/contactSlice";
import { userModalSlice } from "redux/selector";
import { onClose } from "redux/userModalSlice";
import style from "./modal.module.scss";

const initialInfo = {
	first_name: "",
	last_name: "",
	job: "",
	description: "",
};

export default function ContactModal() {
	const userModalState = useSelector(userModalSlice);
	const [userInfo, setUserInfo] = useState<UserInfo>(initialInfo);
	const [isSubmit, setIsSubmit] = useState<boolean>(false);
	const [submitError, setSubmitError] = useState<boolean>(false);
	const dispatch = useDispatch();
	function handleCloseModal() {
		dispatch(onClose());
	}

	function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
		const inputName = event.target.name;
		const value = event.target.value;
		setUserInfo({ ...userInfo, [inputName]: value });
	}

	function handleSubmit() {
		setIsSubmit(true);
	}

	function sendRequest() {
		if (userModalState.mode === "Create") {
			dispatch(createUser(userInfo));
		}
		if (userModalState.mode === "Edit") {
			dispatch(updateUser(userInfo));
		}
		if (userModalState.mode === "Delete") {
			dispatch(deleteUser({ id: userInfo.id }));
		}
		handleCloseModal();
	}

	function resetModalState() {
		setUserInfo(initialInfo);
		setSubmitError(false);
	}

	useEffect(() => {
		if (isSubmit) {
			let tempError = false;
			for (const key in userInfo) {
				if (!userInfo[key]) {
					tempError = true;
				}
			}
			setIsSubmit(false);
			if (tempError) {
				setSubmitError(true);
				return;
			}
			sendRequest();
		}
	}, [isSubmit]);

	useEffect(() => {
		if (
			userModalState.mode === "Edit" ||
			userModalState.mode === "Delete"
		) {
			setUserInfo(
				(pre) => (pre = { ...pre, ...userModalState.userInfo })
			);
		}
		return () => resetModalState();
	}, []);

	function saveButtonContext() {
		switch (userModalState.mode) {
			case "Create":
				return "Create";
			case "Edit":
				return "Update";
			case "Delete":
				return "Delete";
			default:
				return "";
		}
	}
	return (
		<div className={style.modal__portal}>
			<div className={style.modal__bg} onClick={handleCloseModal}></div>
			<div
				className={style.modal}
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<div className={style.modal__header}>
					{userModalState.mode} User
				</div>
				<div className={style.modal__body}>
					{userModalState.mode === "Create" ||
					userModalState.mode === "Edit" ? (
						<>
							<FormVield
								name="first_name"
								value={userInfo.first_name}
								isRequired
								submitError={submitError}
								onChange={handleOnChange}
							/>
							<FormVield
								name="last_name"
								value={userInfo.last_name}
								isRequired
								submitError={submitError}
								onChange={handleOnChange}
							/>
							<FormVield
								name="job"
								submitError={submitError}
								value={userInfo.job}
								onChange={handleOnChange}
								isRequired
							/>
							<FormVield
								name="description"
								value={userInfo.description}
								isRequired
								submitError={submitError}
								onChange={handleOnChange}
							/>
						</>
					) : null}
					{userModalState.mode === "Delete" && (
						<div>
							Are you sure to delete the user
							<span className={style["delete-name"]}>
								{userModalState.userInfo?.first_name}
								{userModalState.userInfo?.first_name}
							</span>
						</div>
					)}
				</div>
				<div className={style.modal__footer}>
					<Button
						context="Close"
						mode="danger"
						handleClick={handleCloseModal}
					/>
					<Button
						context={saveButtonContext()}
						mode="primary"
						customStyle={{ marginLeft: "5px" }}
						handleClick={handleSubmit}
					/>
				</div>
			</div>
		</div>
	);
}
