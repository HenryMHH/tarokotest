import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "./contactSlice";

export type ModalMode = "Create" | "Edit" | "Delete" | null;
export interface UserModalState {
	isOpen: boolean;
	mode: ModalMode;
	userInfo: UserInfo | null;
}

const initialState: UserModalState = {
	isOpen: false,
	mode: null,
	userInfo: null,
};

export const userModalSlice = createSlice({
	name: "userModal",
	initialState,
	reducers: {
		toggleModal(state, action) {
			state.isOpen = !state.isOpen;
		},
		onOpen(state, action) {
			state.isOpen = true;
			state.mode = action.payload.mode;
			if (
				action.payload.mode === "Edit" ||
				action.payload.mode === "Delete"
			) {
				state.userInfo = action.payload.userInfo;
			}
		},
		onClose(state) {
			state.isOpen = false;
			state.mode = null;
			state.userInfo = null;
		},
	},
});
export const { toggleModal, onOpen, onClose } = userModalSlice.actions;
export default userModalSlice.reducer;
