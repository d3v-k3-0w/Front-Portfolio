import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { styles } from '../styles';
import { ComputersCanvas } from '.';

const Hero = () => {
  const [loop, setLoop] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(200 - Math.random() * 100);

  const toRotate = ['Kerwin'];
  const period = 300;

  const tick = () => {
    let i = loop % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoop(loop + 1);
      setDelta(300);
    }
  };

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  return (
    <>
      <section className='relative w-full h-screen mx-auto'>
        <div
          className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}>
          <div className='flex flex-col justify-center items-center mt-5'>
            <div className='w-5 h-5 rounded-full bg-[#00cea8]' />
            <div className='w-1 sm:h-80 h-40 green-pink-gradient' />
          </div>
          <div>
            <h1 className={`${styles.heroHeadText} text-white`}>
              <span className='sm:inline pr-2'>Hola, Soy</span>
              <span className='text-[#00cea8] block sm:inline h-[2em]'>{text}</span>
            </h1>
            <div className='h-10'>
              <p className={`${styles.heroSubText} mt-2 sm:inline text-white-100`}>
                Desarrollador de aplicaciones Web, <br className='sm:block hidden' />
                Interfaces & Backend.
              </p>
            </div>
          </div>
        </div>

        <ComputersCanvas />

        <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
          <a href='#about'>
            <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
              <motion.div
                animate={{
                  y: [0, 24, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
                className='w-3 h-3 rounded-full bg-secondary mb-1'
              />
            </div>
          </a>
        </div>
      </section>
    </>
  );
};

export default Hero;
