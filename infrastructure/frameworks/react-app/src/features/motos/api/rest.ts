import { axiosInstance } from "../../../api/axios";
import { MotorcycleData, MotorcycleResponse } from "../types";

export const motorcycleApi = {
    createMotorcycle: async (data: MotorcycleData): Promise<MotorcycleResponse> => {
        const response = await axiosInstance.post('/api/motorcycles', data);
        return response.data;
    },
    updateMotorcycle: async (data: MotorcycleData): Promise<MotorcycleResponse> => {
        const response = await axiosInstance.put(`/api/motorcycles/${data.id}`, data);
        return response.data;
    }
,
    deleteMotorcycle: async (id: string): Promise<MotorcycleResponse> => {
        const response = await axiosInstance.delete(`/api/motorcycles/${id}`);
        return response.data;
    }
}