import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import Point from "./Point";

interface NewArea {
	origin: Point;
	width: number;
	height: number;
}

interface TaggedArea extends NewArea {
	title: string;
	isSelected: boolean;
}

export interface ImageTaggerState {
	imageData: string | undefined;
	taggedAreas: TaggedArea[];
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
		unselectAllAreas: (state) => {
			state.taggedAreas = [
				...state.taggedAreas.map((area) => ({ ...area, isSelected: false })),
			];
		},
		addAndSelectArea: (state, action: PayloadAction<NewArea>) => {
			state.taggedAreas = [
				...state.taggedAreas.map((area) => ({ ...area, isSelected: false })),
				{
					origin: action.payload.origin,
					width: action.payload.width,
					height: action.payload.height,
					title: "",
					isSelected: true,
				},
			];
		},
		selectAreaByIndex: (state, action: PayloadAction<number>) => {
			state.taggedAreas = [
				...state.taggedAreas.map((area, i) => ({
					...area,
					isSelected: action.payload === i,
				})),
			];
		},
	},
});

export const {
	setImageData,
	unselectAllAreas,
	addAndSelectArea,
	selectAreaByIndex,
} = imageTaggerSlice.actions;

export const getImageData = (state: RootState) => state.imageTagger.imageData;
export const getTaggedAreasLength = (state: RootState) =>
	state.imageTagger.taggedAreas.length;
export const getTaggedAreaData = (state: RootState, index: number) =>
	state.imageTagger.taggedAreas[index];

export default imageTaggerSlice.reducer;
