import { Order } from "@/types/order";

const WEBHOOK_BASE_URL = "https://nginx.thesetwomanager.win/webhook-test";

const WEBHOOK_HEADERS = {
  "Content-Type": "application/json"
};

export interface GetOrdersRequest {
  date?: string;
  status?: string;
  priority?: string;
}

export interface GetOrdersResponse {
  orders: Order[];
  totals: {
    total: number;
    termo: number;
    dn: number;
    dachowki: number;
    mixed: number;
  };
}

export interface GetAnalyticsRequest {
  date?: string;
  startDate?: string;
  endDate?: string;
}

export interface GetAnalyticsResponse {
  totalOrders: number;
  urgentOrders: number;
  statusDistribution: {
    pending: number;
    processing: number;
    shipped: number;
  };
  priorityDistribution: {
    high: number;
    medium: number;
    low: number;
  };
  courierStats: Record<string, number>;
}

export interface PrintOrdersRequest {
  startDate: string;
  endDate: string;
  station: "station1" | "station2" | "both";
  status?: string;
}

export interface PrintOrdersResponse {
  orders: Array<{
    orderId: string;
    productName: string;
    customerName: string;
    status: string;
    orderDate: string;
  }>;
}

export const webhookService = {
  async getOrders(params: GetOrdersRequest): Promise<GetOrdersResponse> {
    const url = `${WEBHOOK_BASE_URL}/get-orders`;
    const payload = JSON.stringify(params);
    
    console.log('🚀 WEBHOOK DEBUG - getOrders');
    console.log('📍 URL:', url);
    console.log('📦 Payload:', payload);
    console.log('🔑 Headers:', WEBHOOK_HEADERS);
    console.log('⏰ Timestamp:', new Date().toISOString());
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: WEBHOOK_HEADERS,
        body: payload
      });
      
      console.log('📡 Response Status:', response.status);
      console.log('📡 Response OK:', response.ok);
      
      if (!response.ok) {
        console.error('❌ Response not OK:', response.statusText);
        throw new Error(`Failed to fetch orders: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ Response Data:', data);
      return data;
    } catch (error) {
      console.error('💥 Webhook Error (getOrders):', error);
      console.error('💥 Error details:', {
        message: error.message,
        stack: error.stack,
        url,
        payload
      });
      throw error;
    }
  },

  async getOrderById(orderId: string): Promise<Order> {
    const url = `${WEBHOOK_BASE_URL}/get-order`;
    const payload = JSON.stringify({ orderId });
    
    console.log('🚀 WEBHOOK DEBUG - getOrderById');
    console.log('📍 URL:', url);
    console.log('📦 Payload:', payload);
    console.log('🔑 Headers:', WEBHOOK_HEADERS);
    console.log('⏰ Timestamp:', new Date().toISOString());
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: WEBHOOK_HEADERS,
        body: payload
      });
      
      console.log('📡 Response Status:', response.status);
      console.log('📡 Response Headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        console.error('❌ Response not OK:', response.statusText);
        throw new Error(`Failed to fetch order: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ Response Data:', data);
      return data;
    } catch (error) {
      console.error('💥 Webhook Error (getOrderById):', error);
      console.error('💥 Error details:', {
        message: error.message,
        stack: error.stack,
        url,
        payload
      });
      throw error;
    }
  },

  async getAnalytics(params: GetAnalyticsRequest): Promise<GetAnalyticsResponse> {
    const url = `${WEBHOOK_BASE_URL}/get-analytics`;
    const payload = JSON.stringify(params);
    
    console.log('🚀 WEBHOOK DEBUG - getAnalytics');
    console.log('📍 URL:', url);
    console.log('📦 Payload:', payload);
    console.log('🔑 Headers:', WEBHOOK_HEADERS);
    console.log('⏰ Timestamp:', new Date().toISOString());
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: WEBHOOK_HEADERS,
        body: payload
      });
      
      console.log('📡 Response Status:', response.status);
      console.log('📡 Response Headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        console.error('❌ Response not OK:', response.statusText);
        throw new Error(`Failed to fetch analytics: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ Response Data:', data);
      return data;
    } catch (error) {
      console.error('💥 Webhook Error (getAnalytics):', error);
      console.error('💥 Error details:', {
        message: error.message,
        stack: error.stack,
        url,
        payload
      });
      throw error;
    }
  },

  async getPrintOrders(params: PrintOrdersRequest): Promise<PrintOrdersResponse> {
    const url = `${WEBHOOK_BASE_URL}/get-print-orders`;
    const payload = JSON.stringify(params);
    
    console.log('🚀 WEBHOOK DEBUG - getPrintOrders');
    console.log('📍 URL:', url);
    console.log('📦 Payload:', payload);
    console.log('🔑 Headers:', WEBHOOK_HEADERS);
    console.log('⏰ Timestamp:', new Date().toISOString());
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: WEBHOOK_HEADERS,
        body: payload
      });
      
      console.log('📡 Response Status:', response.status);
      console.log('📡 Response Headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        console.error('❌ Response not OK:', response.statusText);
        throw new Error(`Failed to fetch print orders: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ Response Data:', data);
      return data;
    } catch (error) {
      console.error('💥 Webhook Error (getPrintOrders):', error);
      console.error('💥 Error details:', {
        message: error.message,
        stack: error.stack,
        url,
        payload
      });
      throw error;
    }
  }
};
