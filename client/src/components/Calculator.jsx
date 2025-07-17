// src/components/Calculator.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShops } from '../features/shops/shopSlice';
import { fetchProductsByShop } from '../features/products/productSlice';
import ProductDropdown from './ProductDropdown';

const SQM_CONVERSION = 10.7639;

const Calculator = () => {
  const dispatch = useDispatch();

  // shops slice
  const {
    shops,
    loading: shopsLoading,
    error: shopsError,
  } = useSelector(state => state.shops);

  // products slice
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector(state => state.products);

  // local state
  const [selectedShop, setSelectedShop] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [area, setArea] = useState('');
  const [unit, setUnit] = useState('sqft');

  // 1) Load shops once
  useEffect(() => {
    dispatch(fetchShops());
  }, [dispatch]);

  // 2) When shop picked, fetch its products
  useEffect(() => {
    if (selectedShop?._id) {
      dispatch(fetchProductsByShop(selectedShop._id));
      // reset downstream fields
      setSelectedProduct(null);
      setArea('');
    }
  }, [dispatch, selectedShop]);

  // shop selector handler
  const handleShopChange = e => {
    const shopId = e.target.value;
    const shop = shops.find(s => s._id === shopId) ?? null;
    setSelectedShop(shop);
  };

  // convert when unit changes
  const handleUnitChange = e => {
    const newUnit = e.target.value;
    if (area) {
      const val = parseFloat(area) || 0;
      const converted =
        newUnit === 'sqm' && unit === 'sqft'
          ? val / SQM_CONVERSION
          : newUnit === 'sqft' && unit === 'sqm'
          ? val * SQM_CONVERSION
          : val;
      setArea(converted.toFixed(2));
    }
    setUnit(newUnit);
  };

  // compute total
  const getTotalPrice = () => {
    if (!selectedProduct || !area) return '0.00';
    const rate = selectedProduct.ratePerSqFt;
    const effectiveSqFt =
      unit === 'sqft' ? parseFloat(area) : parseFloat(area) * SQM_CONVERSION;
    return (rate * effectiveSqFt).toFixed(2);
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 border">
      {/* 1) Shop selector */}
      <div className="mb-6">
        <label className="block font-medium mb-1">Select Shop</label>
        {shopsLoading ? (
          <p>Loading shops…</p>
        ) : shopsError ? (
          <p className="text-red-600">{shopsError}</p>
        ) : (
          <select
            value={selectedShop?._id || ''}
            onChange={handleShopChange}
            className="w-full p-2 border rounded focus:outline-blue-400"
          >
            <option value="">-- pick a shop --</option>
            {shops.map(shop => (
              <option key={shop._id} value={shop._id}>
                {shop.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* 2) Product dropdown */}
      <div className="mb-6">
        <label className="block font-medium mb-1">Select Product</label>
        <ProductDropdown
          products={products}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          disabled={!selectedShop || productsLoading || products.length === 0}
        />
        {productsLoading && <p className="text-blue-500 mt-1">Loading products…</p>}
        {productsError && <p className="text-red-600 mt-1">{productsError}</p>}
      </div>

      {/* 3) Area input */}
      <div className="mb-6">
        <label className="block font-medium mb-1">Enter Area ({unit})</label>
        <input
          type="number"
          value={area}
          onChange={e => setArea(e.target.value)}
          disabled={!selectedProduct}
          placeholder={`Area in ${unit}`}
          className="w-full p-2 border rounded focus:outline-blue-400"
        />
      </div>

      {/* 4) Unit selector */}
      <div className="mb-6">
        <label className="block font-medium mb-1">Unit</label>
        <select
          value={unit}
          onChange={handleUnitChange}
          disabled={!area}
          className="w-full p-2 border rounded focus:outline-blue-400"
        >
          <option value="sqft">sq.ft</option>
          <option value="sqm">sq.m</option>
        </select>
      </div>

      {/* 5) Total */}
      <div className="mt-8 text-xl font-semibold text-green-700">
        Total Price: ₹{getTotalPrice()}
      </div>
    </div>
  );
};

export default Calculator;
