/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import CanvasLoader from '../Loader';

const Computers = ({ scaleFactor, position }) => {
	const computer = useGLTF('./voxel_web/scene.gltf');

	return (
		<mesh>
			<hemisphereLight intensity={0.25} groundColor="black" />
			<pointLight intensity={1} />
			<spotLight
				position={[-20, 50, 40]}
				angle={0.12}
				penumbra={2}
				intensity={2}
				castShadow
				shadow-mapSize={1024}
			/>
			<primitive
				object={computer.scene}
				scale={[scaleFactor, scaleFactor, scaleFactor]}
				position={position}
				rotation={[-0.01, -0.2, -0.3]}
			/>
		</mesh>
	);
};

const ComputersCanvas = () => {
	const [scaleFactor, setScaleFactor] = useState(0.75);
	const [position, setPosition] = useState([0, -3.0, 1.5]);

	useEffect(() => {
		const handleResize = () => {
			const viewportWidth = window.innerWidth;

			// Si el ancho del viewport es menor que 500px, ajusta la escala y la posición
			if (viewportWidth < 500) {
				setScaleFactor(0.4);
				setPosition([1.0, -2.5, 1.1]);
			} else {
				setScaleFactor(0.5);
				setPosition([1.5, -2.9, 1.5]);
			}
		};

		// Agrega el listener de redimensionamiento
		window.addEventListener('resize', handleResize);

		// Llama a handleResize para establecer la escala y la posición iniciales en función del tamaño de la ventana
		handleResize();

		// Limpia el listener cuando se desmonta el componente
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<Canvas
			frameloop="demand"
			shadows
			camera={{ position: [20, 3, 5], fov: 25 }}
			gl={{ preserveDrawingBuffer: true }}>
			<Suspense fallback={<CanvasLoader />}>
				<OrbitControls
					enableZoom={false}
					maxPolarAngle={Math.PI / 2}
					minPolarAngle={Math.PI / 2}
				/>

				<Computers scaleFactor={scaleFactor} position={position} />
			</Suspense>

			<Preload all />
		</Canvas>
	);
};

export default ComputersCanvas;
