import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import axios from 'axios';

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

export default Modal;
