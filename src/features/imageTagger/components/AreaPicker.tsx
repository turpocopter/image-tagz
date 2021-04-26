import React, { useState, useRef } from "react";

import Point from "../Point";

const pickLocalCoords = (pageCoords: Point, refElt: HTMLElement): Point => {
	const {
		x: mapX,
		y: mapY,
		width: mapW,
		height: mapH,
	} = refElt.getBoundingClientRect();
	const [originX, originY] = [
		(100 * (pageCoords.x - mapX)) / mapW,
		(100 * (pageCoords.y - mapY)) / mapH,
	];
	return { x: originX, y: originY };
};

const AreaPicker = () => {
	const [isSelecting, setIsSelecting] = useState(false);
	const [origin, setOrigin] = useState<Point | undefined>();
	const [destination, setDestination] = useState<Point | undefined>();
	const mapRef = useRef<any>();

	const handleMouseDown = (e: React.MouseEvent) => {
		if (!isSelecting && e.target instanceof HTMLElement) {
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
	};

	return (
		<div
			className='areaPicker'
			ref={mapRef}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}>
			{origin && destination && (
				<div
					className='area initialized'
					style={{
						left: `${Math.min(origin.x, destination.x)}%`,
						top: `${Math.min(origin.y, destination.y)}%`,
						width: `${Math.abs(origin.x - destination.x)}%`,
						height: `${Math.abs(origin.y - destination.y)}%`,
					}}
				/>
			)}
		</div>
	);
};

export default AreaPicker;
