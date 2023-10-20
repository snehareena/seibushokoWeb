import instance from "./axiosInstance";

// Function to format error messages
const formatErrorMessage = (errorData) => {
  if (typeof errorData === 'object' && Object.keys(errorData).length === 1) {
    // Handle single key-value pair
    const key = Object.keys(errorData)[0];
    return ` ${errorData[key]}`;
  } else {
    // Handle multiple key-value pairs
    return Object.keys(errorData)
      .map(key => ` ${errorData[key]}`)
      .join(', ');
  }
};

// Common function to handle requests and errors
const handleRequest = async (requestFn, ...params) => {
  try {
    const response = await requestFn(...params);
    return response.data;
  } catch (error) {
    throw formatErrorMessage(error.response.data);
  }
};

// GET request
export const get = async (url) => {
  return handleRequest(instance.get, url);
};

// POST request
export const post = async (url, data) => {
  return handleRequest(instance.post, url, data);
};

// PUT request
export const put = async (url, data) => {
  return handleRequest(instance.put, url, data);
};

// DELETE request
export const del = async (url) => {
  return handleRequest(instance.delete, url);
};

// PATCH request
export const patch = async (url,data) => {
  return handleRequest(instance.patch, url, data);
}
