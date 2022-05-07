import { createSlice } from "@reduxjs/toolkit";
import * as _ from "lodash";

/**
 * @param id number;
 * @param first_name string;
 * @param last_name string;
 * @param job string;
 *	@param description string;
 */
export interface UserInfo {
	id?: number;
	first_name: string;
	last_name: string;
	job: string;
	description: string;
}

export interface ContactState {
	userList: UserInfo[];
	sort: "DESC" | "ASC" | null;
	isFetching: boolean;
	isFailed: boolean | null;
	createFailed: boolean | null;
	deleteFailed: boolean | null;
	updateFailed: boolean | null;
	msg?: string;
}

const initialState: ContactState = {
	userList: [],
	sort: null,
	isFetching: false,
	isFailed: null,
	createFailed: null,
	deleteFailed: null,
	updateFailed: null,
	msg: "",
};

export const contactSlice = createSlice({
	name: "contact",
	initialState,
	reducers: {
		fetchList(state) {
			state.isFailed = null;
			state.msg = "";
		},
		fetchListSuccess(state, action) {
			state.userList = [...action.payload.data.data];
			state.isFailed = false;
			state.msg = action.payload.data.message;
		},
		fetchListFailed(state, action) {
			state.isFailed = true;
		},
		createUser(state, action) {
			state.isFetching = true;
			state.createFailed = null;
			state.msg = "";
		},
		createUserSuccess(state, action) {
			state.isFetching = false;
			state.userList = [...state.userList, action.payload.data.data];
			state.msg = action.payload.data.message;
			state.createFailed = false;
		},
		createUserFailed(state, action) {
			state.isFetching = false;
			state.createFailed = true;
		},
		updateUser(state, action) {
			state.isFetching = true;
			state.updateFailed = null;
			state.msg = "";
		},
		updateUserSuccess(state, action) {
			state.isFetching = false;
			const targetIndex = state.userList.findIndex(
				(el) => el.id === action.payload.data.data.id
			);

			if (targetIndex >= 0) {
				state.userList[targetIndex] = action.payload.data.data;
			}

			if (state.sort === "ASC") {
				state.userList = [..._.sortBy(state.userList, ["first_name"])];
			}
			if (state.sort === "DESC") {
				state.userList = [
					..._.sortBy(state.userList, ["first_name"]).reverse(),
				];
			}
			state.msg = action.payload.data.message;
			state.updateFailed = false;
		},
		updateUserFailed(state, action) {
			state.isFetching = false;
			state.updateFailed = true;
		},

		deleteUser(state, action) {
			state.isFetching = true;
			state.deleteFailed = null;
			state.msg = "";
		},
		deleteUserSuccess(state, action) {
			state.isFetching = false;
			const targetIndex = state.userList.findIndex(
				(el) => el.id === action.payload.data.data.id
			);
			if (targetIndex >= 0) {
				state.userList.splice(targetIndex, targetIndex + 1);
			}
			if (state.sort === "ASC") {
				state.userList = [..._.sortBy(state.userList, ["first_name"])];
			}
			if (state.sort === "DESC") {
				state.userList = [
					..._.sortBy(state.userList, ["first_name"]).reverse(),
				];
			}
			state.msg = action.payload.data.message;
			state.deleteFailed = false;
		},
		deleteUserFailed(state, action) {
			state.isFetching = false;
			state.deleteFailed = true;
		},

		setSort(state, action) {
			state.sort = action.payload.sort;
			if (action.payload.sort === "ASC") {
				state.userList = [..._.sortBy(state.userList, ["first_name"])];
			}
			if (action.payload.sort === "DESC") {
				state.userList = [
					..._.sortBy(state.userList, ["first_name"]).reverse(),
				];
			}
		},
	},
});

export const {
	fetchListSuccess,
	fetchList,
	fetchListFailed,
	createUser,
	createUserSuccess,
	createUserFailed,
	deleteUser,
	deleteUserSuccess,
	deleteUserFailed,
	updateUser,
	updateUserSuccess,
	updateUserFailed,
	setSort,
} = contactSlice.actions;
export default contactSlice.reducer;
