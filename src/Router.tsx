import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import LandingPage from './pages/LandingPage';
import PricingCalculatorPage from './pages/PricingCalculatorPage';
// import ContentPage from './pages/ContentPage';
import PackageCalculatorPage from './pages/PackageCalculatorPage';
import PostPage from './pages/PostPage';
import ProjectHourlyCalculatorPage from './pages/ProjectHourlyCalculatorPage';
import VacationReserveCalculatorPage from './pages/VacationReserveCalculatorPage';

export default function Router() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/calculator/pricing" element={<PricingCalculatorPage />} />
        <Route path="/content/:slug" element={<PostPage />} />
        <Route path="/content" element={<PostPage />} />
        <Route path="/calculator/packages" element={<PackageCalculatorPage />} />
        <Route path="/calculator/project-hourly" element={<ProjectHourlyCalculatorPage />} />
        <Route path="/calculator/vacation-reserve" element={<VacationReserveCalculatorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
