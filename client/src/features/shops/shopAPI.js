import axiosInstance from '../../api/axiosInstance';

export const fetchShopsAPI = async () => {
  const response = await axiosInstance.get('/shops');
  return response.data;
};
