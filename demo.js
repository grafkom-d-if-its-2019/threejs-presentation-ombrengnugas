var scene, camera, renderer, mesh;
var meshFloor, ambientLight, light;

var crate, crateTexture, crateNormalMap, crateBumpMap;

var keyboard = {};
var player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };
var USE_WIREFRAME = false;

function init(){
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(90, 1280/720, 0.1, 1000);
	
	mesh = new THREE.Mesh(
		new THREE.BoxGeometry(1,1,1),
		new THREE.MeshPhongMaterial({color:0xff4444, wireframe:USE_WIREFRAME})
	);
	mesh.position.y += 1;
	mesh.receiveShadow = true;
	mesh.castShadow = true;
	//scene.add(mesh);

	//lightmap(lm)
	var lm = new THREE.TextureLoader().load("lightmap/lm-1.png");
	var dfloor = new THREE.TextureLoader().load("anothercrate0/front.png")
	meshFloor = new THREE.Mesh(
		new THREE.PlaneGeometry(20,20, 10,10),
		new THREE.MeshPhongMaterial(
			{
				color:0xffffff, 
				wireframe:USE_WIREFRAME, 
				lightMap: lm,
				map : dfloor
			})
	);
	meshFloor.rotation.x -= Math.PI / 2;
	meshFloor.receiveShadow = true;
	scene.add(meshFloor);
	
	//sphere mantul
	//var sphere1 = createMesh(new THREE.SphereGeometry(10, 15, 15));
      //  sphere1.material.envMap = dfloor;
      //  sphere1.rotation.y = -0.5;
      //  sphere1.position.x = 12;
      //  sphere1.position.y = 5;
      //  scene.add(sphere1);

	ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
	scene.add(ambientLight);
	
	light = new THREE.PointLight(0xffffff, 0.8, 18);
	light.position.set(-3,6,-3);
	light.castShadow = true;
	light.shadow.camera.near = 0.1;
	light.shadow.camera.far = 25;
	scene.add(light);
	
	//for cube map
	//var webGLRenderer = new THREE.WebGLRenderer();
	//webGLRenderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
	//webGLRenderer.setSize(window.innerWidth, window.innerHeight);
	//webGLRenderer.shadowMapEnabled = false;
	//webGLRenderer.autoClear = false;

	//var textureCube = createCubeMap();
     //   var shader = THREE.ShaderLib["cube"];
      //  shader.uniforms["tCube"].value = textureCube;
       // var material = new THREE.ShaderMaterial({
        //    fragmentShader: shader.fragmentShader,
         //   vertexShader: shader.vertexShader,
          //  uniforms: shader.uniforms,
         //   depthWrite: false,
          //  side: THREE.BackSide
	//	});
	//	cubeMesh = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 100), material);
      //  sceneCube.add(cubeMesh);
		
	//	function createCubeMap() {

    //        var path = "..anothercrate0/";
    //        var format = '.png';
     //       var urls = [
     //           path + 'left' + format, path + 'right' + format,
     //           path + 'posy' + format, path + 'negy' + format,
     //           path + 'posz' + format, path + 'negz' + format
     //       ];

//        var textureCube = THREE.ImageUtils.loadTextureCube( urls );
       //     var textureCube = THREE.ImageUtils.loadTextureCube(urls, new THREE.CubeReflectionMapping());
         //   return textureCube;
      //  }

	// Texture Loading
	var textureLoader = new THREE.TextureLoader();
	crateTexture = textureLoader.load("crate0/crate0_diffuse.png");
	crateBumpMap = textureLoader.load("crate0/crate0_bump.png");
	crateNormalMap = textureLoader.load("crate0/crate0_normal.png");
	earthTexture = textureLoader.load("earth0/earthmap1k.png");
	earthBumpMap = textureLoader.load("earth0/earthbump1k.png");
	earthNormalMap = textureLoader.load("earth0/earthspec1k.png");
	
	//another crate
	//var anotherGeometry = new THREE.BoxGeometry(3, 3, 3);
	//var anotherMaterials =
	//[
	//new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load("anothercrate0/right.png"), side : THREE.DoubleSide }),
	//new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load("anothercrate0/left.png"), side : THREE.DoubleSide }),
	//new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load("anothercrate0/top.png"), side : THREE.DoubleSide }),
	//new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load("anothercrate0/bottom.png"), side : THREE.DoubleSide }),
	//new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load("anothercrate0/front.png"), side : THREE.DoubleSide }),
	//new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load("anothercrate0/back.png"), side : THREE.DoubleSide })
	//];
	//var material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true } );
	//var anotherCrate = new THREE.Mesh( anotherGeometry, material);
	//scene.add(anotherCrate);

	// Create mesh with these textures
	crate = new THREE.Mesh(
		new THREE.BoxGeometry(3,3,3),
		new THREE.MeshPhongMaterial({
			color:0xffffff,
			
			map:crateTexture,
			bumpMap:crateBumpMap,
			normalMap:crateNormalMap
		})
	);

	// Create earth mesh
	earth = new THREE.Mesh(
		new THREE.SphereGeometry(2,32,32),
		new THREE.MeshPhongMaterial({
			color:0xffffff,

			map:earthTexture,
			bumpMap:earthBumpMap,
			specularMap:earthNormalMap
		})
	);

	scene.add(crate);

	crate.position.set(2.5, 3/2, 2.5);
	crate.receiveShadow = true;
	crate.castShadow = true;
	
	scene.add(earth);

	earth.position.set(-5, 5, 2);
	earth.receiveShadow = true;
	earth.castShadow = true;

	//anotherCrate.position.set(4, 3/2, -4);
	//anotherCrate.receiveShadow = true;
	//anotherCrate.castShadow = true ;
	
	camera.position.set(0, player.height, -5);
	camera.lookAt(new THREE.Vector3(0,player.height,0));
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(1280, 720);

	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.BasicShadowMap;
	
	document.body.appendChild(renderer.domElement);
	
	animate();
}

function animate(){
	requestAnimationFrame(animate);
	
	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;
	crate.rotation.y += 0.01;
	earth.rotation.y += 0.01;
	
	if(keyboard[87]){ // W key
		camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
		camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
	}
	if(keyboard[83]){ // S key
		camera.position.x += Math.sin(camera.rotation.y) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
	}
	if(keyboard[65]){ // A key
		camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * player.speed;
	}
	if(keyboard[68]){ // D key
		camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
	}
	
	if(keyboard[37]){ // left arrow key
		camera.rotation.y -= player.turnSpeed;
	}
	if(keyboard[39]){ // right arrow key
		camera.rotation.y += player.turnSpeed;
	}
	
	renderer.render(scene, camera);
}

function keyDown(event){
	keyboard[event.keyCode] = true;
}

function keyUp(event){
	keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

window.onload = init;
