import { motion } from 'framer-motion';
import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ServiceCard from './ServiceCard';

const About = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/portfolio/aboutservices`);

        // console.log(data); // Imprime los datos en la consola
        setServices(data);
      } catch (err) {
        throw new Error(`Infernal Error al realizar la solicitud: ${err.message}`);
      }
    };

    fetchData();
  }, []);

  // console.log(services); // Imprime el estado "services" en la consola

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introducción</p>
        <h2 className={styles.sectionHeadText}>Descripción general.</h2>
      </motion.div>

      <motion.p variants={fadeIn('', '', 0.1, 1)} className='mt-2 text-secondary text-[17px] max-w-3xl leading-[30px]'>
        Desarrollador de software con experiencia en Java, JavaScript, TypeScript y también en frameworks como React,
        Angular, Express.js y Three.js. Aprendo rápido y colaboro estrechamente con los colegas, para crear soluciones
        eficientes, escalables y fáciles de usar que resuelven problemas del mundo real.
      </motion.p>

      <div className='mt-10 flex flex-wrap justify-center gap-10 pb-5'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} className='w-full mobile-l:w-1/2 laptop:w-1/4' />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, 'about');
