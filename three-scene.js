import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let scene, camera, renderer, particles, clock;
let currentParticleColor = 0xff3344; // Default Red

export function initThree() {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    // 1. Scene & Camera
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xffffff, 0.05);

    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 1, 5);

    // 2. Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xffffff, 1);
    container.appendChild(renderer.domElement);

    // 3. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const mainLight = new THREE.PointLight(currentParticleColor, 10, 20);
    mainLight.position.set(2, 3, 4);
    scene.add(mainLight);

    const topLight = new THREE.DirectionalLight(0xffffff, 1);
    topLight.position.set(0, 10, 0);
    scene.add(topLight);

    // 4. Particles (Flowing Stream)
    const particleCount = 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 15; // X
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10; // Y
        positions[i * 3 + 2] = (Math.random() - 0.5) * 15; // Z
        velocities[i] = Math.random() * 0.02 + 0.01;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.03,
        color: currentParticleColor,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 5. Floor (Reflective Look - Light)
    const floorGeo = new THREE.PlaneGeometry(50, 50);
    const floorMat = new THREE.MeshStandardMaterial({ 
        color: 0xf5f5f5,
        roughness: 0.1,
        metalness: 0.5
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1;
    scene.add(floor);

    // 6. Grid Helper (Subtle red tech feel)
    const grid = new THREE.GridHelper(40, 40, 0xff3344, 0xeeeeee);
    grid.position.y = -0.99;
    grid.material.opacity = 0.5;
    grid.material.transparent = true;
    scene.add(grid);

    // 7. Dummy Car Shape (Representing SMK Car)
    const carGeo = new THREE.BoxGeometry(2, 0.5, 4);
    const carMat = new THREE.MeshStandardMaterial({ 
        color: 0x111111,
        roughness: 0.2,
        metalness: 0.8
    });
    const car = new THREE.Mesh(carGeo, carMat);
    scene.add(car);

    // 8. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;

    clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const delta = clock.getDelta();
        
        // Particle motion
        const posArray = geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
            posArray[i * 3 + 2] += velocities[i];
            if (posArray[i * 3 + 2] > 7) posArray[i * 3 + 2] = -7;
        }
        geometry.attributes.position.needsUpdate = true;

        particles.rotation.y += 0.001;
        car.rotation.y += 0.002;

        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

export function updateParticleColor(color) {
    currentParticleColor = color;
    if (particles) {
        particles.material.color.setHex(color);
    }
    scene.traverse((child) => {
        if (child instanceof THREE.PointLight) {
            child.color.setHex(color);
        }
    });
}

