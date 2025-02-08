import { axiosInstance } from "../../../api/axios";
import { TestMotoData, TestMotoResponse } from "../types";

export const testMotoApi = {
    createTestMoto: async (data: TestMotoData): Promise<TestMotoResponse> => {
        try {
            const response = await axiosInstance.post('/api/tests', data);
            return response.data;
        } catch (error) {
            console.error('Error creating test:', error);
            throw error;
        }
    },

    updateTestMoto: async (id: string, data: Partial<TestMotoData>): Promise<TestMotoResponse> => {
        try {
            const response = await axiosInstance.put(`/api/tests/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error updating test:', error);
            throw error;
        }
    },

    deleteTestMoto: async (id: string): Promise<TestMotoResponse> => {
        try {
            const response = await axiosInstance.delete(`/api/tests/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting test:', error);
            throw error;
        }
    },

    completeTestMoto: async (id: string, ending_mileage: number): Promise<TestMotoResponse> => {
        try {
            const response = await axiosInstance.put(`/api/tests/${id}`, {
                end_Date: new Date().toISOString(),
                ending_mileage,
                status: 'completed'
            });
            return response.data;
        } catch (error) {
            console.error('Error completing test:', error);
            throw error;
        }
    },

    cancelTestMoto: async (id: string, reason?: string): Promise<TestMotoResponse> => {
        try {
            const response = await axiosInstance.put(`/api/tests/${id}`, {
                status: 'cancelled',
                comments: reason
            });
            return response.data;
        } catch (error) {
            console.error('Error cancelling test:', error);
            throw error;
        }
    },

    startTestMoto: async (id: string): Promise<TestMotoResponse> => {
        try {
            const response = await axiosInstance.put(`/api/tests/${id}`, {
                status: 'in_progress',
                startDate: new Date().toISOString()
            });
            return response.data;
        } catch (error) {
            console.error('Error starting test:', error);
            throw error;
        }
    }
};