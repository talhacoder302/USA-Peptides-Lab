// services/apiService.js
import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/v1";
const BASE_URL =
  "http://usapeptide-env.eba-gwmh4bqi.us-east-1.elasticbeanstalk.com/api/v1";

//Authentication//
export const login = (email, password) => {
  return axios.post(
    `${BASE_URL}/login`,
    { email, password },
    { withCredentials: true }
  );
};

export const sendSignupLink = (email) => {
  return axios.post(`${BASE_URL}/sendSignupLink`, { email });
};
export const completeSignup = (email, token, password) => {
  return axios.post(`${BASE_URL}/completeSignup/${token}/${email}`, {
    password,
  });
};
export const logout = () => {
  return axios.post(`${BASE_URL}/logout`, {
    withCredentials: true,
  });
};

export const getAllUsers = () => {
  return axios.get(`${BASE_URL}/getAllUsers`, {
    withCredentials: true,
  });
};

// Product Management
export const addProduct = (formData) => {
  return axios.post(`${BASE_URL}/addProduct`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
};
export const getProductList = () => {
  return axios.get(`${BASE_URL}/productList`, {
    withCredentials: true,
  });
};

export const deleteProduct = (productId) => {
  return axios.delete(`${BASE_URL}/deleteProduct/${productId}`, {
    withCredentials: true,
  });
};

export const updateProduct = (productId, formData) => {
  return axios.put(`${BASE_URL}/updateProduct/${productId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
};
export const getProductSummary = () => {
  return axios.get(`${BASE_URL}/productSummary`, {
    withCredentials: true,
  });
};
export const updatePriceAndStock = (productId, updateData) => {
  return axios.patch(`${BASE_URL}/updatePriceStock/${productId}`, updateData, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

// Contact API
export const submitContactForm = (contactData) => {
  return axios.post(`${BASE_URL}/contact`, contactData);
};
