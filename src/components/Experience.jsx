/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { motion } from 'framer-motion';
import 'react-vertical-timeline-component/style.min.css';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { textVariant } from '../utils/motion';
import YouTubeEmbed from './YouTubeEmbed';
import { useEffect, useState } from 'react';
import { FidgetSpinner } from 'react-loader-spinner';

import axios from 'axios';

const ExperienceCard = ({ experience }) => (
	<VerticalTimelineElement
		contentStyle={{ background: '#1d1836', color: '#fff' }}
		contentArrowStyle={{ borderRight: '7px solid #232631' }}
		date={experience.date}
		iconStyle={{ background: experience.iconBg }}
		icon={
			<div className="flex justify-center items-center w-full h-full">
				<img
					src={`http://localhost:5000/assets/company/${experience.icon}`}
					alt={experience.company_name}
					className="w-[60%] h-[60%] object-contain"
				/>
			</div>
		}>
		<div>
			<h3 className="text-white text-[24px] font-bold"> {experience.title}</h3>

			<p className="text-secondary text-[16px] font-semibold" style={{ margin: 0 }}>
				{experience.company_name}
			</p>

			{experience.embedId && <YouTubeEmbed embedId={experience.embedId} />}
		</div>

		<ul className="mt-5 list-disc ml-5 space-y-2">
			{experience.points.map((point, index) => (
				<li
					key={`experience-point-${index}`}
					className="text-white-100 text-[14px] pl-1 tracking-wider">
					{point}
				</li>
			))}
		</ul>
	</VerticalTimelineElement>
);

const Experience = () => {
	const [experiences, setExperiences] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const { data } = await axios.get('http://localhost:5000/api/portfolio/experiences');

				// console.log(data); // Imprime los datos en la consola
				setExperiences(data);

				// Agregar un retraso artificial de 2 segundos
				setTimeout(() => {
					setIsLoading(false);
				}, 10000);
			} catch (err) {
				console.log(err.message);
				// throw new Error(`Error al realizar la solicitud: ${err.message}`);
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	// console.log(experiences); // Imprime el estado "services" en la consola

	return (
		<>
			{isLoading ? (
				<div className="center-progress">
					<FidgetSpinner
						visible={true}
						height="80"
						width="80"
						ariaLabel="dna-loading"
						wrapperStyle={{}}
						wrapperClass="dna-wrapper"
						ballColors={['#00cea8', '#00cea8', '#00cea8']}
						backgroundColor="#fafbfd"
					/>
				</div>
			) : (
				<>
					<motion.div variants={textVariant()}>
						<p className={`${styles.sectionSubText} text-center`}>¿Qué hice hasta ahora?</p>
						<h2 className={`${styles.sectionHeadText} text-center`}>Experiencia practica</h2>
					</motion.div>

					<div className="mt-20 flex flex-col">
						<VerticalTimeline>
							{experiences.map((experience, index) => (
								<ExperienceCard key={`experience-${index}`} experience={experience} />
							))}
						</VerticalTimeline>
					</div>
				</>
			)}
		</>
	);
};

export default SectionWrapper(Experience, 'work');
