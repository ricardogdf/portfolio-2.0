"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Button } from "@/components/ui/button";

const MagicAnimation = ({
  isAnimating,
  setIsAnimating,
}: {
  isAnimating: boolean;
  setIsAnimating: any;
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isAnimating || !mountRef.current || !isClient) return;

    const currentMount = mountRef.current;
    if (!currentMount) return;

    let animationFrameId: number;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 9);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    currentMount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 150, 100, Math.PI / 5, 0.3);
    spotLight.position.set(0, 15, 10);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    scene.add(spotLight);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(50, 50),
      new THREE.ShadowMaterial({ opacity: 0.5 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.9;
    floor.receiveShadow = true;
    scene.add(floor);

    // Top Hat
    const hatGroup = new THREE.Group();
    const hatMaterial = new THREE.MeshStandardMaterial({
      color: 0x010101,
      roughness: 0.4,
      metalness: 0.1,
    });

    const cylinderHeight = 2.2;
    const topGeom = new THREE.CylinderGeometry(1.2, 1.2, cylinderHeight, 64);

    // Create a texture for the band
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 128;
    const context = canvas.getContext("2d")!;
    context.fillStyle = "#010101";
    context.fillRect(0, 0, 1, 128);
    context.fillStyle = "#4B0082";
    context.fillRect(0, 128 - 28, 1, 28);

    const bandTexture = new THREE.CanvasTexture(canvas);
    bandTexture.wrapS = THREE.RepeatWrapping;
    bandTexture.wrapT = THREE.RepeatWrapping;
    bandTexture.repeat.set(128, 1);

    const cylinderMaterials = [
      new THREE.MeshStandardMaterial({
        map: bandTexture,
        roughness: 0.4,
        metalness: 0.1,
      }),
      hatMaterial, // top
      hatMaterial, // bottom
    ];

    const cylinderMesh = new THREE.Mesh(topGeom, cylinderMaterials);
    cylinderMesh.position.y = 0;
    cylinderMesh.castShadow = true;
    cylinderMesh.receiveShadow = true;

    const brimGeom = new THREE.CylinderGeometry(1.8, 1.8, 0.08, 64);
    const brimMesh = new THREE.Mesh(brimGeom, hatMaterial);
    brimMesh.position.y = -1.1;
    brimMesh.castShadow = true;
    brimMesh.receiveShadow = true;

    const pearlMaterial = new THREE.MeshStandardMaterial({
      color: 0xff8c00,
      emissive: 0x442200,
      metalness: 0.5,
      roughness: 0.3,
    });
    const pearlGeom = new THREE.SphereGeometry(0.1, 16, 16);
    const pearlMesh = new THREE.Mesh(pearlGeom, pearlMaterial);
    pearlMesh.position.set(1.15, -0.8, 0.3);

    hatGroup.add(cylinderMesh, brimMesh, pearlMesh);
    hatGroup.position.y = -0.8;
    scene.add(hatGroup);

    // Wand
    const wandGroup = new THREE.Group();
    const stickMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.1,
    });
    const tipMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xdddddd,
    });
    const stickGeom = new THREE.CylinderGeometry(0.05, 0.05, 4.0, 32);
    const stickMesh = new THREE.Mesh(stickGeom, stickMat);
    stickMesh.castShadow = true;
    const tipGeom = new THREE.CylinderGeometry(0.05, 0.05, 0.2, 32);
    const tipMesh = new THREE.Mesh(tipGeom, tipMat);
    tipMesh.position.y = 2.0;
    wandGroup.add(stickMesh, tipMesh);
    wandGroup.position.set(3, 2, 0); // Start next to the hat
    wandGroup.rotation.z = -Math.PI / 8;
    scene.add(wandGroup);

    // Golden Snitch
    const snitchGroup = new THREE.Group();
    const snitchBodyMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.9,
      roughness: 0.2,
    });

    const bodyGeom = new THREE.SphereGeometry(0.2, 32, 16);
    const bodyMesh = new THREE.Mesh(bodyGeom, snitchBodyMat);
    bodyMesh.castShadow = true;

    const wingCanvas = document.createElement("canvas");
    wingCanvas.width = 256;
    wingCanvas.height = 128;
    const wingCtx = wingCanvas.getContext("2d")!;

    const gradient = wingCtx.createLinearGradient(0, 0, 256, 0);
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.2)");
    gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.7)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0.2)");
    wingCtx.fillStyle = gradient;

    wingCtx.beginPath();
    wingCtx.moveTo(10, 64);
    wingCtx.bezierCurveTo(80, -20, 180, 140, 250, 50);
    wingCtx.bezierCurveTo(180, 150, 80, 0, 10, 64);
    wingCtx.fill();

    for (let i = 0; i < 15; i++) {
      wingCtx.strokeStyle = `rgba(220, 180, 100, ${Math.random() * 0.3 + 0.2})`;
      wingCtx.lineWidth = Math.random() * 1.5 + 0.5;
      wingCtx.beginPath();
      wingCtx.moveTo(10, 64);
      wingCtx.bezierCurveTo(
        Math.random() * 100 + 40,
        Math.random() * 128,
        Math.random() * 100 + 150,
        Math.random() * 128,
        250,
        50
      );
      wingCtx.stroke();
    }

    const wingTexture = new THREE.CanvasTexture(wingCanvas);
    const snitchWingMat = new THREE.MeshStandardMaterial({
      map: wingTexture,
      alphaMap: wingTexture,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
      roughness: 0.3,
      metalness: 0.2,
    });

    const wingGeom = new THREE.PlaneGeometry(1.2, 0.6); // Wings 20% smaller

    const leftWingPivot = new THREE.Group();
    const leftWing = new THREE.Mesh(wingGeom, snitchWingMat);
    leftWing.position.x = -0.6;
    leftWingPivot.add(leftWing);
    leftWingPivot.position.x = -0.15;
    leftWingPivot.position.y = 0.1;
    leftWingPivot.rotation.y = -0.3;

    const rightWingPivot = new THREE.Group();
    const rightWing = new THREE.Mesh(wingGeom, snitchWingMat);
    rightWing.position.x = 0.6;
    rightWing.rotation.y = Math.PI;
    rightWingPivot.add(rightWing);
    rightWingPivot.position.x = 0.15;
    rightWingPivot.position.y = 0.1;
    rightWingPivot.rotation.y = 0.3;

    snitchGroup.add(bodyMesh, leftWingPivot, rightWingPivot);
    snitchGroup.visible = false;
    snitchGroup.position.y = 0;
    hatGroup.add(snitchGroup);

    let snitchTarget = new THREE.Vector3();
    let lastSwitchTime = 0;
    const switchInterval = 1.0;

    // Animation randomizers
    let hatRandX = Math.random() * 2 + 1;
    let hatRandY = Math.random() * 2 + 1;
    let hatRandZ = Math.random() * 2 + 1;
    let wandRandX = Math.random() * 3 + 1;
    let wandRandY = Math.random() * 3 + 1;

    const clock = new THREE.Clock();
    let animPhase = 0; // 0: approach, 1: hat flip, 2: tap, 3: snitch rise, 4: snitch fly, 5: retreat, 6: bow, 7: end
    let phaseStart = 0;

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const randomizeMovement = () => {
      hatRandX = Math.random() * 2 + 1;
      hatRandY = Math.random() * 2 + 1;
      hatRandZ = Math.random() * 2 + 1;
      wandRandX = Math.random() * 3 + 1;
      wandRandY = Math.random() * 3 + 1;
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const delta = clock.getDelta();

      // Continuous, more random idle movement for hat and wand
      const applyIdleMovement = (multiplier = 1.0) => {
        hatGroup.position.y +=
          Math.sin(elapsed * hatRandY) * 0.005 * multiplier;
        hatGroup.position.x +=
          Math.cos(elapsed * hatRandX) * 0.005 * multiplier;
        hatGroup.rotation.z = Math.sin(elapsed * hatRandZ) * 0.05 * multiplier;
        hatGroup.rotation.x += Math.cos(elapsed * 3.2) * 0.003 * multiplier;

        wandGroup.position.y +=
          Math.sin(elapsed * wandRandY) * 0.01 * multiplier;
        wandGroup.position.x +=
          Math.cos(elapsed * wandRandX) * 0.01 * multiplier;
        wandGroup.rotation.z += Math.sin(elapsed * 4.5) * 0.008 * multiplier;
      };

      // Animation sequence
      if (animPhase < 7) {
        applyIdleMovement(animPhase >= 4 && animPhase < 6 ? 0.5 : 1.0);
      }

      if (animPhase === 0) {
        // approach
        const duration = 2.5;
        const t = Math.min((elapsed - phaseStart) / duration, 1);
        const easedT = easeInOutCubic(t);
        wandGroup.position.x = 3 - 4.5 * easedT; // Move from side to front
        if (t >= 1) {
          animPhase = 1;
          phaseStart = elapsed;
          randomizeMovement();
        }
      } else if (animPhase === 1) {
        // hat flip
        const duration = 1;
        const t = Math.min((elapsed - phaseStart) / duration, 1);
        const easedT = easeInOutCubic(t);
        hatGroup.rotation.x = easedT * Math.PI; // Flip 180 degrees
        wandGroup.position.x = -1.5 + Math.sin(elapsed * 8) * 0.3;
        if (t >= 1) {
          hatGroup.rotation.x = Math.PI;
          animPhase = 2; // move to tap
          phaseStart = elapsed;
          randomizeMovement();
        }
      } else if (animPhase === 2) {
        // tap (bottom of flipped hat)
        const tapDuration = 0.5;
        const t = Math.min((elapsed - phaseStart) / tapDuration, 1);
        wandGroup.position.y = 1.0 - Math.sin(t * Math.PI) * 0.7;
        wandGroup.position.x = -1.5 + Math.sin(t * Math.PI) * 0.7;
        if (t >= 1) {
          snitchGroup.visible = true;
          animPhase = 3;
          phaseStart = elapsed;
          randomizeMovement();
        }
      } else if (animPhase === 3) {
        // snitch rise
        const duration = 1.5;
        const t = Math.min((elapsed - phaseStart) / duration, 1);
        snitchGroup.position.y = t * -2.5;
        if (t >= 1) {
          scene.attach(snitchGroup); // This correctly reparents and preserves world transform
          animPhase = 4;
          phaseStart = elapsed;
          lastSwitchTime = elapsed;
          snitchTarget.copy(snitchGroup.position);
          randomizeMovement();
        }
      } else if (animPhase === 4) {
        // snitch fly
        const duration = 7; // Total phase duration: 5s hummingbird + 2s exit
        const phaseElapsed = elapsed - phaseStart;

        const moveT = easeInOutCubic(Math.min(phaseElapsed / 2, 1));
        hatGroup.position.x = moveT * -6;
        wandGroup.position.x = -1.0 + moveT * -6; // Adjusted to be closer

        if (phaseElapsed < 5) {
          if (elapsed - lastSwitchTime > switchInterval) {
            snitchTarget.set(
              (Math.random() - 0.5) * 16,
              Math.random() * 5,
              (Math.random() - 0.5) * 8
            );
            lastSwitchTime = elapsed;
          }
          snitchGroup.position.lerp(snitchTarget, 0.04);
        } else {
          const exitT = Math.min((phaseElapsed - 5) / 2, 1);
          const easedExitT = easeInOutCubic(exitT);

          const exitTarget = new THREE.Vector3(0, 2, 15);
          snitchGroup.position.lerp(exitTarget, easedExitT * 0.1);
          snitchGroup.scale.set(
            1 + easedExitT * 5,
            1 + easedExitT * 5,
            1 + easedExitT * 5
          );
        }

        if (phaseElapsed >= duration) {
          animPhase = 5;
          phaseStart = elapsed;
        }
      } else if (animPhase === 5) {
        // retreat and center
        if (snitchGroup.parent) {
          scene.remove(snitchGroup);
        }
        const duration = 2;
        const t = Math.min((elapsed - phaseStart) / duration, 1);
        const easedT = easeInOutCubic(t);
        hatGroup.position.x = -6 * (1 - easedT);
        wandGroup.position.x = -7 * (1 - easedT); // Adjusted to be closer
        hatGroup.rotation.x = Math.PI * (1 - easedT); // Un-flip
        if (t >= 1) {
          animPhase = 6;
          phaseStart = elapsed;
          randomizeMovement();
        }
      } else if (animPhase === 6) {
        // Bow
        const duration = 1.5;
        const t = Math.min((elapsed - phaseStart) / duration, 1);
        const bowT = Math.sin(t * Math.PI);
        hatGroup.rotation.x = bowT * 0.8;
        hatGroup.position.y = -0.8 - bowT * 0.5;
        wandGroup.rotation.x = bowT * 0.6;
        wandGroup.position.y = 2 - bowT * 0.5;

        if (t >= 1) {
          animPhase = 7; // End
        }
      } else if (animPhase === 7) {
        setIsAnimating(false);
        return; // Stop the animation loop here
      }

      // Snitch wing flap
      if (snitchGroup.visible) {
        leftWingPivot.rotation.z = Math.sin(elapsed * 240) * 0.9;
        rightWingPivot.rotation.z = -Math.sin(elapsed * 240) * 0.9;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (currentMount) {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => {
              if (material.map) material.map.dispose();
              material.dispose();
            });
          } else {
            if (object.material.map) object.material.map.dispose();
            object.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, [isAnimating, isClient]);

  return (
    <div className="w-full h-[70vh]">
      <div
        ref={mountRef}
        className="w-full h-full"
        aria-label="3D animation of a magic show with a top hat and wand"
      />
    </div>
  );
};

export default MagicAnimation;
