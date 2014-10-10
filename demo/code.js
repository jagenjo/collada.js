var start_time = 0;

var log = function(msg, root)
{
	root = root || document.body;
	var e = document.createElement("p");
	e.innerHTML = msg;
	root.appendChild(e);
	return e;
}

function showNodeInfo( node, root )
{
	root = root || document.body;
	var e = document.createElement("div");
	root.appendChild(e);

	var info = "";
	if(node.mesh)
		info = " Mesh: <span class='id2'>" + node.mesh + "</span>";
	if(node.light)
		info += " Light: " + node.light.type;
	if(node.material)
		info += " Material: <span class='id2'>" + node.material + "</span>";


	log("NODE: <span class='id'>" + (node.id || "") + "</span> " + info, e);

	for(var i in node.children)
	{
		var child = node.children[i];
		showNodeInfo( child, e );
	}
}

function showSceneInfo(scene)
{
	scene.root.id = "root";
	log("Load and parsing time: " + ((Date.now() - start_time) * 0.001).toFixed(2) + " seconds");
	log("Check javascript console for complete info");
	console.log(scene);
	log("<h2>SCENE</h2>");
	showNodeInfo( scene.root );
	log("<h2>RESOURCES</h2>");
	for(var i in scene.resources )
	{
		var res = scene.resources[i];
		var info = "";
		switch(res.object_type)
		{
			case "Material": info = "Color: " + res.color[0].toFixed(2) + "," + res.color[1].toFixed(2) + "," + res.color[2].toFixed(2); break;
			case "Mesh": info = "Num. Vertices: " + res.vertices.length / 3; break;
		}

		log("<li><span class='id2'>" + i + "</span>: <span class='type'>" + res.object_type + "</span> " + info + "</li>");
	}
}

function init()
{
	Collada.init({ forceParser:true,  dataPath: "../demo/", workerPath: "../src/", libsPath: "../external/" });
	log("Drag any file to the website to import it");
	log("Loading DAE file...");
	start_time = Date.now();
	Collada.load("teapots.DAE", showSceneInfo );


	//droping files 
	var container = document.body;
	container.ondragover = function () { console.log('hover'); return false; };
	container.ondragend = function () { console.log('out'); return false; };
	container.ondrop = function (e) {
		e.preventDefault();

		var file = e.dataTransfer.files[0];
		var filename = file.name;
		var ext = filename.substr(-3).toLowerCase();

		document.body.innerHTML = "";
		var elem = log("Filename: <strong>" + filename + "</strong>  Size: " + (file.size / 1024).toFixed(2) + " KBs");
		start_time = Date.now();
		var elem = log("Parsing...");
		var timer = setInterval( function() { elem.innerHTML = "Parsing... " + ((Date.now() - start_time) * 0.001).toFixed(2) + " seconds"; }, 1000/60 );

		//prepare reader
		var reader = new FileReader();
		reader.onload = function (event) {
			//console.log(event.target);
			var data = event.target.result;

			if(0)
			{
				onParsed( Collada.parse( data ) );
			}
			else
			{
				Collada.parseInWorker( data, onParsed );
			}
		};

		function onParsed(scene)
		{
			clearInterval(timer);
			scene.filename = filename;
			showSceneInfo(scene);
		}

		//read data
		var type = file.type.split("/")[0];
		reader.readAsText(file);

		return false;
	};
}



init();