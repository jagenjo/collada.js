collada.js
==================

collada.js is a parser of collada format (DAE) in javascript. It parses the common geometry info like:

 * node properties (name, id)
 * transformation (matrix4x4) using glMatrix
 * geometry (vertices, normals, texture coords, skinning weights and matrix index, morph targets)
 * basic light and camera properties
 * scene structure (children)
 * basic material info (multimaterial not supported yet)
 * animation (only transformation animation)

Returns an object with all the info ready to use. The data arrays are in typed-arrays. The geometry is packed in indexed buffers ready to be uploaded to the GPU.

Due to the opennes of DAE every 3D authoring tool tends to exports data in a different way, thats why not all DAEs will work, but it has been tested with DAEs from Cinema4D, 3D Studio Max, Maya and Blender, although animation is still a problem with Cinema4D.

It can work in the main thread or inside a worker, but *it doesnt work in nodejs* (it relies in the XML capabilities of the browser).
It comes with its own function **Collada.loadInWorker** that does the HttpRequest and the parsing inside the worker to avoid blocking the main thread, and uses transferables when possible.
When using a worker you need to have installed the [XML for script](http://xmljs.sourceforge.net/) (supplied in the folder external/). Check the demo to see how to pass the relative folder to all the libraries to the worker.
It can be imported as a module.

Demo & Benchmark
-----------------
A demo is included in demo folder, you can [test it here](http://tamats.com/projects/collada/demo), drag any DAE to check the result.

Usage
-----

Include the library and dependencies
```html
<script src="js/gl-matrix-min.js"></script>
<script src="js/collada.js"></script>
```

Fetch the file and parse it:
```js
//callback receives one unic parameter with all the scene
Collada.load( "myfile.dae", callback ); 
```

Or if you already have the data and only want to parse it:
```js
var scene = Collada.parse( my_dae_data );
```


If you want to use a worker then you need to configure it:
```js
Collada.init({ dataPath: "../demo/", workerPath: "../src/", libsPath: "../external/" });
```

Where:
 * dataPath is the folder(path) where to fetch data when using XMLHttpRequest inside the worker
 * workerPath the folder where the collada.js is located
 * libsPath the folder where glmatrix and tinyxml libraries are located

Then
```js
Collada.loadInWorker("myfile.DAE", callback );
```

Or to parse only:
```js
Collada.parseInWorker( data, callback );
```


Feedback
--------

This has been tested with collada files exported from Cinema4D, Blender, Maya and 3DS Max, if you have one DAE that doesnt seem propertly supported, send it to me so I can see the differences.

You can write any feedback to javi.agenjo@gmail.com
