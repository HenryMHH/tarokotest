import { Axios } from "./axios";

/**
 * @param status: "success" | "error";
 * @param data: any;
 */
export interface ApiRes {
	status: "success" | "error";
	data: any;
}
export interface CreateUser {
	first_name: string;
	last_name: string;
	job: string;
	description: string;
}

export interface DeleteUser {
	id: number;
}

export interface UpdateUser {
	first_name?: string;
	last_name?: string;
	job?: string;
	description?: string;
	id: number;
}

export function getContacts() {
	return Axios.get("/contacts")
		.then((res) => {
			return { status: "success", data: res.data };
		})
		.catch((err) => {
			return { status: "error", data: {} };
		});
}

export function createUserApi(payload: CreateUser) {
	return Axios.post("/contacts", { contact: payload })
		.then((res) => {
			return { status: "success", data: res.data };
		})
		.catch((err) => {
			return { status: "error", data: {} };
		});
}

export function updateUserApi(payload: UpdateUser) {
	return Axios.patch(`/contacts/${payload.id}`, { info: payload })
		.then((res) => {
			return { status: "success", data: res.data };
		})
		.catch((err) => {
			return { status: "error", data: {} };
		});
}

export function deleteUserApi(payload: DeleteUser) {
	return Axios.delete(`/contacts/${payload.id}`)
		.then((res) => {
			return { status: "success", data: res.data };
		})
		.catch((err) => {
			return { status: "error", data: {} };
		});
}
