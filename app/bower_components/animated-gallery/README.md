# &lt;animated-gallery&gt;
##### Currently WIP  

This Polymer element displays an animated material design gallery (similar to the one shown [here](https://www.google.com/design/spec/components/grid-lists.html#)). Images are defined in an array with a `Title` and `Description` as well as the `URL`. Images are loaded using [iron-ajax](https://elements.polymer-project.org/elements/iron-ajax) and animations use [neon-animation](https://elements.polymer-project.org/elements/neon-animation).

## Demo

[Check it live!](http://JoeWells.github.io/animated-gallery)

## Install

Install the component using [Bower](http://bower.io/):

```sh
$ bower install animated-gallery --save
```

Or [download as ZIP](https://github.com/JoeWells/animated-gallery/archive/master.zip).

## Usage

1. Import polyfill:

    ```html
    <script src="bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
    ```

2. Import custom element:

    ```html
    <link rel="import" href="bower_components/animated-gallery/animated-gallery.html">
    ```

3. Start using it!  

    HTML:  
    ```html
    <animated-gallery id="myGallery"></animated-gallery>
    ```
    Javascript:
    ```js
    ready: function() {
      this.$.myGallery.images = {
        image1: {
          title: "Image 1",
          description: "This is my first image",
          url: "images/my-image.png"
        },
        image2: {
          title: "Image 2",
          description: "My second image",
          url: "images/my-image2.png"
        }
      }
    }
    ```

## Options

Attribute         | Options     | Default      | Description
---               | ---         | ---          | ---
`images`          | *Array*     | `null`       | An array containing the file path and details of images to show in the gallery (See above)
`enable-animation`|*bool*       |`true`        |Specifies whether to enable animation for the gallery or not

## Methods

Method           | Parameters                              | Returns     | Description
---              | ---                                     | ---         | ---
`openImage()`    | Name of the image as defined in `images`| Nothing     | Opens an image to the foreground as if a user had clicked on it
`hideImage()`    | None                                    | Nothing     | Hides any open image

## Events

Event         | Description
---           | ---
`onImageOpen` | Triggers when an image is opened
`onImageClose`| Triggers when an image is closed

## History

For detailed changelog, check [Releases](https://github.com/JoeWells/animated-gallery/releases).

## License

[MIT License](http://opensource.org/licenses/MIT)
