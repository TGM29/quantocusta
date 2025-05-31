import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import LandingPage from './pages/LandingPage';
import PricingCalculatorPage from './pages/PricingCalculatorPage';
import ContentPage from './pages/ContentPage';

export default function Router() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/calculator/pricing" element={<PricingCalculatorPage />} />
        <Route path="/content" element={<ContentPage />} />
      </Routes>
    </BrowserRouter>
  );
}
