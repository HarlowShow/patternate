type Coords = {x: number, y: number}
type TriCoords = [Coords, Coords, Coords]

export function useTriangle(height: number, width: number, hOffset: number, wOffset: number): TriCoords {
    const YBottom = height - hOffset;
    const Xleft = wOffset;
    const Xright = width - wOffset;
    const Xmiddle = width / 2;
    const YTop = hOffset;

    const coordsOne = { x: Xleft, y: YBottom }
    const coordsTwo = { x: Xright, y: YBottom }
    const coordsThree = { x: Xmiddle, y: YTop };

    return [coordsOne, coordsTwo, coordsThree]
}