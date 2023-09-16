<img src="https://raw.githubusercontent.com/stefangabos/zebrajs/master/docs/images/logo.png" alt="zebrajs" align="right">

# Zebra ClearInput &nbsp;[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=A+tiny+jQuery+plugin+for+enhancing+web+forms+by+allowing+users+to+easily+clear+values+in+text+input+boxes&url=https://github.com/stefangabos/Zebra_ClearInput&via=stefangabos&hashtags=jquery,javascript)

*A tiny jQuery plugin for enhancing web forms by allowing users to easily clear values in text input boxes*

[![npm](https://img.shields.io/npm/v/zebra_clearinput.svg)](https://www.npmjs.com/package/zebra_clearinput) [![Total](https://img.shields.io/npm/dt/zebra_clearinput.svg)](https://www.npmjs.com/package/zebra_clearinput) [![Monthly](https://img.shields.io/npm/dm/zebra_clearinput.svg)](https://www.npmjs.com/package/zebra_clearinput) [![](https://data.jsdelivr.com/v1/package/npm/zebra_clearinput/badge?style=rounded)](https://www.jsdelivr.com/package/npm/zebra_clearinput)  [![License](https://img.shields.io/npm/l/zebra_clearinput.svg)](https://github.com/stefangabos/Zebra_ClearInput/blob/master/LICENSE.md)

Zebra ClearInput is a lightweight jQuery plugin designed to enhance the usability of web forms by adding a user-friendly feature that allows users to effortlessly clear the content of input fields. This is achieved by attaching a small icon to input fields. When users click on this icon, it promptly erases any text that has been entered.

As soon as a user begins typing in the input field, the option to clear the input value becomes visible. Once the input field loses focus, the option to clear the value reappears when the mouse hovers over the input field.

## Features

 - it works out of the box and has (almost) no configuration options
 - it is really tiny - it weighs 1.4KB uncompressed and ~600 bytes gzipped
 - works in any browser - Firefox, Chrome, Safari, Edge, Opera and Internet Explorer 6+

## 🎂 Support the development of this project

Your support means a lot and it keeps me motivated to keep working on open source projects.<br>
If you like this project please ⭐ it by clicking on the star button at the top of the page.<br>
If you are feeling generous, you can buy me a coffee by donating through PayPal, or you can become a sponsor.<br>
Either way - **Thank you!** 🎉

[<img src="https://img.shields.io/github/stars/stefangabos/zebra_clearinput?color=green&label=star%20it%20on%20GitHub" width="132" height="20" alt="Star it on GitHub">](https://github.com/stefangabos/Zebra_ClearInput) [![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=NBM9XKB7XAB5L) [<img src="https://img.shields.io/badge/-Sponsor-fafbfc?logo=GitHub%20Sponsors">](https://github.com/sponsors/stefangabos)

## Demo

See the [demos](https://stefangabos.github.io/Zebra_ClearInput/)

## Requirements

Zebra ClearInput has no dependencies other than jQuery 1.7.0+

## Installation

Zebra ClearInput is available as a [npm package](https://www.npmjs.com/package/zebra_clearinput). To install it use:

```bash
# the "--save" argument adds the plugin as a dependency in packages.json
npm install zebra_clearinput --save
```

## How to use

First, load jQuery from a CDN and provide a fallback to a local source like:

```html
<script src="https://code.jquery.com/jquery-3.5.0.min.js"></script>
<script>window.jQuery || document.write('<script src="path/to/jquery-3.5.0.js"><\/script>')</script>
```

Load the Zebra ClearInput jQuery plugin:

```html
<script src="path/to/zebra_clearinput.min.js"></script>
```

Alternatively, you can load Zebra ClerInput from [JSDelivr CDN](https://www.jsdelivr.com/package/npm/zebra_clearinput) like this:

```html
<!-- for the most recent version, not recommended in production -->
<script
  src="https://cdn.jsdelivr.net/npm/zebra_clearinput@latest/dist/zebra_clearinput.min.js"></script>

<!-- for a specific version -->
<script
  src="https://cdn.jsdelivr.net/npm/zebra_clearinput@1.0.0/dist/zebra_clearinput.min.js"></script>

<!-- replacing "min" with "src" will serve you the non-compressed version -->
```

Load the style sheet file from a local source

```html
<link rel="stylesheet" href="path/to/zebra_clearinput.min.css">
```

...or from [JSDelivr CDN](https://www.jsdelivr.com/package/npm/zebra_clearinput)

```html
<!-- for the most recent version -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/zebra_clearinput@latest/dist/zebra_clearinput.min.css">

<!-- for a specific version -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/zebra_clearinput@1.0.0/dist/zebra_clearinput.min.css">

<!-- replacing "min" with "src" will serve you the non-compressed version -->
```

Now, within the DOM-ready event do

```javascript
$(document).ready(function() {

    // apply to all text input elements
    new $.Zebra_ClearInput('input[type=text]');

    // apply to certain text input elements
    new $.Zebra_ClearInput('input.myClass');

    // apply to all text input elements and
    // add the default CSS class name for the buttons and a custom one
    new $.Zebra_ClearInput('input[type="text"]', {
        button_class_name: 'Zebra_ClearInput myCustomStyles'
    });

});
```

## Configuration options

## Properties

<table width="100%">
    <thead>
    <tr>
        <th>Property</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td valign="top"><code>container_class_name</code></td>
        <td valign="top"><em>string</em></td>
        <td valign="top"><code>Zebra_ClearInput_Container</code></td>
        <td valign="top">The CSS class(es) to be applied to the container DIV that will wrap the target text input element</td>
    </tr>
    <tr>
        <td valign="top"><code>button_class_name</code></td>
        <td valign="top"><em>string</em></td>
        <td valign="top"><code>Zebra_ClearInput</code></td>
        <td valign="top">The CSS class(es) to be applied to the button associated with the text input element</td>
    </tr>
    </tbody>
</table>

## Methods

### `destroy()`

Removes a previously created instance of the plugin.

```javascript
// apply to all text input elements
var clearInput = new $.Zebra_ClearInput('input[type="text"]');

// remove plugin
clearInput.destroy();
```

## Sponsors

Cross browser/device testing is done with

[![BrowserStack](https://github.com/stefangabos/Zebra_Dialog/raw/master/examples/browserstack.png)](https://www.browserstack.com/)
