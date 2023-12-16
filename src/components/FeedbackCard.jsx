import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motion';

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

export default FeedbackCard;
