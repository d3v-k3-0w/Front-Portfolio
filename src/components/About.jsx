/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';
import { Tilt } from 'react-tilt';
import { SectionWrapper } from '../hoc';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ServiceCard = ({ index, title, icon }) => (
	/* recordarme que mayores al breakpoint <tablet> los Tilts tendran 250px y menores <tablet> tendran 350px */
	<Tilt className="tablet:w-[250px] w-[350px]">
		<motion.div
			variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
			className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card">
			<div
				options={{
					max: 45,
					scale: 1,
					speed: 450,
				}}
				className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
				<img
					src={`http://localhost:5000/assets/services/${icon}`}
					http:alt="web-development"
					className="w-16 h-16 object-contain"
				/>

				<h3 className="text-white text-[20px] font-bold text-center">{title}</h3>
			</div>
		</motion.div>
	</Tilt>
);

const About = () => {
	const [services, setServices] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await axios.get('http://localhost:5000/api/portfolio/aboutservices');

				// console.log(data); // Imprime los datos en la consola
				setServices(data);
			} catch (err) {
				throw new Error(`Infernal Error al realizar la solicitud: ${err.message}`);
			}
		};

		fetchData();
	}, []);

	// console.log(services); // Imprime el estado "services" en la consola

	return (
		<>
			<motion.div variants={textVariant()}>
				<p className={styles.sectionSubText}>Introducción</p>
				<h2 className={styles.sectionHeadText}>Descripción general.</h2>
			</motion.div>

			<motion.p
				variants={fadeIn('', '', 0.1, 1)}
				className="mt-2 text-secondary text-[17px] max-w-3xl leading-[30px]">
				Desarrollador de software con experiencia en Java, JavaScript, TypeScript y tambien en
				frameworks como React, Angular, Express.js y Three.js. Aprendo rápido y colaboro
				estrechamente con los colegas, para crear soluciones eficientes, escalables y fáciles
				de usar que resuelven problemas del mundo real.
			</motion.p>

			<div className="mt-10 flex flex-wrap justify-center gap-10 pb-5">
				{services.map((service, index) => (
					<ServiceCard
						key={service.title}
						index={index}
						{...service}
						className="w-full mobile-l:w-1/2 laptop:w-1/4"
					/>
				))}
			</div>
		</>
	);
};

export default SectionWrapper(About, 'about');
