import axios from "axios";

export const Axios = axios.create({
	baseURL: "http://localhost:3000/api",
	headers: { "Content-Type": "application/json" },
	timeout: 3000,
});
