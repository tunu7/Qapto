import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import FooterNav from './components/FooterNav';
import HomePage from './pages/HomePage';
import CalculatorPage from './pages/CalculatorPage';
import AccountPage from './pages/AccountPage';
import ShopProductsPage from './pages/ShopProductsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BecomeVendorPage from './pages/BecomeVendorPage'; // ✅ Corrected
import ProtectedRoute from './components/ProtectedRoute';

const App = () => (
  <div className="min-h-screen flex flex-col bg-gray-50 pb-16">
    <Navbar className="shadow-md bg-white" />

    <main className="flex-1 container mx-auto px-4 py-8">
      <Routes>
        {/* public */}
        <Route path="/" element={<HomePage />} />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/shop/:shopId" element={<ShopProductsPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/become-vendor" element={<BecomeVendorPage />} />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>

    <FooterNav />
  </div>
);

export default App;
