import { axiosInstance } from "../../../api/axios";
import { DriverData, DriverResponse } from "../types";

export const driverApi = {
    createDriver: async (data: DriverData): Promise<DriverResponse> => {
        const response = await axiosInstance.post('/api/createDriver', data);
        return response.data;
    },
    updateDriver: async (id: string,data: DriverData): Promise<DriverResponse> => {
        const response = await axiosInstance.put(`/api/updateDriver/${id}`, data);
        return response.data;
    }
,
    deleteDriver: async (id: string): Promise<DriverResponse> => {
        const response = await axiosInstance.delete(`/api/deleteDriver/${id}`);
        return response.data;
    }
}