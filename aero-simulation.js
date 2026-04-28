
import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js';

class AeroSimulation {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.clock = new THREE.Clock();
        this.particles = null;
        this.vortexParticles = null;
        this.car = null;
        this.activePoint = 0;
        this.loading = true;

        this.init();
    }

    init() {
        // Setup Renderer
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;
        this.container.appendChild(this.renderer.domElement);

        // Camera cinematic entrance
        this.camera.position.set(-20, 10, 20);
        gsap.to(this.camera.position, {
            x: -8, y: 3, z: 10,
            duration: 3,
            ease: "expo.out",
            delay: 0.5
        });

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 100);
        pointLight.position.set(5, 5, 5);
        this.scene.add(pointLight);

        const topRedLight = new THREE.PointLight(0xd71920, 80, 15);
        topRedLight.position.set(0, 5, 0);
        this.scene.add(topRedLight);

        // Grid / Ground
        const grid = new THREE.GridHelper(50, 50, 0x333333, 0x111111);
        grid.position.y = -1.05;
        this.scene.add(grid);

        // Load Car Model
        const loader = new GLTFLoader();
        loader.load('ferrari-f80.glb', (gltf) => {
            this.car = gltf.scene;
            this.car.scale.set(1.5, 1.5, 1.5);
            this.car.position.y = -1;
            this.scene.add(this.car);

            this.car.traverse(child => {
                if (child.isMesh) {
                    // Premium Metallic Paint Logic
                    if (child.name.toLowerCase().includes('body') || child.name.toLowerCase().includes('paint')) {
                        child.material.color.setHex(0xd71920);
                        child.material.metalness = 1.0;
                        child.material.roughness = 0.08;
                        child.material.envMapIntensity = 2.0;
                    }
                    if (child.name.toLowerCase().includes('glass') || child.name.toLowerCase().includes('window')) {
                        child.material.transparent = true;
                        child.material.opacity = 0.4;
                        child.material.roughness = 0;
                    }
                    if (child.name.toLowerCase().includes('carbon')) {
                        child.material.color.setHex(0x111111);
                        child.material.roughness = 0.1;
                    }
                }
            });
            this.loading = false;
        });

        // Flow Particles
        this.createParticles();
        this.createVortex();

        // Controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.enableZoom = false;
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 0.2;

        // UI Overlay inside Container
        this.addHelpText();

        this.animate();

        window.addEventListener('resize', () => this.onResize());
    }

    addHelpText() {
        const div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.bottom = '30px';
        div.style.left = '30px';
        div.style.color = 'rgba(255,255,255,0.4)';
        div.style.fontSize = '10px';
        div.style.textTransform = 'uppercase';
        div.style.letterSpacing = '0.2em';
        div.style.pointerEvents = 'none';
        div.innerHTML = 'Aero Visualization Active • Draggable Simulation';
        this.container.appendChild(div);
    }

    createParticles() {
        const count = 2000;
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(count * 3);
        const vel = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 12;
            pos[i * 3 + 1] = (Math.random() * 2) - 0.5;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
            vel[i] = Math.random() * 0.1 + 0.05;
        }

        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        const mat = new THREE.PointsMaterial({
            size: 0.03,
            color: 0xffffff,
            transparent: true,
            opacity: 0.3,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(geo, mat);
        this.scene.add(this.particles);
    }

    createVortex() {
        // Subtle ground effect vortex simulation
        const count = 500;
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(count * 3);
        
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 4;
            pos[i * 3 + 1] = -0.99;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
        }

        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        const mat = new THREE.PointsMaterial({
            size: 0.05,
            color: 0xd71920,
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending
        });

        this.vortexParticles = new THREE.Points(geo, mat);
        this.vortexParticles.visible = false;
        this.scene.add(this.vortexParticles);
    }

    updateParticles() {
        if (!this.particles) return;
        const posAttr = this.particles.geometry.attributes.position;
        const arr = posAttr.array;

        for (let i = 0; i < arr.length / 3; i++) {
            arr[i * 3 + 2] += 0.2; // Move in Z direction

            // Obstacle logic based on car position
            const x = arr[i * 3];
            const y = arr[i * 3 + 1];
            const z = arr[i * 3 + 2];

            if (Math.abs(z) < 4 && Math.abs(x) < 2 && Math.abs(y) < 1.2) {
                arr[i * 3] += (x > 0 ? 0.08 : -0.08);
                arr[i * 3 + 1] += 0.05;
            }

            if (arr[i * 3 + 2] > 10) arr[i * 3 + 2] = -10;
        }
        posAttr.needsUpdate = true;

        if (this.vortexParticles && this.vortexParticles.visible) {
            const vPosAttr = this.vortexParticles.geometry.attributes.position;
            const vArr = vPosAttr.array;
            const time = performance.now() * 0.002;
            for (let i = 0; i < vArr.length / 3; i++) {
                vArr[i * 3] += Math.sin(time + i) * 0.02;
                vArr[i * 3 + 2] += 0.1;
                if (vArr[i * 3 + 2] > 3) vArr[i * 3 + 2] = -3;
            }
            vPosAttr.needsUpdate = true;
        }
    }

    focusFeature(index) {
        this.controls.autoRotate = false;
        const targets = [
            { pos: { x: -8, y: 3, z: 10 }, vortex: false },     // Overview
            { pos: { x: -4, y: 2, z: 4 }, vortex: false },      // Cooling
            { pos: { x: 0, y: 4.5, z: 3 }, vortex: false },    // S-Duct
            { pos: { x: 8, y: 0.2, z: 0 }, vortex: true },      // Ground Effect
            { pos: { x: 0, y: 2.5, z: -8 }, vortex: false }     // Rear Wing
        ];

        const target = targets[index] || targets[0];
        
        gsap.to(this.camera.position, {
            x: target.pos.x,
            y: target.pos.y,
            z: target.pos.z,
            duration: 1.5,
            ease: "power2.inOut"
        });

        this.vortexParticles.visible = target.vortex;
    }

    onResize() {
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.updateParticles();
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

window.AeroSimulation = AeroSimulation;

// Global reveal to access from HTML
window.AeroSimulation = AeroSimulation;
