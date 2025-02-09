import { axiosInstance } from "../../../api/axios";
import {
  CompanyRegistrationData,
  DealerRegistrationData,
  RegisterResponse,
} from "../../auth/types";
import {
  UpdateUserData,
  UpdateUserResponse,
  DeleteUserResponse,
} from "../types";

export const usersApi = {
  updateUser: async (
    userId: number,
    data: UpdateUserData
  ): Promise<UpdateUserResponse> => {
    const updateData = {
      email: data.email,
      type: data.type,
      password: data.password,
      additionalData:
        data.type === "COMPANY"
          ? {
              phone: data.company?.phone,
              address: data.company?.address,
              postalCode: data.company?.postalCode,
              city: data.company?.city,
              companyName: data.company?.companyName,
              siretNumber: data.company?.siretNumber,
            }
          : {
              phone: data.dealer?.phone,
              address: data.dealer?.address,
              postalCode: data.dealer?.postalCode,
              city: data.dealer?.city,
              name: data.dealer?.name,
              services: data.dealer?.services,
            },
    };
    const response = await axiosInstance.put(
      `/api/users/${userId}`,
      updateData
    );
    return response.data;
  },

  deleteUser: async (userId: number): Promise<DeleteUserResponse> => {
    const response = await axiosInstance.delete(`/api/users/${userId}`);
    return response.data;
  },
  createDealer: async (
    data: DealerRegistrationData
  ): Promise<RegisterResponse> => {
    const response = await axiosInstance.post("/api/signup", data);
    return response.data;
  },
  createCompany: async (
    data: CompanyRegistrationData
  ): Promise<RegisterResponse> => {
    const response = await axiosInstance.post("/api/signup", data);
    return response.data;
  },
};
