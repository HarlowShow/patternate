type Coords = {x: number, y: number}
type TriCoords = [Coords, Coords, Coords]

export function useTriangle(height: number, width: number, 
    // hOffset: number, wOffset: number
    ): TriCoords {
    const YBottom = height - 0;
    const Xleft = 0;
    const Xright = width - 0;
    const Xmiddle = width / 2;
    const YTop = 0;

    const coordsOne = { x: Xleft, y: YBottom }
    const coordsTwo = { x: Xright, y: YBottom }
    const coordsThree = { x: Xmiddle, y: YTop };

    return [coordsOne, coordsTwo, coordsThree]
}