import React from "react";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import "../App.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Scene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      25,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );

    camera.position.z = 10;
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);

    currentMount.appendChild(renderer.domElement);

    /* Controls */
    const controls = new OrbitControls(camera, renderer.domElement);
    /* Cube */
    const cube = new THREE.Mesh(
      new THREE.BoxBufferGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial()
    );

    scene.add(cube);

    renderer.render(scene, camera);

    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      currentMount.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="contenedor3D" ref={mountRef}></div>;
};

export default Scene;
