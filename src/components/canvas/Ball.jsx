import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Decal, Float, OrbitControls, Preload, useTexture } from '@react-three/drei';

import CanvasLoader from '../Loader';

const Ball = ({ imgUrl, position }) => {
  const [decal] = useTexture([imgUrl]);

  return (
    <group position={position}>
      <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
        <ambientLight intensity={0.15} />
        <directionalLight position={[0, 0, 0.5]} />

        <mesh castShadow receiveShadow scale={3.0}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial color='#fff8eb' polygonOffset polygonOffsetFactor={-5} flatShading />
          <Decal position={[0, 0, 1]} rotation={[2 * Math.PI, 0, 6.25]} flatShading map={decal} />
        </mesh>
      </Float>
    </group>
  );
};

const BallCanvas = ({ technologies, positions }) => {
  return (
    <Canvas gl={{ preserveDrawingBuffer: true }} orthographic camera={{ position: [0, 0, 200], zoom: 15 }}>
      <Suspense fallback={<CanvasLoader />}>
        {technologies.map((technology, index) => (
          <Ball
            key={technology.name}
            imgUrl={`${import.meta.env.VITE_API_URL}/assets/tech/${technology.icon}`}
            position={positions[index]}
          />
        ))}
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
