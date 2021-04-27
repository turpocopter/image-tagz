import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import testInterfaces from "./imageTaggerSlice-ti";
import { createCheckers } from "ts-interface-checker";
import { RootState } from "../../app/store";

export interface Point {
	x: number;
	y: number;
}

interface NewArea {
	origin: Point;
	width: number;
	height: number;
}

export interface TaggedArea extends NewArea {
	title: string;
}

interface ImageDimensions {
	width: number;
	height: number;
}

interface EditAreaPayload {
	index: number;
	movX: number;
	movY: number;
}

interface EditTitlePayload {
	index: number;
	title: string;
}

interface TaggedImageData {
	imageData: string | undefined;
	imageDimensions: ImageDimensions | undefined;
	taggedAreas: TaggedArea[];
}

export interface ImageTaggerState extends TaggedImageData {
	selected: number | undefined;
	error: string;
	displayRatio: number;
}

const { TaggedImageData: TaggedImageDataValidator } = createCheckers(
	testInterfaces
);

const initialState: ImageTaggerState = {
	imageData: undefined,
	imageDimensions: undefined,
	taggedAreas: [],
	selected: undefined,
	error: "",
	displayRatio: 1,
};

export const convertBlobToBase64 = (blob: Blob): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onerror = () => reject(new Error("impossible de charger l'image"));
		reader.onload = () => {
			resolve(reader.result as string);
		};
		reader.readAsDataURL(blob);
	});

export const getDimensionsFromImageData = (
	imageData: string
): Promise<ImageDimensions> =>
	new Promise((resolve, reject) => {
		const image = new Image();
		image.src = imageData;
		image.onerror = () => reject(new Error("image invalide"));
		image.onload = () => {
			resolve({ width: image.width, height: image.height });
		};
	});

export const loadImageAsync = createAsyncThunk(
	"imageTagger/loadImage",
	async (file: File) => {
		const blob = await new Response(file).blob();
		const imageData = await convertBlobToBase64(blob);
		const imageDimensions = await getDimensionsFromImageData(imageData);
		return { imageData, imageDimensions };
	}
);

export const loadJsonAsync = createAsyncThunk(
	"imageTagger/loadJson",
	async (file: File) => {
		const jsonStr = await new Response(file).text();
		let taggedImageData: TaggedImageData = {
			imageData: "",
			taggedAreas: [],
			imageDimensions: undefined,
		};
		try {
			taggedImageData = JSON.parse(jsonStr);
			TaggedImageDataValidator.check(taggedImageData);
		} catch (err) {
			throw new Error("format de fichier invalide");
		}

		if (
			!taggedImageData.imageData ||
			!taggedImageData.taggedAreas ||
			!Array.isArray(taggedImageData.taggedAreas)
		)
			throw new Error("format JSON incompatible");
		taggedImageData.imageDimensions = await getDimensionsFromImageData(
			taggedImageData.imageData
		);
		return taggedImageData;
	}
);

export const imageTaggerSlice = createSlice({
	name: "imageTagger",
	initialState,
	reducers: {
		unselectAllAreas: (state) => {
			state.selected = undefined;
		},
		addAndSelectArea: (state, action: PayloadAction<NewArea>) => {
			state.taggedAreas.push({
				origin: action.payload.origin,
				width: action.payload.width,
				height: action.payload.height,
				title: "",
			});
			state.selected = state.taggedAreas.length - 1;
		},
		selectAreaByIndex: (state, action: PayloadAction<number>) => {
			state.selected = action.payload;
		},
		deleteSelectedArea: (state, action: PayloadAction<number>) => {
			state.taggedAreas.splice(action.payload, 1);
			state.selected = undefined;
		},
		dragArea: (state, action: PayloadAction<EditAreaPayload>) => {
			if (state.imageDimensions) {
				const newX =
					state.taggedAreas[action.payload.index].origin.x +
					(state.displayRatio * action.payload.movX * 100) /
						state.imageDimensions.width;
				const newY =
					state.taggedAreas[action.payload.index].origin.y +
					(state.displayRatio * action.payload.movY * 100) /
						state.imageDimensions.height;
				if (
					newX >= 0 &&
					newX <= 100 - state.taggedAreas[action.payload.index].width
				) {
					state.taggedAreas[action.payload.index].origin.x = newX;
				}
				if (
					newY >= 0 &&
					newY <= 100 - state.taggedAreas[action.payload.index].height
				) {
					state.taggedAreas[action.payload.index].origin.y = newY;
				}
			}
		},
		resizeArea: (state, action: PayloadAction<EditAreaPayload>) => {
			if (state.imageDimensions) {
				const newW =
					state.taggedAreas[action.payload.index].width +
					(state.displayRatio * action.payload.movX * 100) /
						state.imageDimensions.width;
				const newH =
					state.taggedAreas[action.payload.index].height +
					(state.displayRatio * action.payload.movY * 100) /
						state.imageDimensions.height;
				if (newW <= 100 - state.taggedAreas[action.payload.index].origin.x) {
					state.taggedAreas[action.payload.index].width = newW;
				}
				if (newH <= 100 - state.taggedAreas[action.payload.index].origin.y) {
					state.taggedAreas[action.payload.index].height = newH;
				}
			}
		},
		setDisplayRatio: (state, action: PayloadAction<number>) => {
			if (state.imageDimensions)
				state.displayRatio = state.imageDimensions.width / action.payload;
		},
		setAreaTitle: (state, action: PayloadAction<EditTitlePayload>) => {
			state.taggedAreas[action.payload.index].title = action.payload.title;
		},
		reinit: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadImageAsync.fulfilled, (state, action) => {
				state.imageData = action.payload.imageData;
				state.imageDimensions = action.payload.imageDimensions;
				state.error = "";
			})
			.addCase(loadImageAsync.rejected, (state, action) => {
				state.error =
					action.error.message || "le chargement de l'image a échoué";
			})
			.addCase(loadJsonAsync.fulfilled, (state, action) => {
				state.imageData = action.payload.imageData;
				state.imageDimensions = action.payload.imageDimensions;
				state.taggedAreas = action.payload.taggedAreas;
				state.error = "";
			})
			.addCase(loadJsonAsync.rejected, (state, action) => {
				state.error =
					action.error.message || "le chargement du fichier JSON a échoué";
			});
	},
});

export const {
	unselectAllAreas,
	addAndSelectArea,
	selectAreaByIndex,
	deleteSelectedArea,
	dragArea,
	resizeArea,
	setAreaTitle,
	setDisplayRatio,
	reinit,
} = imageTaggerSlice.actions;

export const getImageData = (state: RootState) => state.imageTagger.imageData;
export const getError = (state: RootState) => state.imageTagger.error;
export const hasSelection = (state: RootState) =>
	state.imageTagger.selected !== undefined;
export const getTaggedAreas = (state: RootState) =>
	state.imageTagger.taggedAreas;
export const getTaggedAreasLength = (state: RootState) =>
	state.imageTagger.taggedAreas.length;
export const getTaggedAreaData = (state: RootState, index: number) => ({
	...state.imageTagger.taggedAreas[index],
	isSelected: state.imageTagger.selected === index,
});

export default imageTaggerSlice.reducer;
