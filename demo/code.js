var log = function(msg, root)
{
	root = root || document.body;
	var e = document.createElement("p");
	e.innerHTML = msg;
	root.appendChild(e);
}

function showNodeInfo( node, root )
{
	root = root || document.body;
	var e = document.createElement("div");
	root.appendChild(e);

	log("NODE: " + (node.id || "") + " | MESH: " + (node.mesh || "NO"), e);

	for(var i in node.children)
	{
		var child = node.children[i];
		showNodeInfo( child, e );
	}
}

function init()
{
	Collada.init({ dataPath: "../demo/", workerPath: "../src/", libsPath: "../external/" });
	log("Loading DAE file...");
	Collada.loadInWorker("teapots.DAE", function(scene){
		log("Result DAE (check javascript console)");
		console.log(scene);
		log("SCENE:");
		showNodeInfo( scene.root );
		log("RESOURCES:");
		for(var i in scene.resources )
		{
			var res = scene.resources[i];
			log( i + " : " + res.object_type + "  Num. Vertices: " + res.vertices.length / 3);
		}
	});
}



init();