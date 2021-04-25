export interface Point {
	x: number;
	y: number;
}

export const pickLocalCoords = (
	pageCoords: Point,
	refElt: HTMLElement
): Point => {
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
