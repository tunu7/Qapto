import axiosInstance from '../../api/axiosInstance';

export const fetchProductsByShopIdAPI = async (shopId) => {
  const response = await axiosInstance.get(`/products/shop/${shopId}`);
  return response.data;
};
