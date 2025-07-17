// src/pages/ShopProductsPage.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchShops, setSelectedShop } from '../features/shops/shopSlice';
import { fetchProductsByShop } from '../features/products/productSlice';

const ShopProductsPage = () => {
  const { shopId } = useParams();
  const dispatch = useDispatch();

  // shops slice
  const {
    shops,
    loading: shopsLoading,
    error: shopsError,
    selectedShop,
  } = useSelector(state => state.shops);

  // products slice
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector(state => state.products);

  // 1) Ensure shops are loaded, then select the shop
  useEffect(() => {
    if (shops.length === 0) {
      dispatch(fetchShops());
    } else {
      const shop = shops.find(s => s._id === shopId);
      if (shop) dispatch(setSelectedShop(shop));
    }
  }, [shops, shopId, dispatch]);

  // 2) Fetch this shop's products
  useEffect(() => {
    dispatch(fetchProductsByShop(shopId));
  }, [dispatch, shopId]);

  // Loading / error states
  if (shopsLoading || productsLoading) return <p>Loading…</p>;
  if (shopsError) return <p className="text-red-500">{shopsError}</p>;
  if (productsError) return <p className="text-red-500">{productsError}</p>;

  // Final resolved shop object
  const shop = selectedShop || shops.find(s => s._id === shopId);
  if (!shop) return <p>Shop not found.</p>;

  return (
    <div className="container mx-auto px-4 py-8">

      {/* Shop Header */}
      <h2 className="text-3xl font-bold">{shop.name}</h2>
      {shop.description && (
        <p className="mt-2 text-gray-600">{shop.description}</p>
      )}

      {/* Products */}
      <h3 className="text-2xl font-semibold mt-6 mb-4">Products</h3>
      {products.length === 0 ? (
        <p className="text-gray-600">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product._id} className="bg-white rounded-lg shadow p-4">
              <div
                className="h-40 bg-gray-200 rounded-md bg-cover bg-center"
                style={{ backgroundImage: `url(${product.imageUrl})` }}
              />
              <h4 className="mt-4 font-semibold">{product.name}</h4>
              <p className="mt-2 text-sm text-gray-600">
                {product.description}
              </p>
              <p className="mt-1 font-medium">
                ₹{product.ratePerSqFt} / sq ft
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopProductsPage;
