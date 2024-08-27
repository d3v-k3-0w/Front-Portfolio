import { useRef } from 'react';
import { useContactForm } from '../hooks/useContactForm';

const ContactForm = ({ onSubmit }) => {
  const formRef = useRef();
  const { form, handleChange, handleSubmit } = useContactForm(onSubmit);

  return (
    <form ref={formRef} onSubmit={handleSubmit} className='mt-12 flex flex-col gap-8'>
      <label className='flex flex-col'>
        <span className='text-white font-medium mb-4'>Tú Nombre</span>
        <input
          type='text'
          name='name'
          value={form.name}
          onChange={handleChange}
          placeholder='¿Cuál es tu nombre?'
          className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
        />
      </label>
      <label className='flex flex-col'>
        <span className='text-white font-medium mb-4'>Tú Email</span>
        <input
          type='text'
          name='email'
          value={form.email}
          onChange={handleChange}
          placeholder='¿Cuál es tu email?'
          className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
        />
      </label>
      <label className='flex flex-col'>
        <span className='text-white font-medium mb-4'>Tú mensaje</span>
        <textarea
          rows='7'
          name='message'
          value={form.message}
          onChange={handleChange}
          placeholder='¿Qúe me quieres decir...?'
          className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
        />
      </label>
      <button
        type='submit'
        className='bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl'>
        Enviar
      </button>
    </form>
  );
};

export default ContactForm;
