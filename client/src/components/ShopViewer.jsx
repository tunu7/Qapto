// src/components/ShopViewer.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShops } from '../features/shops/shopSlice';

const ShopViewer = ({ selectedShop, setSelectedShop }) => {
  const dispatch = useDispatch();
  const { shops, loading, error } = useSelector((state) => state.shops);

  useEffect(() => {
    dispatch(fetchShops());
  }, [dispatch]);

  if (loading) {
    return <p className="text-blue-500">Loading shops...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  // If a shop is selected, show its detail (no back button here now)
  if (selectedShop) {
    return (
      <div className="bg-white border p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-2">{selectedShop.name}</h2>
        <p className="text-gray-600">
          {selectedShop.description || 'No description available.'}
        </p>
      </div>
    );
  }

  // If no shop is selected, show the list of shops
  return (
    <div className="bg-white border p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Select a Shop</h2>
      {shops.length === 0 && <p>No shops available.</p>}
      {shops.map((shop) => (
        <button
          key={shop._id}
          onClick={() => setSelectedShop(shop)}
          className="block w-full p-3 bg-blue-100 hover:bg-blue-200 rounded text-left mb-2 transition"
        >
          {shop.name}
        </button>
      ))}
    </div>
  );
};

export default ShopViewer;
