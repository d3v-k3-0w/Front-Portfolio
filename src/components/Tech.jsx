import { BallCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Vector3 } from 'three';

const Tech = () => {
  const [technologies, setTechnologies] = useState([]);

  const positions = [
    new Vector3(-25, 2, 0),
    new Vector3(-18, 2, 0),
    new Vector3(-11, 2, 0),
    new Vector3(-4, 2, 0),
    new Vector3(3, 2, 0),
    new Vector3(10, 2, 0),
    new Vector3(17, 2, 0),
    new Vector3(24, 2, 0),
  ];

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
    <div className='flex justify-center'>
      <div className='w-full h-[350px]'>
        <BallCanvas technologies={technologies} positions={positions} />
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, '');
