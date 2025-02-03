import { axiosInstance } from "../../../api/axios";
import { PartData, PartResponse } from "../types";

export const partApi = {
    createPart: async (data: PartData): Promise<PartResponse> => {
        const response = await axiosInstance.post('/api/createPart', data);
        return response.data;
    },
    updatePart: async (id: string, data: PartData): Promise<PartResponse> => {
        const response = await axiosInstance.put(`/api/updatePart/${id}`, data);
        return response.data;
    },
    deletePart: async (id: string): Promise<PartResponse> => {
        const response = await axiosInstance.delete(`/api/deletePart/${id}`);
        return response.data;
    }
};