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

interface ImageDimensions {
	width: number;
	height: number;
}

interface DragAreaPayload {
	index: number;
	movX: number;
	movY: number;
}

export interface ImageTaggerState {
	imageData: string | undefined;
	imageDimensions: ImageDimensions | undefined;
	taggedAreas: TaggedArea[];
}

const initialState: ImageTaggerState = {
	imageData: undefined,
	imageDimensions: undefined,
	taggedAreas: [],
};

export const imageTaggerSlice = createSlice({
	name: "imageTagger",
	initialState,
	reducers: {
		setImageData: (state, action: PayloadAction<string>) => {
			state.imageData = action.payload;
		},
		setImageDimensions: (state, action: PayloadAction<ImageDimensions>) => {
			state.imageDimensions = action.payload;
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
		dragArea: (state, action: PayloadAction<DragAreaPayload>) => {
			if (state.imageDimensions) {
				state.taggedAreas[action.payload.index].origin.x +=
					(action.payload.movX * 100) / state.imageDimensions.width;
				state.taggedAreas[action.payload.index].origin.y +=
					(action.payload.movY * 100) / state.imageDimensions.height;
			}
		},
	},
});

export const {
	setImageData,
	setImageDimensions,
	unselectAllAreas,
	addAndSelectArea,
	selectAreaByIndex,
	dragArea,
} = imageTaggerSlice.actions;

export const getImageData = (state: RootState) => state.imageTagger.imageData;
export const getTaggedAreasLength = (state: RootState) =>
	state.imageTagger.taggedAreas.length;
export const getTaggedAreaData = (state: RootState, index: number) =>
	state.imageTagger.taggedAreas[index];

export default imageTaggerSlice.reducer;
