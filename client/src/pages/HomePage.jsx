// src/pages/HomePage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShops } from '../features/shops/shopSlice';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shops, loading, error } = useSelector(state => state.shops);

  useEffect(() => {
    dispatch(fetchShops());
  }, [dispatch]);

  const handleShopClick = shop => {
    navigate(`/shop/${shop._id}`);
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-indigo-600 text-white py-20 px-4 text-center rounded-lg mb-12">
        <h1 className="text-4xl md:text-6xl font-bold">Welcome to Qapto</h1>
        <p className="mt-4 text-lg md:text-xl">
          Manage your shops and calculations seamlessly
        </p>
      </section>

      {/* Shops */}
      <section className="container mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold mb-6">Our Shops</h2>

        {loading && <p>Loading shops…</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {shops.map(shop => (
            <div
              key={shop._id}
              onClick={() => handleShopClick(shop)}
              className="p-6 bg-white rounded-lg shadow hover:shadow-lg cursor-pointer transition"
            >
              <h3 className="text-xl font-semibold">{shop.name}</h3>
              {shop.description && (
                <p className="mt-2 text-gray-600 text-sm">
                  {shop.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default HomePage;
