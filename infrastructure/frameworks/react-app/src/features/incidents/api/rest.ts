import { axiosInstance } from "../../../api/axios";
interface IncidentData {
    incident_date: string;
    type: string;
    severity: string;
    description: string;
    actions_taken: string;
   
  }
export const incidentApi = {
  createIncident: async (data: IncidentData) => {
    try {
      const response = await axiosInstance.post('/api/incidents', data);
      return response.data;
    } catch (error) {
      console.error('Error creating incident:', error);
      throw error;
    }
  },

  updateIncident: async (id: string, data: IncidentData) => {
    try {
      const response = await axiosInstance.put(`/api/incidents/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating incident:', error);
      throw error;
    }
  },

  deleteIncident: async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/api/incidents/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting incident:', error);
      throw error;
    }
  }
};