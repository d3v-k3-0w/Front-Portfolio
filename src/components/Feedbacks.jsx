/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ReactModal from 'react-modal';

const DefaultFeedbackCard = ({ onClick }) => (
	<motion.div
		variants={fadeIn('', 'spring', 0.5, 0.75)}
		className="bg-black-200 p-5 rounded-3xl w-[295px] h-[320px] flex justify-center items-center"
		onClick={onClick}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="currentColor"
			aria-hidden="true"
			className="h-20 w-20 text-gray-300 border-2 border-dashed  border-gray-300 rounded-lg"
			preserveAspectRatio="xMidYMid meet"
			focusable="false">
			<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
		</svg>
	</motion.div>
);

const FeedbackCard = ({ index, testimonial, name, designation, company, image }) => (
	<motion.div
		variants={fadeIn('', 'spring', index * 0.5, 0.75)}
		className="bg-black-200 p-5 rounded-3xl w-[280px] h-[320px] flex flex-col justify-between">
		<div>
			<p className="text-white font-black text-[48px]">"</p>
			<p className="text-white tracking-wider text-[13px]">{testimonial}</p>
		</div>

		<div className="flex justify-between items-end gap-1 mt-10">
			<div className="flex-1 flex flex-col">
				<p className="text-[#00cea8] font-medium text-[16px]">
					<span className="blue-text-gradient">@</span> {name}
				</p>
				<p className="mt-1 pr-5 text-secondary text-[12px]">
					{designation} - {company}
				</p>
			</div>

			<img
				src={`http://localhost:5000/assets/feedback/${image}`}
				alt={`feedback_by-${name}`}
				className="w-10 h-10  rounded-full object-cover"
			/>
		</div>
	</motion.div>
);

