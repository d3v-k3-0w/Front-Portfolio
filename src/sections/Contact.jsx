import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import ContactForm from '../components/ContactForm';
import { SectionWrapper } from './hoc';
import { styles } from '../styles';
import { slideIn } from '../utils/motion';
import { EarthCanvas } from '.';

const Contact = () => {
  return (
    <div className='xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden'>
      <motion.div variants={slideIn('left', 'tween', 0.2, 1)} className='flex-[0.75] bg-black-100 p-8 rounded-2xl'>
        <p className={styles.sectionSubText}>Ponerse en contacto</p>
        <h3 className={styles.sectionHeadText}>Contácteme</h3>
        <ContactForm />
      </motion.div>

      <motion.div variants={slideIn('right', 'tween', 0.2, 1)} className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'>
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, 'contact');
