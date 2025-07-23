import axiosInstance from '../../api/axiosInstance';

export const fetchProductsByShopIdAPI = async (shopId) => {
  const { data } = await axiosInstance.get(`/products/shop/${shopId}`);
  return data;
};

export const updateProductByIdAPI = async (id, updatedData) => {
  const { data } = await axiosInstance.put(`/products/${id}`, updatedData);
  return data;
};

export const deleteProductByIdAPI = async (id) => {
  await axiosInstance.delete(`/products/${id}`);
  return id;
};
