import { ContactState } from "./contactSlice";
import { UserModalState } from "./userModalSlice";

interface RootState {
	contactSlice: ContactState;
	userModalSlice: UserModalState;
}
export const selectSlice = (state: RootState) => state.contactSlice;
export const userModalSlice = (state: RootState) => state.userModalSlice;
