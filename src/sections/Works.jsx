import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { SectionWrapper } from './hoc';
import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';
import ProjectCard from '../components/ProjectCard';

const Works = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/portfolio/projects`);

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

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'>
          Los siguientes proyectos muestran mis habilidades y experiencia a través de ejemplos del mundo real en mis
          practicas. Cada proyecto se describe brevemente también tiene un enlace en la parte superior que te lleva al
          dominio de la pagina. Refleja mi capacidad para resolver problemas complejos, trabajar con diferentes
          tecnologías y gestionar proyectos de forma eficaz.
        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap justify-center gap-7'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} className='tablet:w-1/2 laptop:w-1/2' />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, '');
