import { motion } from 'framer-motion';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { textVariant } from '../utils/motion';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Modal from './Modal';
import FeedbackCard from './FeedbackCard';
import DefaultFeedbackCard from './DefaultFeedbackCard';

const Feedbacks = () => {
	const [testimonials, setTestimonials] = useState([]);

	const [isModal, setIsModal] = useState(false);

	const addTestimonial = (newTestimonial) => {
		setTestimonials([newTestimonial, ...testimonials]);
	};

	useEffect(() => {
		// Realiza la consulta al servidor y actualiza el estado 'testimonials' antes de renderizar
		const fetchData = async () => {
			try {
				const { data } = await axios.get('http://localhost:5000/api/portfolio/testimonials');
				setTestimonials(data);
			} catch (err) {
				console.log(err.message);
				throw new Error(`Infernal Error al realizar la solicitud: ${err.message}`);
			}
		};

		fetchData(); // Llama a fetchData cuando se monta el componente
	}, []);

	const settings = {
		dots: true,
		infinite: false,
		slidesToShow: 3, // Cantidad de tarjetas a mostrar en una fila
		slidesToScroll: 1,
		speed: 500,
		arrows: true, // Puedes habilitar o deshabilitar las flechas de navegación
		responsive: [
			{
				breakpoint: 1026, //LAPTOPS
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					infinite: false,
					dots: true,
				},
			},
			{
				breakpoint: 768, //TABLETS
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					arrows: false,
				},
			},
			{
				breakpoint: 450, //MOVILES
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
				},
			},
		],
	};

	return (
		<div className={`mt-12 bg-black-100 rounded-[20px]`}>
			<div className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px]`}>
				<motion.div variants={textVariant()}>
					<p className={styles.sectionSubText}>Lo que otros opinan de mi</p>
					<h2 className={styles.sectionHeadText}>Testimonios.</h2>
				</motion.div>
			</div>
			<div className={`-mt-20 pb-14 ${styles.paddingX} gap-7`}>
				<Slider {...settings} variableWidth={true}>
					<DefaultFeedbackCard onClick={() => setIsModal(true)} />

					{testimonials.map((testimonial, index) => (
						<FeedbackCard key={testimonial.name} index={index} {...testimonial} />
					))}
				</Slider>
			</div>

			{/* Renderizar el modal cuando isModal sea verdadero y pasar la función para agregar testimonios */}
			{isModal && (
				<Modal
					isOpen={isModal}
					onClose={() => setIsModal(false)}
					addTestimonial={addTestimonial}
				/>
			)}
		</div>
	);
};

export default SectionWrapper(Feedbacks, '');
