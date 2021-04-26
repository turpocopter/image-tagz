import ImageTagger from "./components/ImageTagger";
import ImageSelectForm from "./components/ImageSelectForm";

import { useAppSelector } from "../../app/hooks";
import { selectImageData } from "./imageTaggerSlice";

import "./ImageTagger.scss";

const ImageTaggerWrapper = () => {
	const imageData = useAppSelector(selectImageData);

	return <div>{imageData ? <ImageTagger /> : <ImageSelectForm />}</div>;
};

export default ImageTaggerWrapper;
