import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motion';

const ServiceCard = ({ index, title, icon }) => (
  /* recordarme que mayores al breakpoint <tablet> los Tilts tendran 250px y menores <tablet> tendran 350px */
  <Tilt className='tablet:w-[250px] w-[350px]'>
    <motion.div
      variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'>
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'>
        <img
          src={`${import.meta.env.VITE_API_URL}/assets/services/${icon}`}
          http:alt='web-development'
          className='w-16 h-16 object-contain'
        />

        <h3 className='text-white text-[20px] font-bold text-center'>{title}</h3>
      </div>
    </motion.div>
  </Tilt>
);

export default ServiceCard;
