
// merge multiple canvases into one then save to one image
export function useMerge(canvasOne: HTMLCanvasElement, canvasTwo: HTMLCanvasElement) {
    const width = canvasOne.width;
    const height = canvasOne.height;
    const merged = document.createElement('canvas');
    const mergedCtx = merged.getContext('2d');
    merged.width = width;
    merged.height = height;
    
    [canvasOne, canvasTwo].forEach((canvas) => {
        mergedCtx?.beginPath()
        mergedCtx?.drawImage(canvas, 0, 0, width, height)
    })
    
    return merged.toDataURL()
}

export function useSave(name: string, url: string) {
    const link = document.createElement('a');
    link.download = `${name}.png`;
    link.href = url;
    link.click();
}