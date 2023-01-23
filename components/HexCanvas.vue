<template>
    <div class="image-holder">
        <img ref="image" class="image" src="~/assets/images/demo_26.png"/>
        <img class="input" :src="`~/assets/images/${inputSrc}.png`"/>
    </div>
    <div class="menu-container">
      <InnerMenu>
        <Icon name="fluent:draw-image-20-regular" v-if="submode === 'hex'" @click="drawHexPattern()"></Icon>
        <Icon name="fluent:save-16-regular" @click="saveCanvas()"></Icon>
        <Icon name="grommet-icons:power-reset" @click="resetCanvas()"></Icon>
        <input type="color" @change="updateBgColor($event)">
        <div class="flex compact">
          <Icon name="fluent:zoom-in-16-regular" @click="zoomIn"></Icon>
          <Icon name="fluent:zoom-out-16-regular" @click="zoomOut"></Icon>
        </div>
        <div class="flex">
        </div>
        <div>

        </div>
      </InnerMenu>
    </div>

    <div class="shell">
      <div class="canvas-wrapper" 
      :height="canvasHeight" :width="canvasWidth"
      @drop.prevent="imageDrop($event)"
      @dragover.prevent
      >
        <canvas ref="canvas" class="canvas" :width="canvasWidth" :height="canvasHeight"
        :class="zoom">
        </canvas>
        <canvas ref="bgcanvas" class="bgcanvas" :width="canvasWidth" :height="canvasHeight"
        :class="zoom">
        </canvas>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { storeToRefs } from 'pinia';
import { nullCheck } from '~~/models/models';
import { useSave, useMerge } from '~~/composables/save';
import { useConfigStore } from '~~/stores/config';
import { useHex } from '~~/composables/hex';

const store = useConfigStore();
const { submode, bg } = storeToRefs(store);
const { canvasDimensions, updateImageDimensions, updateBgColor, imageDimensions } = useConfigStore()
const canvasWidth = computed(() => canvasDimensions.width * imageDimensions.width)
const canvasHeight = computed(() => canvasDimensions.height * imageDimensions.height)

const canvas: Ref <HTMLCanvasElement | null > = ref(null);
const bgcanvas: Ref <HTMLCanvasElement | null > = ref(null);
const ctx: Ref <CanvasRenderingContext2D | null > = ref(null);
const image = ref();
const zoomAmount = ref(3);
const inputSrc = ref('demo_26')

const imageDrop = (async(e: DragEvent) => {
  if (e.dataTransfer !== null && e.dataTransfer.files !== null) {
      const imageFile = validateImage([...e.dataTransfer.files]);
      const imageURL = URL.createObjectURL(imageFile);
      console.log(imageURL)
      const newImage = document.getElementsByClassName('input')[0] as HTMLImageElement;
      newImage.src = imageURL
      await nextTick();
        if (canvas.value !== null && newImage instanceof HTMLImageElement) {
        const { drawHexPatternNew } = useHex(canvas.value, newImage);
        drawHexPatternNew();
      } else {
        console.error('error in drawHexNew')
      }
  } else {
    console.warn('error in image drop')
  }
})

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

const zoomIn = (() => {
  if (zoomAmount.value < 10 && zoomAmount.value >= 0) {
    zoomAmount.value += 1;
  }
})

const zoomOut = (() => {
  if (zoomAmount.value <= 10 && zoomAmount.value > 1) {
    zoomAmount.value -= 1;
  }
})

const drawHexPattern = (() => {
  const image = document.getElementsByClassName('image')[0];
  // TBC move all null checks here, could pass in image as well(?)
  if (canvas.value !== null && image instanceof HTMLImageElement) {
    const { drawHexPatternNew } = useHex(canvas.value, image);
    drawHexPatternNew();
  } else {
    console.error('error in drawHexNew')
  }
})
 

const zoom = computed(() => {
  let output = 'transform-100'
  switch(zoomAmount.value) {
    case 10:
      output = 'transform-100'
      break;
    case 9: 
      output = 'transform-90'
      break;
    case 8:
      output = 'transform-80'
      break;
    case 7:
      output = 'transform-70'
      break;
    case 6:
      output = 'transform-60'
      break;
    case 5:
      output = 'transform-50'
    break;
    case 4:
      output = 'transform-40'
    break;
    case 3:
      output = 'transform-30'
    break;
    case 2:
      output = 'transform-20'
    break;
    case 1:
      output = 'transform-10'
    break;
  }
  return output;
})


const resetCanvas = (() => {
    if (ctx.value !== null && canvas.value !== null) { 
    ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
    } else {
      console.warn('problem in reset canvas finding ctx and/or canvas value')
    }
        updateImageDimensions(image.value.width, image.value.height)
})

const saveCanvas = (() => {
  let newURL;
  if (canvas.value !== null && bgcanvas.value !== null) {
    newURL = useMerge(bgcanvas.value, canvas.value)
    useSave('newdrawing', newURL) 
  } else {
    console.warn('error saving canvas as at least one canvas value was null')
  }
})

onMounted(async() => {
    image.value = document.getElementsByClassName('image')[0];
    console.log('on mounted' + image.value);
    const canvasCheck = nullCheck<HTMLCanvasElement>(canvas);
            if (canvasCheck.kind === 'success') {
                // TODO: look into this mysterious error message
                ctx.value = canvasCheck.value.getContext('2d') as CanvasRenderingContext2D;
            } else {
                console.error('CANVAS: is not null check passed but something else went wrong')
            }
        console.log('start Drawing')
        await nextTick()
        if (image.value instanceof HTMLImageElement) {
            updateImageDimensions(image.value.width, image.value.height)    
        } else {
                console.error('IMAGE: error loading image')
            }
        resetCanvas();
})
</script>

<style lang="scss">

.menu-container {
  width: max-content;
}

.image-holder {
    width: 400px;
    background: #ffd9d9;
    height: 400px;
    display: none;
}

.transform-100 {
  transform: scale(1);
}

.transform-90 {
  transform: scale(0.9);
}

.transform-80 {
  transform: scale(0.8);
}

.transform-70 {
  transform: scale(0.7);
}

.transform-60 {
  transform: scale(0.6);
}

.transform-50 {
  transform: scale(0.5);
}

.transform-40 {
  transform: scale(0.4);
}

.transform-30 {
  transform: scale(0.3);
}

.transform-20 {
  transform: scale(0.2);
}

.transform-10 {
  transform: scale(0.1);
}

.icon {
  font-size: 2rem;
}

.compact > .icon {
  padding: 0;
  padding-top: $xs;
}

.canvas-wrapper {
  position: relative;
}

.canvas, .bgcanvas {
  // background-color: azure;
  transform-origin: top left;
  position: absolute;
  top: 0;
  left: 0;
  background-color: transparent;
  // transform: scale(0.5);
  // position: absolute;
  // top: 0;
  // left: 0;
}

.canvas {
  z-index: 1;
}
</style>

