# Patternate

Generate tesselated patterns from hand-drawn images.

## Demo

It currently works with three patterns. 

### Hex
Uses an equilateral triangle to generate an image of tessalating hexagons.

Input image: <br />
<img src="assets/demo/demo_input.png" alt="demo hex input image" />

Generated Pattern: <br />
<img src="assets/demo/demo_output.png" alt="demo hex output image" />

### Hex Outer
Tiles a triangular shape around a hexagon.

Input image: <br />
<img src="assets/demo/demo_hex_outer_input.png" alt="demo hex outer input image" />

Generated Pattern: <br />
<img src="assets/demo/demo_hex_outer_output.png" alt="demo hex outer output image" />

### Rectangle
Tiles any rectangular image.

Input image: <br />
<img src="assets/demo/demo_rect_input.png" alt="demo rectangle input image" />

Generated Pattern: <br />
<img src="assets/demo/demo_rect_output.png" alt="demo rectangle output image" />

## Guide Mode
The guide mode generates a template which can be used as a layer mask when creating images.

## Usage

- clone the repo
- upload your input image to the /assets/images folder
- add your input image in place of the demo image, or drag and drop the image to the canvas
```
// HexCanvas.vue
    <div class="image-holder">
        <img ref="image" class="image" src="~/assets/images/patternate_demo.png"/>
    </div>
```
- use the inputs on the menu to specify the height and width of your pattern, then click on the save icon

## Coming Soon

~~- improved interface~~<br/>
~~- add a background colour to patterns with transparency~~
~~- drag and drop image upload~~
- more pattern modes

## Contributions

Contributions welcome!
