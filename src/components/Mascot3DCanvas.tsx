import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
import {useCurrentFrame} from 'remotion';

interface Mascot3DCanvasProps {
  size?: number;
  rotationY?: number;
}

export const Mascot3DCanvas: React.FC<Mascot3DCanvasProps> = ({
  size = 500,
  rotationY = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frame = useCurrentFrame();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
    });
    renderer.setSize(size, size);
    renderer.setPixelRatio(1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.6);
    dirLight1.position.set(4, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xa3e635, 2.0); // Neon lime rim light
    dirLight2.position.set(-4, -2, -3);
    scene.add(dirLight2);

    const backLight = new THREE.DirectionalLight(0x38bdf8, 1.2); // Soft cyan-blue fill
    backLight.position.set(0, -4, 3);
    scene.add(backLight);

    // MASCOT ROOT GROUP
    const mascotGroup = new THREE.Group();

    // 1. VISOR (Obsidian Black Ellipsoid with High Gloss)
    const visorGeo = new THREE.SphereGeometry(1.22, 48, 48);
    visorGeo.scale(1.0, 1.05, 0.96);
    const visorMat = new THREE.MeshPhysicalMaterial({
      color: 0x050505,
      roughness: 0.08,
      metalness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });
    const visor = new THREE.Mesh(visorGeo, visorMat);
    visor.position.set(0, 0.05, 0.08);
    mascotGroup.add(visor);

    // 2. GLOWING PILL EYES (On front of visor)
    const eyeMat = new THREE.MeshBasicMaterial({color: 0xffffff});
    const eyeGeo = new THREE.CapsuleGeometry(0.14, 0.52, 16, 32);

    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.25, 0.22, 1.12);
    mascotGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.25, 0.22, 1.12);
    mascotGroup.add(rightEye);

    // 3. HOOD & COWL BLANKET ("Gulungan Selimut")
    const hoodMat = new THREE.MeshPhysicalMaterial({
      color: 0xf8fafc,
      roughness: 0.22,
      clearcoat: 0.85,
      clearcoatRoughness: 0.12,
      side: THREE.DoubleSide,
    });

    // Main Hood Shell (Wraps around back & sides of head with star crest)
    const hoodGeo = new THREE.SphereGeometry(1.55, 48, 48, 0, Math.PI * 2, 0, Math.PI * 0.74);
    // Sculpt organic star crest
    const hPos = hoodGeo.attributes.position;
    for (let i = 0; i < hPos.count; i++) {
      let x = hPos.getX(i);
      let y = hPos.getY(i);
      let z = hPos.getZ(i);
      if (y > 0.6) {
        y += 0.25 * Math.sin(x * 1.8);
      }
      hPos.setXYZ(i, x, y, z);
    }
    hoodGeo.computeVertexNormals();

    const hood = new THREE.Mesh(hoodGeo, hoodMat);
    hood.rotation.x = -Math.PI * 0.24;
    hood.position.set(0, 0.12, -0.28);
    mascotGroup.add(hood);

    // Front Folded Blanket Wrap Collar ("Gulungan Selimut" in front of chest)
    const collarCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-1.2, -0.65, 0.35),
      new THREE.Vector3(-0.45, -1.35, 1.05),
      new THREE.Vector3(0.55, -1.25, 0.95),
      new THREE.Vector3(1.2, -0.55, 0.35)
    );
    const collarGeo = new THREE.TubeGeometry(collarCurve, 40, 0.4, 20, false);
    const collar = new THREE.Mesh(collarGeo, hoodMat);
    mascotGroup.add(collar);

    // Lower Cocoon Body Taper (Smooth flowing lower blanket)
    const bodyGeo = new THREE.ConeGeometry(1.15, 1.8, 32);
    bodyGeo.rotateX(Math.PI);
    const body = new THREE.Mesh(bodyGeo, hoodMat);
    body.position.set(0, -1.25, -0.1);
    body.scale.set(1.0, 1.0, 0.75);
    mascotGroup.add(body);

    // 4. NEON LIME RIBBON (Spirals around the hood)
    const ribbonCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.65, 0.2, 0.2),
      new THREE.Vector3(-1.15, 1.25, -0.75),
      new THREE.Vector3(0.5, 1.45, -1.05),
      new THREE.Vector3(1.55, 0.6, -0.45),
      new THREE.Vector3(1.25, -0.65, 0.55),
      new THREE.Vector3(0.2, -1.35, 0.75),
    ], true);
    const ribbonGeo = new THREE.TubeGeometry(ribbonCurve, 64, 0.075, 16, true);
    const ribbonMat = new THREE.MeshStandardMaterial({
      color: 0xa3e635,
      emissive: 0x84cc16,
      emissiveIntensity: 1.8,
      roughness: 0.2,
    });
    const ribbon = new THREE.Mesh(ribbonGeo, ribbonMat);
    mascotGroup.add(ribbon);

    // 5. FLOATING 4-POINT LIME STAR
    const starShape = new THREE.Shape();
    const outerR = 0.3;
    const innerR = 0.085;
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      const r = i % 2 === 0 ? outerR : innerR;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      if (i === 0) starShape.moveTo(x, y);
      else starShape.lineTo(x, y);
    }
    starShape.closePath();
    const starExtrude = new THREE.ExtrudeGeometry(starShape, {
      depth: 0.06,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
    });
    const starMat = new THREE.MeshStandardMaterial({
      color: 0xa3e635,
      emissive: 0x84cc16,
      emissiveIntensity: 1.5,
      roughness: 0.3,
    });
    const star = new THREE.Mesh(starExtrude, starMat);
    star.position.set(1.55, 1.15, 0.2);
    mascotGroup.add(star);

    // Rotation & Natural float
    mascotGroup.rotation.y = rotationY;
    mascotGroup.position.y = Math.sin(frame / 14) * 0.1;

    scene.add(mascotGroup);

    // Render frame to canvas
    renderer.render(scene, camera);

    return () => {
      renderer.dispose();
    };
  }, [frame, rotationY, size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{
        width: size,
        height: size,
        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.7))',
      }}
    />
  );
};
