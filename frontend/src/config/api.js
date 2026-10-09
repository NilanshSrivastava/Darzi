// Centralized API Base URL configuration for Local & Production Deployment
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL 
  ? import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '') 
  : 'http://localhost:8080';
