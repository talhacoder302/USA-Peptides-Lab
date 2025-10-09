// services/apiService.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1";
// const BASE_URL =
//   "http://usapeptide-env.eba-gwmh4bqi.us-east-1.elasticbeanstalk.com/api/v1";



const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

// Interceptor for handling 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/my-accounts"; // Redirect on 401
    }
    return Promise.reject(error);
  }
);



//Authentication//
export const login = (email, password) => {
  return api.post(
    `${BASE_URL}/login`,
    { email, password },
    { withCredentials: true }
  );
};

export const sendSignupLink = (email) => {
  return api.post(`${BASE_URL}/sendSignupLink`, { email });
};
export const completeSignup = (email, token, password) => {
  return api.post(`${BASE_URL}/completeSignup/${token}/${email}`, {
    password,
  });
};
export const logout = () => {
  return api.post(
    `${BASE_URL}/logout`,
    {},
    { withCredentials: true }
  );
};

export const getMe = () => {
  return api.get(`${BASE_URL}/getMe`, {
    withCredentials: true,
  });
};
export const updateUserProfile = (updateData) => {
  return api.put(`${BASE_URL}/updateUserProfile`, updateData, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};


export const getAllUsers = () => {
  return api.get(`${BASE_URL}/getAllUsers`, {
    withCredentials: true,
  });
};

// Product Management
export const addProduct = (formData) => {
  return api.post(`${BASE_URL}/addProduct`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
};
export const getProductList = () => {
  return api.get(`${BASE_URL}/productList`, {
    withCredentials: true,
  });
};

export const deleteProduct = (productId) => {
  return api.delete(`${BASE_URL}/deleteProduct/${productId}`, {
    withCredentials: true,
  });
};

export const updateProduct = (productId, formData) => {
  return api.put(`${BASE_URL}/updateProduct/${productId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
};
export const getProductSummary = () => {
  return api.get(`${BASE_URL}/productSummary`, {
    withCredentials: true,
  });
};
export const updatePriceAndStock = (productId, updateData) => {
  return api.patch(`${BASE_URL}/updatePriceStock/${productId}`, updateData, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

// Contact API
export const submitContactForm = (contactData) => {
  return api.post(`${BASE_URL}/contact`, contactData);
};

export const updateUserAddress = (addressData) => {
  return api.put(`${BASE_URL}/updateUserAddress`, addressData, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};
