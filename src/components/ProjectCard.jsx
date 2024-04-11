import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motion';

const ProjectCard = ({
	index,
	name,
	description,
	tags,
	image,
	hostImg,
	hostLink,
	gitHubImg,
	gitHubLink,
}) => {
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
						className="w-full h-full object-cover rounded-xl"
					/>

					<div className="absolute inset-0 flex justify-end m-3 card-img_hover">
						<div
							onClick={() => window.open(gitHubLink, '_blank')}
							className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer">
							<img
								src={`http://localhost:5000/assets/projects/${gitHubImg}`}
								alt="github"
								className="w-1/2 h-1/2 object-contain"
							/>
						</div>
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

export default ProjectCard;
