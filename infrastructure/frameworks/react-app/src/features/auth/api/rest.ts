import { axiosInstance } from "../../../api/axios";
import { DealerRegistrationData, CompanyRegistrationData, RegisterResponse, LoginResponse, LoginData } from '../types';

export const authApi = {
  registerDealer: async (data: DealerRegistrationData): Promise<RegisterResponse> => {
    const response = await axiosInstance.post('/api/signup', data);
    return response.data;
  },
  registerCompany: async (data: CompanyRegistrationData): Promise<RegisterResponse> => {
    const response = await axiosInstance.post('/api/signup', data);
    return response.data;
  },
  login: async (data: LoginData): Promise<LoginResponse> => {
    const response = await axiosInstance.post('/api/login', data);
    return response.data;
  }
};