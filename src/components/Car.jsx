import React, { useEffect } from 'react';
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Mesh } from 'three';

const Car = () => {

  const gltl = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "models/car/scene.gltf"
  );

  useEffect(() => {
    gltl.scene.scale.set(0.005, 0.005, 0.005);
    gltl.scene.position.set(0, 0.035, 0);
    gltl.scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.castShadow = true;
            object.receiveShadow = true;
            object.material.envMapIntensity = 20;
        }
    });
  }, [gltl]);

  return <primitive object={gltl.scene} />;
}

export default Car
