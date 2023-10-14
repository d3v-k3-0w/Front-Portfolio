/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { styles } from '../styles';

import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectCard = ({ index, name, description, tags, image, hostImg, hostLink }) => {
	return (
		<motion.div variants={fadeIn('up', 'spring', index * 0.5, 0.75)}>
			<Tilt
				options={{
					max: 45,
					scale: 1,
					spreed: 450,
				}}
				className=" bg-tertiary p-5 rounded-2xl tablet:w-[300px] w-full">
				<div className="relative w-full h-[230px]">
					<img
						src={`http://localhost:5000/assets/projects/${image}`}
						alt={name}
						className="w-full h-full object-cover rounded-2x1"
					/>

					<div className="absolute inset-0 flex justify-end m-3 card-img_hover">
						<div
							onClick={() => window.open(hostLink, '_blank')}
							className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer">
							<img
								src={`http://localhost:5000/assets/projects/${hostImg}`}
								alt="github"
								className="w-1/2 h-1/2 object-contain"
							/>
						</div>
					</div>
				</div>

				<div className="mt-5">
					<h3 className="text-white font-bold text-[24px]">{name}</h3>
					<p className="mt-2 text-secondary text-[14px]">{description}</p>
				</div>

				<div className="mt-4 flex flex-wrap gap-2">
					{tags.map((tag) => (
						<p key={tag.name} className={`text-[14px] ${tag.color}`}>
							#{tag.name}
						</p>
					))}
				</div>
			</Tilt>
		</motion.div>
	);
};

const Works = () => {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await axios.get('http://localhost:5000/api/portfolio/projects');

				setProjects(data);
			} catch (err) {
				console.log(err.message);
				throw new Error(`Infernal Error al realizar la solicitud: ${err.message}`);
			}
		};

		fetchData();
	}, []);

	return (
		<>
			<motion.div variants={textVariant()}>
				<p className={styles.sectionSubText}>Mi Practica</p>
				<h2 className={styles.sectionHeadText}>Proyectos.</h2>
			</motion.div>

			<div className="w-full flex">
				<motion.p
					variants={fadeIn('', '', 0.1, 1)}
					className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]">
					Los siguientes proyectos muestran mis habilidades y experiencia a través de ejemplos
					del mundo real en mis practicas. Cada proyecto se describe brevemente tambien tiene
					un enlace en la parte superior que te lleva al dominio de la pagina. Refleja mi
					capacidad para resolver problemas complejos, trabajar con diferentes tecnologías y
					gestionar proyectos de forma eficaz.
				</motion.p>
			</div>

			<div className="mt-20 flex flex-wrap justify-center gap-7">
				{projects.map((project, index) => (
					<ProjectCard
						key={`project-${index}`}
						index={index}
						{...project}
						className="tablet:w-1/2 laptop:w-1/2"
					/>
				))}
			</div>
		</>
	);
};

export default SectionWrapper(Works, '');
