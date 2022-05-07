import {
	ApiRes,
	CreateUser,
	createUserApi,
	deleteUserApi,
	getContacts,
	updateUserApi,
} from "apis/api";
import { useDispatch } from "react-redux";
import { call, put, takeLatest, all } from "redux-saga/effects";
import {
	fetchList,
	fetchListSuccess,
	fetchListFailed,
	createUserSuccess,
	createUserFailed,
	createUser,
	deleteUserSuccess,
	deleteUserFailed,
	updateUserSuccess,
	updateUserFailed,
	updateUser,
	deleteUser,
} from "./contactSlice";

function* fetchUserListSaga() {
	try {
		const result: ApiRes = yield call(getContacts);
		if (result.status !== "success") {
			throw "Error";
		}
		yield put(fetchListSuccess(result));
	} catch (error) {
		console.error(error);
		yield put(fetchListFailed({}));
	}
}

function* createUserSaga(action) {
	try {
		const result: ApiRes = yield call(createUserApi, action.payload);
		if (result.status !== "success") {
			throw "Error";
		}
		yield put(createUserSuccess(result));
	} catch (error) {
		console.error(error);
		yield put(createUserFailed({}));
	}
}

function* updateUserSaga(action) {
	try {
		const result: ApiRes = yield call(updateUserApi, action.payload);
		if (result.status !== "success") {
			throw "Error";
		}
		yield put(updateUserSuccess(result));
	} catch (error) {
		yield put(updateUserFailed({}));
	}
}

function* deleteUserSaga(action) {
	try {
		const result: ApiRes = yield call(deleteUserApi, action.payload);
		if (result.status !== "success") {
			throw "Error";
		}
		yield put(deleteUserSuccess(result));
	} catch (error) {
		yield put(deleteUserFailed({}));
	}
}

export function* contactSaga() {
	yield takeLatest(fetchList.type, fetchUserListSaga);
	yield takeLatest(createUser.type, createUserSaga);
	yield takeLatest(updateUser.type, updateUserSaga);
	yield takeLatest(deleteUser.type, deleteUserSaga);
}

export default function* rootSaga() {
	yield all([contactSaga()]);
}
