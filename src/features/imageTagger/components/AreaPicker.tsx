import React, { useState, useRef } from "react";

import CurrentArea from "./CurrentArea";
import { Point, pickLocalCoords } from "../utils";

const AreaPicker = () => {
	const [isSelecting, setIsSelecting] = useState(false);
	const [isTagging, setIsTagging] = useState(false);
	const [origin, setOrigin] = useState<Point | undefined>();
	const [destination, setDestination] = useState<Point | undefined>();
	const mapRef = useRef<any>();

	const handleMouseDown = (e: React.MouseEvent) => {
		if (!isTagging && e.target instanceof HTMLElement) {
			setIsSelecting(true);
			setOrigin(
				pickLocalCoords({ x: e.clientX, y: e.clientY }, mapRef.current)
			);
			setDestination(undefined);
		}
	};

	const handleMouseMove = (e: React.MouseEvent & { target: any }) => {
		if (isSelecting && e.target instanceof HTMLElement) {
			console.log(e.target, e.clientX, e.clientY);
			setDestination(
				pickLocalCoords({ x: e.clientX, y: e.clientY }, mapRef.current)
			);
		}
	};

	const handleMouseUp = (e: React.MouseEvent) => {
		setIsSelecting(false);
		setIsTagging(true);
	};

	return (
		<div
			className='areaPicker'
			ref={mapRef}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}>
			{origin && destination && (
				<CurrentArea
					x={Math.min(origin.x, destination.x)}
					y={Math.min(origin.y, destination.y)}
					width={Math.abs(origin.x - destination.x)}
					height={Math.abs(origin.y - destination.y)}
					isEditingTag={isTagging}
				/>
			)}
		</div>
	);
};

export default AreaPicker;
