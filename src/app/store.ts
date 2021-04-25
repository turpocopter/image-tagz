import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import imageTaggerReducer from "../features/imageTagger/imageTaggerSlice";

export const store = configureStore({
	reducer: {
		imageTagger: imageTaggerReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
