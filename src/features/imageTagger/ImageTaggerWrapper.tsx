import ImageTagger from "./components/ImageTagger";
import ImageSelectForm from "./components/ImageSelectForm";
import JsonSelectForm from "./components/JsonSelectForm";

import { useAppSelector } from "../../app/hooks";
import { getImageData, getError } from "./imageTaggerSlice";

import "./ImageTagger.scss";

const ImageTaggerWrapper = () => {
	const imageData = useAppSelector(getImageData);
	const error = useAppSelector(getError);

	return (
		<div>
			{imageData ? (
				<ImageTagger />
			) : (
				<>
					<ImageSelectForm />
					<JsonSelectForm />
				</>
			)}
		</div>
	);
};

export default ImageTaggerWrapper;
