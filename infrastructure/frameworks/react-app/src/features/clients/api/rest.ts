import { axiosInstance } from "../../../api/axios";
import { ClientData, ClientResponse } from "../types";

export const clientApi = {
    createClient: async (data: ClientData): Promise<ClientResponse> => {
        const response = await axiosInstance.post('/api/clients', data);
        return response.data;
    },

    updateClient: async (id: string, data: ClientData): Promise<ClientResponse> => {
        const response = await axiosInstance.put(`/api/clients/${id}`, data);
        return response.data;
    },

    deleteClient: async (id: string): Promise<ClientResponse> => {
        const response = await axiosInstance.delete(`/api/clients/${id}`);
        return response.data;
    }
};