import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { About, Contact, Experience, Feedbacks, Hero, Navbar, StarsCanvas, Tech, Works } from './sections';

function App() {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <ToastContainer />
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Hero />
        </div>

        <About />
        <Experience />
        <Tech />
        <Works />
        <Feedbacks />

        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
