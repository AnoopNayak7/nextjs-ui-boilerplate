import axiosInstance from './axios';

// Types
export interface LoginRequest {
  email: string;
  password: string;
  clientType: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: string;
      isActive: boolean;
      isVerified: boolean;
      createdAt: string;
      updatedAt: string;
    };
    token: string;
  };
}

export interface ErrorResponse {
  success: false;
  error: {
    statusCode: number;
    message: string;
  };
}

// Auth API endpoints
export const authApi = {
  login: async (data: LoginRequest): Promise<any> => {
    try {
      const response = await axiosInstance.post('/auth/login', data);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
  
  logout: async (): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await axiosInstance.post('/auth/logout');
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
  
  getCurrentUser: async () => {
    try {
      const response = await axiosInstance.get('/auth/me');
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
};

// Properties API endpoints
export const propertiesApi = {
  getAll: async (params?: any) => {
    try {
      const response = await axiosInstance.get('/properties', { params });
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
  
  getById: async (id: string) => {
    try {
      const response = await axiosInstance.get(`/properties/${id}`);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
  
  create: async (data: any) => {
    try {
      const response = await axiosInstance.post('/properties', data);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
  
  update: async (id: string, data: any) => {
    try {
      const response = await axiosInstance.put(`/properties/${id}`, data);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
  
  delete: async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/properties/${id}`);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
};

// Agents API endpoints
export const agentsApi = {
  getAll: async (params?: any) => {
    try {
      const response = await axiosInstance.get('/agents', { params });
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
  
  getById: async (id: string) => {
    try {
      const response = await axiosInstance.get(`/agents/${id}`);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
};

// Users API endpoints
export const usersApi = {
  getAll: async (params?: any) => {
    try {
      const response = await axiosInstance.get('/users', { params });
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
  
  getById: async (id: string) => {
    try {
      const response = await axiosInstance.get(`/users/${id}`);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
};