import './style.css'
import * as THREE from 'three';
import { AmbientLight } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

console.log('hi');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer({
	canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);



setTimeout(() => {
	// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add(listener);

// create a global audio source
const sound = new THREE.Audio(listener);

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load('audio/space.ogg', function (buffer) {
	sound.setBuffer(buffer);
	sound.setLoop(true);
	sound.setVolume(0.5);
	sound.play();
});
}, 3000);

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0x404040)
scene.add(pointLight, ambientLight)

//Helpers
// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// const controls = new OrbitControls(camera, renderer.domElement);
// scene.add(lightHelper, gridHelper)


function addStar() {
	const geometry = new THREE.OctahedronGeometry(0.6)
	const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
	const star = new THREE.Mesh(geometry, material)

	const [x, y, z] = Array(3).fill()
		.map(() => THREE.MathUtils.randFloatSpread(150));

	star.position.set(x, y, z);
	scene.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('space-1.jpg');
scene.background = spaceTexture;

//Avatar
const danilTexture = new THREE.TextureLoader().load('ava.jpg');
const danil = new THREE.Mesh(
	new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: danilTexture })
)
scene.add(danil)

//Abama
const abamaTexture = new THREE.TextureLoader().load('abama.jpg');

const abama = new THREE.Mesh(
	new THREE.SphereGeometry(3, 32, 32),
	new THREE.MeshStandardMaterial({ map: abamaTexture, })
)
scene.add(abama)


abama.position.z = 35;
abama.position.setX(-10);

danil.position.z = -5;
danil.position.x = 2;

// Scroll Animation

function moveCamera() {
	const t = document.body.getBoundingClientRect().top;
	abama.rotation.y += 0.075;

	danil.rotation.y += 0.01;
	danil.rotation.z += 0.01;

	camera.position.z = t * -0.01;
	camera.position.x = t * -0.0002;
	camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
	requestAnimationFrame(animate);

	// controls.update();

	abama.rotation.y += 0.002;
	renderer.render(scene, camera);
}
animate();
