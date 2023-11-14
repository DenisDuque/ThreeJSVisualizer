import * as THREE from 'three';
import { ArcballControls } from '../node_modules/three/examples/jsm/controls/ArcballControls.js';
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from '../node_modules/three/examples/jsm/environments/RoomEnvironment';
import { GUI } from 'dat.gui';
var camera, scene, renderer, controls, directionalLight, model, modelCopy;
function init() {
    // Creates new Scene
    scene = new THREE.Scene();

    const texture = new THREE.TextureLoader().load("../src/img/gradientBackground.png");
    scene.background = texture; // Customize background color as preference

    // Creates new Camera [PerspectiveCamera(fov, aspect, near, far)]
    camera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 0.1, 1000); // Customize as preference
    camera.position.z = 1; // How far the camera is from the object
    // Creates new Render
    renderer = new THREE.WebGLRenderer();
    // Set render size
    renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8); // Customize as preference
    renderer.shadowMap.enabled = true; // Enable shadows
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Shadow type 
    renderer.toneMapping = THREE.ACESFilmicToneMapping; // Shadow effect
    renderer.toneMappingExposure = 1; // Shadow exposure
    // Where the rendered model is shown
    document.getElementById("canvasContainer").appendChild(renderer.domElement); // Change 'canvas-container' for your html element id you want to show your model 
    /* Note: make sure you change css for applaying the same styles to the new object */
    
    // Adding controls to the objects
    controls = new ArcballControls(camera, renderer.domElement);
    controls.enablePan = false; // Disabled moving the object with right click
    controls.enableDamping = true; // Enables damping (inertia) when rotate objects
    controls.dampingFactor = 100; // Inertia of the object [Note: Required update controls for this feature]
    /*
    controls.minPolarAngle = 1; // Unable rotate the model vertically
    controls.maxPolarAngle = 1; // Unable rotate the model vertically
    */
    controls.minDistance = 13 ; // Minimum distance you can zoom in
    controls.maxDistance = 13; // Minimum distance you can zoom out
    controls.update(); // [Required] Update the controls after changes 
    
    // Adding environment on the scene to see the rendered model
    var environment = new RoomEnvironment(); // Create new environment
    const pmremGenerator = new THREE.PMREMGenerator( renderer ); // Adds the environment on the scene
    scene.environment = pmremGenerator.fromScene( environment ).texture; // Adds the textures that the environment creates on the scene
    pmremGenerator.dispose(); // Optimize the render
  
    /* Uncomment if want axes in models for tracking position */
    
    // Adding axes for model position [XYZ]
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
  
    // Custom color axes
    const colorRed = new THREE.Color(0xFF0000);
    const colorBlue = new THREE.Color(0x0000FF);
    const colorGreen = new THREE.Color(0x00FF00);
    // Setting the colors
    axesHelper.setColors(colorRed, colorBlue, colorGreen );


    // Adding ambient lights on the scene
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Create Abient Lights
    scene.add(ambientLight); // Add to the scene
    
    // Adding directional light
    directionalLight = new THREE.DirectionalLight(0xffffff, 2); // Create Directional Light
    directionalLight.position.set(5, 10, 7); // Set position where the light is coming from
    directionalLight.castShadow = true; // Enable make shadow
    directionalLight.shadow.mapSize.width = 1024; // Shadow size
    directionalLight.shadow.mapSize.height = 1024; // Shadow size
    directionalLight.shadow.camera.top = 10; // Shadow camera top position
    directionalLight.shadow.camera.bottom = -10; // Shadow camera bottom position
    directionalLight.shadow.camera.left = -10; // Shadow camera left position
    directionalLight.shadow.camera.right = 10; // Shadow camera right position
    scene.add(directionalLight); // Adding the directional lights on the scene

    const gui = new GUI({ autoPlace: false });
    gui.domElement.id = 'gui';
    gui.domElement.style.borderRadius = '2vh';
    document.getElementById("canvasContainer").appendChild(gui.domElement);
    const cameraFolder = gui.addFolder('Camera');
    let cameraControls = {
        perspectiveView: function () {
          // Mueve la cámara a una nueva posición
          model.rotation.set(45, -45, 0);
          console.log(camera.position);
          camera.position.set(0, 0, 0);
          console.log(camera.position);
          controls.reset();
        }
      };
    cameraFolder.add(cameraControls, 'perspectiveView').name('Perspective View');
}

const loader = new GLTFLoader();

loader.load('../src/3dmodels/blackVans.gltf', (gltf) => {
    // El modelo se cargó exitosamente

    // Accede al objeto 3D del modelo
    model = gltf.scene;

    // Ajusta la posición, escala, rotación, etc., según sea necesario
    model.position.set(0, 0, 0);
    model.scale.set(1, 1, 1);

    // Añade el modelo a la escena
    scene.add(model);
}, undefined, (error) => {
    // Ocurrió un error al cargar el modelo
    console.error('Error al cargar el modelo GLTF', error);
});

function animate() {
    requestAnimationFrame(animate);

    // Actualiza los controles en cada cuadro
    controls.update();

    // Renderiza la escena
    renderer.render(scene, camera);
}

// Buttons
document.addEventListener('DOMContentLoaded', function() {
    function flipObject(obj) {
        const scale = new THREE.Vector3(1, 1, 1);
        scale.z *= -1;
        obj.scale.multiply(scale);
    }
    

    function showBoth() {
        modelCopy = model.clone(true);
        flipObject(model);
        scene.add(modelCopy);
        model.position.set(0, 0, 0.5);
        modelCopy.position.set(0, 0, -0.5);
    }
    
    function resetFlipModel() {
        model.position.set(0, 0, 0);
        scene.remove(modelCopy);
    }

    var flipCont = 0;
    var flipBtn = document.getElementById('flipBtn');
    flipBtn.addEventListener('click', function() {
        
        switch (flipCont) {
            case 0:
                flipObject(model);
                break;

            case 1:
                showBoth();
                break;
                
            case 2:
                resetFlipModel();
                break;

            default:
                break;
        }
        flipCont = (flipCont + 1) % 3;
    });

    var resetBtn = document.getElementById('resetBtn');
    resetBtn.addEventListener('click', function() {
        resetBtn.style.transition = 'transform 0.8s ease';
        resetBtn.style.transform = "rotate(360deg)";
        setTimeout(function() {
            resetBtn.style.transition = 'transform 0s ease';
            resetBtn.style.transform = "rotate(0deg)";
            resetBtn.style.transition = 'scale 0.8s ease';
        }, 800);
        if (flipCont == 1) {
            flipObject(model);
        } else if (flipCont == 2) {
            resetFlipModel();
        }
        flipCont = 0;
        model.position.set(0, 0, 0);
    });
});

// Start functions
init();
animate();