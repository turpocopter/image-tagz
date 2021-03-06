import React from "react";

import { useAppDispatch } from "../../../app/hooks";
import { loadJsonAsync } from "../imageTaggerSlice";

const JsonSelectForm = () => {
	const dispatch = useAppDispatch();
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			dispatch(loadJsonAsync(e.target.files[0]));
		}
	};

	return (
		<div className='selectForm'>
			<h2>Sélectionner un fichier JSON</h2>
			<input type='file' accept='text/json' onChange={handleChange} />
		</div>
	);
};

export default JsonSelectForm;
