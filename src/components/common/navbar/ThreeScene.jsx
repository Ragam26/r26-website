"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function ThreeScene() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#1a1a1a");

        const camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        scene.add(new THREE.AmbientLight(0xffffff,0.25));

        const keyLight = new THREE.DirectionalLight(0xffffff, 0.5);
        keyLight.position.set(2.5, 10, 10);
        scene.add(keyLight);

        const loader = new GLTFLoader();
        let model;

        loader.load("models/model2.glb", (gltf) => {
            model = gltf.scene;
            scene.add(model);
            camera.position.z = 2;
        })

        let mouseX = 0;
        let mouseY = 0;

        const onMouseMove = (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener("mousemove", onMouseMove);

        function animate() {
            requestAnimationFrame(animate);

            if (model) {
                model.rotation.y += (mouseX * 0.3 - model.rotation.y) * 0.05;
                model.rotation.x += (-mouseY * 0.05 - model.rotation.x) * 0.05;
            }

            renderer.render(scene, camera);
        }

        animate();

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            renderer.dispose();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full"
        />
    )
}