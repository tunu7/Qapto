import React from 'react';

const ProductDropdown = ({
  products,
  selectedProduct,
  setSelectedProduct,
  disabled,
}) => {
  return (
    <div>
      <select
        value={selectedProduct?._id || ''}
        onChange={(e) =>
          setSelectedProduct(products.find((p) => p._id === e.target.value))
        }
        className="w-full p-2 border rounded focus:outline-blue-400"
        disabled={disabled}
      >
        <option value="">
          {disabled ? '-- Select a shop first --' : '-- Choose a product --'}
        </option>
        {products.map((product) => (
          <option key={product._id} value={product._id}>
            {product.name} (₹{product.ratePerSqFt}/sq.ft)
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductDropdown;
