import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductsByShop,
  updateProduct,
  deleteProduct,
} from '../features/products/productSlice';

const ProductsManager = ({ shopId }) => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.products);
  const [edits, setEdits] = useState({});

  useEffect(() => {
    if (shopId) dispatch(fetchProductsByShop(shopId));
  }, [dispatch, shopId]);

  const handleChange = (id, field, value) => {
    setEdits(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: value }
    }));
  };

  const handleSave = (id) => {
    const data = edits[id];
    dispatch(updateProduct({ id, data }));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  if (loading) return <p>Loading products…</p>;
  if (error)   return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        Manage Your Products
      </h3>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="space-y-4">
          {products.map(p => {
            const draft = edits[p._id] ?? {
              name: p.name,
              description: p.description,
              ratePerSqFt: p.ratePerSqFt,
            };

            return (
              <div key={p._id} className="border p-4 rounded-lg">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  <input
                    className="border p-2 rounded"
                    value={draft.name}
                    onChange={e => handleChange(p._id, 'name', e.target.value)}
                  />
                  <input
                    className="border p-2 rounded"
                    value={draft.description || ''}
                    onChange={e => handleChange(p._id, 'description', e.target.value)}
                  />
                  <input
                    type="number"
                    className="border p-2 rounded"
                    value={draft.ratePerSqFt}
                    onChange={e => handleChange(p._id, 'ratePerSqFt', e.target.value)}
                  />
                </div>
                <div className="mt-2 flex space-x-2">
                  <button
                    onClick={() => handleSave(p._id)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductsManager;
