type Coords = {x: number, y: number}
type TriCoords = [Coords, Coords, Coords]

export function useSideTriangle(height: number, width: number, 
    // hOffset: number, wOffset: number
    ): TriCoords {

    const coordsOne = { x: 0, y: 0 }
    const coordsTwo = { x: 100, y: 50 }
    const coordsThree = { x: 0, y: 100 };

    return [coordsOne, coordsTwo, coordsThree]
}