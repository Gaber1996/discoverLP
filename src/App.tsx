import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import NoiseOverlay from './components/ui/NoiseOverlay';

import HomePage from './pages/HomePage';
import BuildWithUsPage from './pages/BuildWithUsPage';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-surface text-white">
      <ScrollToTop />
      <Header />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/build" element={<BuildWithUsPage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <Footer />
      <NoiseOverlay />
    </div>
  );
}

export default App;
