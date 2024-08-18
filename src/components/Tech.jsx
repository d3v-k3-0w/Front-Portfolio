import { BallCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Tech = () => {
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/portfolio/techs`);

        setTechnologies(data);
      } catch (err) {
        console.log(err.message);
        throw new Error(`Infernal Error al realizar la solicitud: ${err.message}`);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='flex flex-row flex-wrap justify-center gap-10'>
      {technologies.map((technology) => (
        <div className='w-28 h-28' key={technology.name}>
          <BallCanvas icon={`${import.meta.env.VITE_API_URL}/assets/tech/${technology.icon}`} />
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, '');
