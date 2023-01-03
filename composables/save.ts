export function useSave(name: string, url: string) {
    const link = document.createElement('a');
    link.download = `${name}.png`;
    link.href = url;
    link.click();
}