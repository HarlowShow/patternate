type Coords = {x: number, y: number}
type ArrowCoords = [Coords, Coords, Coords, Coords, Coords, Coords]
export function useArrowCoords(height: number, width: number, 
    // hOffset: number, wOffset: number
    ): ArrowCoords {
        const topLeft: Coords = {x: 0, y: 0}
        const topMiddle: Coords = {x: width/2, y: height/4}
        const topRight: Coords = {x: width, y: 0}
        const bottomLeft: Coords = {x: 0, y: height - height/4}
        const bottomMiddle: Coords = {x: width/2, y: height}
        const bottomRight: Coords = {x: width, y: height - height/4}

        return [topLeft, topMiddle, topRight, bottomLeft, bottomMiddle, bottomRight]
    }