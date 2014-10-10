collada.js
==================

collada.js is a parser of collada format (DAE) in javascript. It parses the common geometry info like:

 * transformation (matrix4x4) using glMatrix
 * geometry (vertices, normals, texture coords, skinning weights and matrix index, morph targets)
 * scene structure (children)
 * basic material info
 * animation (only transformation animation)

Returns an object with all the info ready to use. The data arrays are in typed-arrays.

It can work in the main thread or inside a worker (it comes with its own function Collada.loadInWorker that does the HttpRequest and the parsing inside the worker to avoid blocking the main thread).
When using a worker you need to have installed the [XML for script](http://xmljs.sourceforge.net/). Check the demo to see how to pass the relative folder to all the libraries to the worker.

Demo & Benchmark
-----------------
A demo is included in demo folder, you can [test it here](http://tamats.com/projects/collada/demo)

Usage
-----

Include the library and dependencies
```html
<script src="js/gl-matrix-min.js"></script>
<script src="js/collada.js"></script>
```

Fetch the file and parse it:
```js
Collada.load( "myfile.dae", callback );
```

If you want to use a worker then:
```js
Collada.init({ dataPath: "../demo/", workerPath: "../src/", libsPath: "../external/" });
```

Where:
 * dataPath is the root node where to fetch the data when doing XMLHttpRequest
 * workerPath the folder where the collada.js is located
 * libsPath the folder where the xml parsing libraries are located

Then
```js
Collada.loadInWorker("myfile.DAE", callback );
```


Feedback
--------

You can write any feedback to javi.agenjo@gmail.com
