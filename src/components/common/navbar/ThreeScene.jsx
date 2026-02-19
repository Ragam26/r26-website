"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const config = {
  canvasBg: "#0a0a0a",
  modelPath: "models/modelTexutre.glb",
  metalness: 0.55,
  roughness: 0.15,
  baseZoom: 0.625,
  baseCamPosX:
    typeof window !== "undefined" && window.innerWidth < 1000 ? 0 : -0.75,
  baseCamPosY: -0.45,
  baseCamPosZ: -0.09,
  baseRotationX: -0.1,
  baseRotationY: 0.45,
  baseRotationZ: 0.1,
  ambientIntensity: 0.75,
  keyIntensity: 0.85,
  keyPosX: 2.5,
  keyPosY: 10,
  keyPosZ: 10,
  fillIntensity: 3.5,
  fillPosX: -5,
  fillPosY: 2.5,
  fillPosZ: -2.5,
  rimIntensity: 3.5,
  rimPosX: -7.5,
  rimPosY: 5,
  rimPosZ: -10,
  topIntensity: 0.75,
  topPosX: 0,
  topPosY: 15,
  topPosZ: 0,
  cursorLightEnabled: true,
  cursorLightIntensity: 2,
  cursorLightColor: 0xffffff,
  cursorLightDistance: 7.5,
  cursorLightDecay: 1.5,
  cursorLightPosZ: 1,
  cursorLightSmoothness: 0.5,
  cursorLightScale: 1,
  parallaxSensitivityX: 0.25,
  parallaxSensitivityY: 0.075,
};

export default function ThreeScene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(config.canvasBg);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );

    // 2. Renderer setup (matching reference settings)
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // Note: sRGBEncoding is default in newer Three.js versions, but we add ToneMapping
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 2.0;

    // 3. Lighting Setup
    const ambientLight = new THREE.AmbientLight(
      0xffffff,
      config.ambientIntensity,
    );
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, config.keyIntensity);
    keyLight.position.set(config.keyPosX, config.keyPosY, config.keyPosZ);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 4096;
    keyLight.shadow.mapSize.height = 4096;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(
      0xffffff,
      config.fillIntensity,
    );
    fillLight.position.set(config.fillPosX, config.fillPosY, config.fillPosZ);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, config.rimIntensity);
    rimLight.position.set(config.rimPosX, config.rimPosY, config.rimPosZ);
    scene.add(rimLight);

    const topLight = new THREE.DirectionalLight(0xffffff, config.topIntensity);
    topLight.position.set(config.topPosX, config.topPosY, config.topPosZ);
    scene.add(topLight);

    // Cursor Light
    const cursorLight = new THREE.PointLight(
      config.cursorLightColor,
      config.cursorLightIntensity,
      config.cursorLightDistance,
      config.cursorLightDecay,
    );
    cursorLight.position.set(0, 0, config.cursorLightPosZ);
    cursorLight.visible = config.cursorLightEnabled;
    scene.add(cursorLight);

    // 4. Load & Center Model
    const loader = new GLTFLoader();
    let model;
    let modelCenter = new THREE.Vector3();

    loader.load(config.modelPath, (gltf) => {
      model = gltf.scene;

      // Apply materials and shadows
      model.traverse((node) => {
        if (node.isMesh && node.material) {
          node.material.color.set(new THREE.Color("#eeeeee"));

          node.material.metalness = config.metalness;
          node.material.roughness = config.roughness;
          node.material.needsUpdate = true;
        }
      });
      // Calculate bounding box to center it precisely
      const box = new THREE.Box3().setFromObject(model);
      modelCenter = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      model.position.set(
        -modelCenter.x + config.baseCamPosX,
        -modelCenter.y + config.baseCamPosY,
        -modelCenter.z + config.baseCamPosZ,
      );

      model.rotation.set(
        config.baseRotationX,
        config.baseRotationY,
        config.baseRotationZ,
      );

      const maxDim = Math.max(size.x, size.y, size.z);
      camera.position.z = maxDim * config.baseZoom;
      camera.lookAt(0, 0, 0);

      scene.add(model);
    });

    // 5. Mouse & Animation Logic
    let mouseX = 0;
    let mouseY = 0;
    let gyroX = 0;
    let gyroY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;
    let cursorLightTargetX = 0;
    let cursorLightTargetY = 0;

    const onDeviceOrientation = (event) => {
      const beta = event.beta ?? 0;
      const gamma = event.gamma ?? 0;

      gyroY = (gamma / 90) * config.parallaxSensitivityX;
      gyroX = ((beta - 45) / 90) * config.parallaxSensitivityY;

      cursorLightTargetX = (gamma / 90) * config.cursorLightScale;
      cursorLightTargetY = -((beta - 45) / 90) * config.cursorLightScale;
    };

    const onGyroAllowed = () => {
      window.addEventListener("deviceorientation", onDeviceOrientation);
    };
    window.addEventListener("gyroAllowed", onGyroAllowed);

    const onMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      cursorLightTargetX = mouseX * config.cursorLightScale;
      cursorLightTargetY = mouseY * config.cursorLightScale;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);

    let animationFrameId;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      if (model) {
        // parallax roation use mouse / gyro
        const isMobile = window.innerWidth < 1000;

        if (isMobile) {
          currentRotationX += (gyroX - currentRotationX) * 0.05;
          currentRotationY += (gyroY - currentRotationY) * 0.05;
        } else {
          targetRotationY = mouseX * config.parallaxSensitivityX;
          targetRotationX = -mouseY * config.parallaxSensitivityY;
          currentRotationX += (targetRotationX - currentRotationX) * 0.05;
          currentRotationY += (targetRotationY - currentRotationY) * 0.05;
        }

        model.rotation.x = config.baseRotationX + currentRotationX;
        model.rotation.y = config.baseRotationY + currentRotationY;
      }

      // Cursor light follow
      cursorLight.position.x +=
        (cursorLightTargetX - cursorLight.position.x) *
        config.cursorLightSmoothness;
      cursorLight.position.y +=
        (cursorLightTargetY - cursorLight.position.y) *
        config.cursorLightSmoothness;

      renderer.render(scene, camera);
    }

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("deviceorientation", onDeviceOrientation);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("gyroAllowed", onGyroAllowed);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
    />
  );
}
