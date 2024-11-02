const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xaaaaaa, 1.0);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ 
    color: 0x00ccff, 
    roughness: 0.4, 
    metalness: 0.7 
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

const createStar = () => {
    const starGeometry = new THREE.Shape();
    const outerRadius = 0.2;
    const innerRadius = 0.1;
    const points = 5;

    starGeometry.moveTo(0, outerRadius);
    for (let i = 0; i < points; i++) {
        starGeometry.lineTo(Math.sin((i * 2 * Math.PI) / points) * innerRadius, Math.cos((i * 2 * Math.PI) / points) * innerRadius);
        starGeometry.lineTo(Math.sin(((i + 1) * 2 * Math.PI) / points) * outerRadius, Math.cos(((i + 1) * 2 * Math.PI) / points) * outerRadius);
    }

    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const starMesh = new THREE.Mesh(new THREE.ShapeGeometry(starGeometry), starMaterial);
    starMesh.rotation.z = Math.random() * Math.PI;

    return starMesh;
};

const starCount = 500;
for (let i = 0; i < starCount; i++) {
    const star = createStar();
    star.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
    );
    scene.add(star);
}

camera.position.z = 5;

const keys = {};
document.addEventListener('keydown', (event) => {
    keys[event.code] = true;
});
document.addEventListener('keyup', (event) => {
    keys[event.code] = false;
});

function animate() {
    requestAnimationFrame(animate);
    if (keys['ArrowUp']) camera.position.z -= 0.1;
    if (keys['ArrowDown']) camera.position.z += 0.1;
    if (keys['ArrowLeft']) camera.position.x -= 0.1;
    if (keys['ArrowRight']) camera.position.x += 0.1;
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

animate();
