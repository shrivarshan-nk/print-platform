import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Shop Enums & Types
export type ExecutionMode = 'manual' | 'assisted' | 'auto';
export type PaymentMode = 'counter' | 'prepaid' | 'both';

// Shop Interfaces
export interface Shop {
  id: string;
  campus_id: string;
  name: string;
  execution_mode: ExecutionMode;
  payment_mode: PaymentMode;
  is_active: boolean;
  created_at: string;
}

export interface ShopCreate {
  campus_id: string;
  name: string;
  execution_mode: ExecutionMode;
  payment_mode: PaymentMode;
  is_active?: boolean;
}

export interface ShopUpdate {
  name?: string;
  execution_mode?: ExecutionMode;
  payment_mode?: PaymentMode;
  is_active?: boolean;
}

// Shop Service
export const shopService = {
  async listAll(): Promise<Shop[]> {
    const response = await api.get<Shop[]>('/api/shops');
    return response.data;
  },

  async listByCampus(campusId: string): Promise<Shop[]> {
    const response = await api.get<Shop[]>('/api/shops');
    return response.data.filter((shop) => shop.campus_id === campusId);
  },

  async create(data: ShopCreate): Promise<Shop> {
    const response = await api.post<Shop>('/api/shops', data);
    return response.data;
  },

  async update(id: string, data: ShopUpdate): Promise<Shop> {
    const response = await api.patch<Shop>(`/api/shops/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/api/shops/${id}`);
  },

  getExecutionModeLabel(mode: ExecutionMode): string {
    const labels: Record<ExecutionMode, string> = {
      manual: '✍️ Manual',
      assisted: '⚙️ Assisted',
      auto: '🚀 Automated',
    };
    return labels[mode];
  },

  getPaymentModeLabel(mode: PaymentMode): string {
    const labels: Record<PaymentMode, string> = {
      counter: 'Pay @ Counter',
      prepaid: 'Prepaid',
      both: 'Both Options',
    };
    return labels[mode];
  },
};
