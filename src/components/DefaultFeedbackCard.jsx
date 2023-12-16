import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motion';

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

export default DefaultFeedbackCard;