const Modal = ({ isOpen, onClose, addTestimonial }) => {
	const [imagePreview, setImagePreview] = useState(
		'https://uxwing.com/wp-content/themes/uxwing/download/video-photography-multimedia/upload-image-icon.png'
	);

	const [newTestimonial, setNewTestimonial] = useState({
		testimonial: '',
		name: '',
		designation: '',
		company: '',
		image: null,
	});

	useEffect(() => {
		/* ::función para deshabilitar el desplazamiento en el fondo cuando se abre el modal:: */
		const disableBodyScroll = () => {
			document.body.style.overflow = 'hidden';
		};

		/* ::función para habilitar el desplazamiento en el fondo cuando se cierra el modal:: */
		const enableBodyScroll = () => {
			document.body.style.overflow = 'auto';
		};

		if (isOpen) {
			disableBodyScroll();
		} else {
			enableBodyScroll();
		}

		/* ::limpia los efectos al desmontar el componente:: */
		return () => {
			enableBodyScroll();
		};
	}, [isOpen]);

	const handlerImageChange = (e) => {
		const selectedImage = e.target.files[0];

		if (selectedImage) {
			const imageUrl = URL.createObjectURL(selectedImage);
			setImagePreview(imageUrl);
			setNewTestimonial({ ...newTestimonial, image: selectedImage });
		}
	};

	const handlerNewTestimonial = async (e) => {
		e.preventDefault();

		console.log('me estoy ejecutando...');

		try {
			const formData = new FormData();
			formData.append('testimonial', newTestimonial.testimonial);
			formData.append('name', newTestimonial.name);
			formData.append('designation', newTestimonial.designation);
			formData.append('company', newTestimonial.company);
			formData.append('image', newTestimonial.image); // Asegúrate de que newTestimonial.image sea el archivo seleccionado

			/* ::realizar la solicitud POST a la API con FormData:: */
			const response = await axios.post(
				'http://localhost:5000/api/portfolio/new-testimonial',
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data', // importante: establece el encabezado correcto
					},
				}
			);

			/* ::manejar la respuesta del servidor (puedes mostrar un mensaje de éxito, etc.):: */
			console.log('Testimonio agregado:', response.data);

			// Llama a la función para agregar el testimonio a Feedbacks
			addTestimonial(response.data);

			/* ::cerrar el modal después de agregar el testimonio:: */
			onClose();
		} catch (err) {
			console.error('Error al agregar el testimonio:', err);
		}
	};

	return (
		<ReactModal isOpen={isOpen} onRequestClose={onClose} className="modal">
			<form onSubmit={handlerNewTestimonial} encType="multipart/form-data" method="POST">
				<div className="bg-black-200 p-8 py-6 rounded-3xl w-full sm:w-[400px] md:w-[400px] lg:w-[400px] xl:w-[400px] 2xl:w-[400px] relative">
					<svg
						onClick={onClose}
						xmlns="http://www.w3.org/2000/svg"
						className="h-8 w-8 absolute top-2 right-2 cursor-pointer text-[#00cea8] bg-black-100 rounded-full p-2 shadow-md hover:bg-gray-300 hover:text-black"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
					<p className="text-white font-black text-[48px]">"</p>
					<div className="mt-1 flex flex-col justify-between h-[calc(90%-2rem)]">
						<div className="relative">
							<textarea
								className={`text-white font-medium text-[13px] w-full sm:w-[340px] h-[132px] mr-11 bg-black-100 rounded-md border border-white focus:outline-none focus:border-custom-focus ${
									newTestimonial.testimonial.length > 200 ? 'textarea-error' : ''
								}`}
								name="testimonial"
								value={newTestimonial.testimonial}
								onChange={(e) =>
									setNewTestimonial({ ...newTestimonial, testimonial: e.target.value })
								}
								placeholder="Testimonio"
								maxLength="230"
							/>
							<div className="absolute right-2 bottom-2 bg-gray-200 bg-opacity-40 text-black-200 text-xs px-1 py-1 rounded">
								<span>{230 - newTestimonial.testimonial.length} chars</span>
							</div>
						</div>
						<div className="mt-7 flex justify-between items-center gap-1">
							<div className="flex-1 flex flex-col">
								<input
									type="text"
									className="text-white font-medium text-[16px] w-full sm:w-auto bg-transparent border-b border-white focus:outline-none focus:border-custom-focus"
									name="name"
									value={newTestimonial.name}
									onChange={(e) =>
										setNewTestimonial({ ...newTestimonial, name: e.target.value })
									}
									placeholder="nombre"
								/>
								<div className="flex mt-3 mb-2">
									<input
										type="text"
										className="text-secondary text-[11px] w-full sm:w-auto bg-transparent border-b border-white focus:outline-none focus:border-custom-focus"
										name="designation"
										value={newTestimonial.designation}
										onChange={(e) =>
											setNewTestimonial({ ...newTestimonial, designation: e.target.value })
										}
										placeholder="cargo &/o profesión"
									/>
									<input
										type="text"
										className="text-secondary text-[11px] w-full sm:w-auto bg-transparent border-b border-white focus:outline-none focus:border-custom-focus ml-2"
										name="company"
										value={newTestimonial.company}
										onChange={(e) =>
											setNewTestimonial({ ...newTestimonial, company: e.target.value })
										}
										placeholder="compañia"
									/>
								</div>
							</div>
							<div className="w-10 h-10 ml-2 mb-5 rounded-full overflow-hidden">
								<input
									type="file"
									className="w-full h-full object-cover opacity-0 absolute"
									name="image"
									accept="image/*"
									onChange={handlerImageChange}
								/>
							</div>
							<img
								src={imagePreview}
								alt="Imagen por defecto"
								className="w-10 h-10 rounded-full object-cover bg-white"
							/>
						</div>
						<button
							type="submit"
							className="bg-black text-white font-bold rounded-md p-2 mt-4 transition-colors duration-300 hover:bg-custom-hover hover:text-black inline-block">
							Agregar
						</button>
					</div>
				</div>
			</form>
		</ReactModal>
	);
};

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
