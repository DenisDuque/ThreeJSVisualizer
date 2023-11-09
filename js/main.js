import * as THREE from 'three';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
const loader = new GLTFLoader();

scene.add(camera);
scene.background = new THREE.Color(0xAAAAAA);
camera.position.z = 5;
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);


console.log("Todo en orden");

loader.load('../src/3dmodels/blackVans.gltf', (gltf) => {
    // El modelo se cargó exitosamente

    // Accede al objeto 3D del modelo
    const model = gltf.scene;

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

// Inicia la animación
animate();
