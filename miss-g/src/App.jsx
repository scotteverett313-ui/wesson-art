import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import Gallery from './components/Gallery.jsx';
import About from './components/About.jsx';
import BookingForm from './components/BookingForm.jsx';
import Footer from './components/Footer.jsx';
import Splash, { shouldShowSplash } from './components/Splash.jsx';

export default function App() {
  const [splash, setSplash] = useState(() => shouldShowSplash());

  // Deep links like /#book (e.g. from an Instagram bio) land after the page renders.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  }, []);

  return (
    <>
      {splash && <Splash onDone={() => setSplash(false)} />}
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero ready={!splash} />
        <Services />
        <Gallery />
        <About />
        <BookingForm />
      </main>
      <Footer />
    </>
  );
}
