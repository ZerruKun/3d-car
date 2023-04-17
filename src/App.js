import React, { Suspense } from 'react';
import { Canvas } from "@react-three/fiber";
import "./style.css";
import { OrbitControls, PerspectiveCamera, CubeCamera, Environment } from "@react-three/drei";
import Ground from './components/Ground';
import Car from './components/Car';
import Rings from './components/Rings';
import Boxes from './components/Boxes';
import {Bloom, ChromaticAberration, EffectComposer} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import FloatingGrid from './components/FloatingGrid';

const CarShow = () => {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

      <color args={[0, 0, 0]} attach="background"/>

      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture}/>
            <Car />
          </>
        )}
      </CubeCamera>

      <Rings />
      <Boxes />
      <FloatingGrid />

      <spotLight 
        color={[1, 0.25, 0.7]} 
        intensity={1.5} 
        angle={0.6} 
        penumbra={0.5} 
        position={[5, 5, 0]} 
        castShadow 
        shadow-bias={-0.0001}
      />
      <spotLight 
        color={[0.14, 0.25, 0.7]} 
        intensity={1.5} 
        angle={0.6} 
        penumbra={0.5} 
        position={[5, 5, 0]} 
        castShadow 
        shadow-bias={-0.0001}
      />

      <Ground />

      <EffectComposer>
        {/* <DepthOfField focusDistance={0.0035} focalLength={0.01} bokehScale={3} height={480} /> */}
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={1.3} // The bloom intensity.
          width={300} // render width
          height={300} // render height
          kernelSize={5} // blur kernel size
          luminanceThreshold={0.15} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL} // blend mode
          offset={[0.0005, 0.0012]} // color offset
        />
      </EffectComposer>

    </>
  );
}

const App = () => {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <CarShow />
      </Canvas>
    </Suspense>
  );
}

export default App;