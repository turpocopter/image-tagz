import React, { useState } from "react";

const TagEditor = () => {
	const [tag, setTag] = useState("");
	return (
		<div className='tagEditor'>
			<input type='text' value={tag} onChange={(e) => setTag(e.target.value)} />
		</div>
	);
};

export default TagEditor;
