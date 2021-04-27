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
		<div className='container'>
			<div className='imageTaggerWrapper'>
				{imageData ? (
					<ImageTagger />
				) : (
					<div className='fileSelection'>
						{error && <p className='error'>ERREUR : {error}</p>}
						<ImageSelectForm />
						<JsonSelectForm />
					</div>
				)}
			</div>
		</div>
	);
};

export default ImageTaggerWrapper;
