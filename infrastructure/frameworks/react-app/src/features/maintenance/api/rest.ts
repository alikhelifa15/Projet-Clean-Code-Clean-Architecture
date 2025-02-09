import { axiosInstance } from "../../../api/axios";


export const maintenanceApi = {
    createMaintenance: async (data: any): Promise<any> => {
        const response = await axiosInstance.post('/api/createMaintenance', data);
        return response.data;
    },
    // updateDriver: async (id: string,data: any): Promise<> => {
    //     const response = await axiosInstance.put(`/api/updateMaintenance/${id}`, data);
    //     return response.data;
    // }

    // deleteDriver: async (id: string): Promise<any> => {
    //     const response = await axiosInstance.delete(`/api/deleteMaintenance/${id}`);
    //     return response.data;
    // }
}