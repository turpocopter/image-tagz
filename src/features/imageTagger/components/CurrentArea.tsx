import React from "react";

import TagEditor from "./TagEditor";

interface CurrentAreaProps {
	x: number;
	y: number;
	width: number;
	height: number;
	isEditingTag: boolean;
}

const CurrentArea = ({
	x,
	y,
	width,
	height,
	isEditingTag,
}: CurrentAreaProps) => {
	return (
		<div
			className='currentArea'
			style={{
				left: `${x}%`,
				top: `${y}%`,
				width: `${width}%`,
				height: `${height}%`,
			}}>
			{isEditingTag && <TagEditor />}
		</div>
	);
};

export default CurrentArea;
