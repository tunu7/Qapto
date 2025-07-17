
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CalculatorPage from './pages/CalculatorPage';
import AccountPage from './pages/AccountPage';
import ShopProductsPage from './pages/ShopProductsPage';
import FooterNav from './components/FooterNav';

const App = () => (
  <div className="min-h-screen flex flex-col bg-gray-50 pb-16">
    <Navbar className="shadow-md bg-white" />

    <main className="flex-1 container mx-auto px-4 py-8">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/shop/:shopId" element={<ShopProductsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>

    <FooterNav />
  </div>
);

export default App;
