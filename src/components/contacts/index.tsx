import Card from "components/card";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchList, setSort } from "redux/contactSlice";
import { selectSlice } from "redux/selector";
import style from "styles/contacts.module.scss";
import { AiOutlineSortAscending } from "react-icons/ai";

export default function Contacts() {
	const dispatch = useDispatch();
	const contactState = useSelector(selectSlice);
	useEffect(() => {
		dispatch(fetchList());
	}, []);

	function handleSort() {
		if (!contactState.sort || contactState.sort === "DESC") {
			dispatch(setSort({ sort: "ASC" }));
		}

		if (contactState.sort === "ASC") {
			dispatch(setSort({ sort: "DESC" }));
		}
	}

	return (
		<div className={style.contacts}>
			<div className={style.title}>
				Contacts
				<div className={style.sort} onClick={handleSort}>
					<AiOutlineSortAscending />
				</div>
			</div>
			<div className={style.container}>
				{contactState.userList.map((item) => (
					<div key={item.id + Date.now().toString()}>
						<Card info={item} />
					</div>
				))}
			</div>
		</div>
	);
}
