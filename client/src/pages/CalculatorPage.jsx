// src/pages/CalculatorPage.jsx
import React from 'react';
import Calculator from '../components/Calculator';

const CalculatorPage = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-6">Square‑Foot Price Calculator</h1>
    <Calculator />
  </div>
);

export default CalculatorPage;
