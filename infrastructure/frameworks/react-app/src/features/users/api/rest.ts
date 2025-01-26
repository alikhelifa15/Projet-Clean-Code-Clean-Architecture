import { axiosInstance } from "../../../api/axios";
import { CompanyRegistrationData, DealerRegistrationData, RegisterResponse } from "../../auth/types";
import { UpdateUserData, UpdateUserResponse, DeleteUserResponse } from '../types';

 
export const usersApi = {
    /**
     * Updates a user by their ID.
     * @param {number} userId - The ID of the user to update.
     * @param {UpdateUserData} data - The data to update the user with.
     * @returns {Promise<UpdateUserResponse>} - A promise with the response of the API call.
     */
    updateUser: async (userId: number, data: UpdateUserData): Promise<UpdateUserResponse> => {
   
     
      const updateData = {
        email: data.email,
        type: data.type,
        password: data.password,
        additionalData: data.type === 'COMPANY' ? {
          phone: data.company?.phone,
          address: data.company?.address,
          postalCode: data.company?.postalCode, 
          city: data.company?.city,
          companyName: data.company?.companyName,
          siretNumber: data.company?.siretNumber
        } : {
          phone: data.dealer?.phone,
          address: data.dealer?.address,
          postalCode: data.dealer?.postalCode,
          city: data.dealer?.city,
          name: data.dealer?.name,
          services: data.dealer?.services
        }
      };
    console.log(updateData);
      const response = await axiosInstance.put(`/api/users/${userId}`, updateData);
      return response.data;
     },
      /**
       * Deletes a user by their ID.
       * @param {number} userId - The ID of the user to delete.
       * @returns {Promise<DeleteUserResponse>} - A promise with the response of the API call.
       */
      deleteUser: async (userId: number): Promise<DeleteUserResponse> => {
        const response = await axiosInstance.delete(`/api/users/${userId}`);
        return response.data;
      }
       ,
       createDealer: async (data: DealerRegistrationData): Promise<RegisterResponse> => {
         const response = await axiosInstance.post('/api/signup', data);
         return response.data;
       },
       createCompany: async (data: CompanyRegistrationData): Promise<RegisterResponse> => {
         const response = await axiosInstance.post('/api/signup', data);
         return response.data;
       }
};