import { configureStore } from "@reduxjs/toolkit";
import contactSlice from "./contactSlice";
import userModalSlice from "./userModalSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
	reducer: {
		contactSlice,
		userModalSlice,
	},
	middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
