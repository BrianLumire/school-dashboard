import axios from 'axios';

const API_URL = 'https://api.towgig.glitexsolutions.co.ke/api/v1/auth';

// Create an axios instance with default settings
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to log in a user
export const loginUser = async (email: string, password: string) => {
    const response = await apiClient.post('/token/', {
        email,
        password,
    });
    return response.data; // Contains access and refresh tokens
};

// Function to refresh access token
export const refreshToken = async (refreshToken: string) => {
    const response = await apiClient.post('/token/refresh/', {
        refresh: refreshToken,
    });
    return response.data; // Contains new access token
};

// Function to check if an email exists
export const checkEmail = async (email: string) => {
    const response = await apiClient.post('/users/check/email/', {
        email,
    });
    return response.data; // Confirmation of email existence
};

// Function to send OTP to email
export const sendOtp = async (email: string) => {
    const response = await apiClient.post('/users/forgot/password/', {
        email,
    });
    return response.data; // Confirmation of OTP sent
};

// Function to check if the OTP is valid
export const checkOtp = async (otp: string) => {
    const response = await apiClient.post('/users/check/otp/', {
        otp,
    });
    return response.data; // Confirmation of OTP validity
};

// Function to reset the user's password
export const resetPassword = async (newPassword: string, otp: string) => {
    const response = await apiClient.post('/users/forgot/password/change/', {
        otp,
        password: newPassword,
        password2: newPassword,
    });
    return response.data; // Confirmation of password reset
};

// Function to change the user's password
export const changePassword = async (newPassword: string) => {
    const response = await apiClient.post('/users/change/password/', {
        password: newPassword,
        password2: newPassword,
    });
    return response.data; // Confirmation of password change
};

// Handle API errors
const handleError = (error: any) => {
    if (error.response) {
        throw new Error(error.response.data.detail || 'An error occurred');
    } else {
        throw new Error('Network error');
    }
};

export {
    handleError,
};
