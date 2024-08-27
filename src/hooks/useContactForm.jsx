import { useState } from 'react';
import { toast } from 'react-toastify';

export const useContactForm = (onSubmit) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(`${import.meta.env.VITE_API_URL}/api/portfolio/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        toast.success('Gracias, me pondré en contacto contigo ;D');
        setForm({
          name: '',
          email: '',
          message: '',
        });
        if (onSubmit) onSubmit();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error('Algo salió mal.');
      });
  };

  return {
    form,
    loading,
    handleChange,
    handleSubmit,
  };
};
