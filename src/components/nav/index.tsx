import React from "react";
import style from "styles/styles.module.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import Button from "components/button/button";
import { useDispatch } from "react-redux";
import { onOpen } from "redux/userModalSlice";
import { useState } from "react";

export default function Nav() {
	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = useState<boolean>(false);

	function handleOpenModal() {
		dispatch(onOpen({ mode: "Create" }));
	}

	function handleMobileOpenModal() {
		handleOpenModal();
		setIsOpen(false);
	}
	return (
		<div className={style.nav}>
			<div className={style.logo}>Contact List</div>
			<div className={style.menu}>
				<div
					className={style.menu__button}
					onClick={() => setIsOpen(!isOpen)}
				>
					<GiHamburgerMenu size={20} />
				</div>
				<div className={style["desktop-content"]}>
					<Button
						context="Add Contact"
						handleClick={handleOpenModal}
						mode="primary"
					/>
				</div>

				{isOpen && (
					<div className={style.menu__content}>
						<div
							className={style["mobile-content"]}
							onClick={handleMobileOpenModal}
						>
							Add Contact
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
