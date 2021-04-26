import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import Point from "./Point";

export interface ImageArea {
	origin: Point;
	width: number;
	height: number;
	title: string;
}

export interface ImageTaggerState {
	imageData: string | undefined;
	taggedAreas: ImageArea[];
}

const initialState: ImageTaggerState = {
	imageData: undefined,
	taggedAreas: [],
};

export const imageTaggerSlice = createSlice({
	name: "imageTagger",
	initialState,
	reducers: {
		setImageData: (state, action: PayloadAction<string>) => {
			state.imageData = action.payload;
		},
	},
});

export const { setImageData } = imageTaggerSlice.actions;

export const selectImageData = (state: RootState) =>
	state.imageTagger.imageData;

export default imageTaggerSlice.reducer;
