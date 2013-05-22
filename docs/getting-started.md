# [ Documentation ]( readme.md ) / Getting Started

## Including RecoilJS

First, you're going to want to download [ recoil.js ]( ../recoil.js ) or [ recoil.min.js ]( ../recoil.min.js ) from the [ root ]( ../ ).  Once you have the JavaScript file, you can include it in your page one of two ways:

1. Include the file in a standard script tag: ```<script src="recoil.js"></script>```
2. Include the file with RequireJS: ```require( [ 'recoil' ], function ( Recoil ) { ... } );```

For the purposes of getting started, I'm going to assume the first method.

## HTML Setup

Setting up your HTML file is pretty easy, and only requires that you add an attribute identifying where you would like your app to be rendered.

Sample HTML Document:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>RecoilJS Sample</title>
  </head>
  <body>
    <!-- data-app identifies your app -->
    <div id="site-wrapper" data-app="sample"></div>
    
    <!-- include dependencies -->
    <script src="jquery.js"></script>
    <script src="coffee-script.js"></script>
    <!-- include recoil.js -->
    <script src="recoil.js"></script>
    <!-- include your app -->
    <script src="app.js"></script>
  </body>
</html>
```

The important part to note here is ```div#site-wrapper``` - specifically, this part: ```data-app="sample"```.  This identifies your app for RecoilJS to initialize.

