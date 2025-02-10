import { axiosInstance } from "../../../api/axios";


const maintenanceApi = {
    createMaintenance: async (data: any): Promise<any> => {
        const response = await axiosInstance.post('/api/createMaintenance', data);
        return response.data;
    },

    getMaintenanceByMoto: async (id: string): Promise<any> => {
        console.log("Requête envoyée à :", `/api/getMaintenanceMoto/${id}`);
        const response = await axiosInstance.get(`/api/getMaintenanceMoto/${id}`);
        // Vérifie si une erreur est renvoyée
    if (response.data && response.data.error) {
        console.log("Erreur API :", response.data.error);
        return []; // Retourne un tableau vide si aucune maintenance n'est trouvée
    }
        console.log("Réponse API :", response.data);
        return response.data || [];
    },

    // updateMaintenance: async (id: string,data: any): Promise<> => {
    //     const response = await axiosInstance.put(`/api/updateMaintenance/${id}`, data);
    //     return response.data;
    // }

    // deleteMaintenance: async (id: string): Promise<any> => {
    //     const response = await axiosInstance.delete(`/api/deleteMaintenance/${id}`);
    //     return response.data;
    // }
}
export default maintenanceApi;