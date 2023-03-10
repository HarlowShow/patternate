import { storeToRefs } from 'pinia';
import { useConfigStore } from '~~/stores/config';
export async function useDrop(e: DragEvent) {
    const store = useConfigStore();
    const { submode } = storeToRefs(store);
    const { updateImageDimensions } = useConfigStore();

    const validateImage = ((files: File[]): File => {
        // check only one has been uploaded
        if (files.length !== 1) {
          throw new Error('upload must be single file')
        } else {
          const file = files[0];
          if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
          throw new Error('file must be image type: accepted formats are .png and .jpeg')
          } else {
            return file;
          }
        }
      })

    if (e.dataTransfer !== null && e.dataTransfer.files !== null) {
        const imageFile = validateImage([...e.dataTransfer.files]);
        const imageURL = URL.createObjectURL(imageFile);
        console.log(imageURL)
        const newImage = document.getElementsByClassName('input')[0] as HTMLImageElement;
        newImage.src = imageURL
        newImage.onload = (() => {
          updateImageDimensions(newImage.width, newImage.height)
        })
        await nextTick();
    return newImage;
    } else {
      console.warn('error in image drop')
    }
}