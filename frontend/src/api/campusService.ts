import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Campus Interfaces
export interface Campus {
  id: string;
  name: string;
  location: string;
  created_at: string;
}

export interface CampusCreate {
  name: string;
  location: string;
}

export interface CampusUpdate {
  name?: string;
  location?: string;
}

// Campus Service
export const campusService = {
  async listAll(): Promise<Campus[]> {
    const response = await api.get<Campus[]>('/api/campuses');
    return response.data;
  },

  async create(data: CampusCreate): Promise<Campus> {
    const response = await api.post<Campus>('/api/campuses', data);
    return response.data;
  },

  async update(id: string, data: CampusUpdate): Promise<Campus> {
    const response = await api.patch<Campus>(`/api/campuses/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/api/campuses/${id}`);
  },
};
