import React, {useRef, useState} from 'react';
import { useFrame } from "@react-three/fiber";
import { Vector3 } from 'three';

const Boxes = () => {
 const Box = ({ color }) => {
    const box = useRef();
    const time = useRef(0);
    const [xRotSpeed] = useState(() => Math.random());
    const [yRotSpeed] = useState(() => Math.random());
    const [scale] = useState(() => Math.pow(Math.random(), 2.0) * 0.5 + 0.05);

    const getInitialPosition = () => {
      let v = new Vector3((Math.random() * 2 - 1) * 3, Math.random() * 2.5 + 0.1, (Math.random() * 2 - 1) * 15); 
      if(v.x < 0) v.x -= 1.75;
      if(v.x > 0) v.x += 1.75;
  
      return v;
    }

    const resetPosition = () => {
      let v = new Vector3((Math.random() * 2 - 1) * 3, Math.random() * 2.5 + 0.1, (Math.random() * 2 - 1) * 15);
  
      if (v.x < 0) v.x -= 1.75;
      if (v.x > 0) v.x += 1.75;
  
      setPosition(v);
    }

    
    // eslint-disable-next-line
    const [position, setPosition] = useState(getInitialPosition());
  
    useFrame((state, delta) => {
      time.current += delta * 1.2;
      let newZ = position.z - (time.current);

      if(newZ < -10) {
        resetPosition();
        time.current = 0;
      }

      box.current.position.set(
        position.x, 
        position.y, 
        newZ, 
      );
      box.current.rotation.x += delta * xRotSpeed;
      box.current.rotation.y += delta * yRotSpeed;
    }, [xRotSpeed, yRotSpeed, position] );
  
    return (
      <mesh ref={box} scale={scale} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} envMapIntensity={0.15} />
      </mesh>
    );
 }

 return (
    <>
        {
            Array(100).fill(0).map((e, i) => <Box key={i} color={i % 2 === 0 ? [0.4, 0.1, 0.1] : [0.05, 0.15, 0.4]} />)
        }
    </>
 )
}

export default Boxes
