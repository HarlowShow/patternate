# Patternate

Generate tesselated patterns from hand-drawn images.

## Demo

It currently works with two patterns. The first uses an equilateral triangle to generate an image of tessalating hexagons. The second simply tiles any rectangular image. The guide mode generates a template which can be used as a layer mask when creating images.

Input image: <br />
<img src="assets/demo/demo_input.png" alt="demo input image" />

Generated Pattern: <br />
<img src="assets/demo/demo_output.png" alt="demo output image" />

## Usage

- clone the repo
- upload your input image to the /assets/images folder
- add your input image in place of the demo image:
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
- drag and drop image upload
- more pattern modes

## Contributions

Contributions welcome!
