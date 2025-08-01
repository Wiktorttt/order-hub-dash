import { Order } from "@/types/order";

const WEBHOOK_BASE_URL = "http://n8n.thesetwomanager.win/webhook-test";

const WEBHOOK_HEADERS = {
  "CF-Access-Client-Id": "9447cda6bb8e53ff6c5eed819bd05476.access",
  "CF-Access-Client-Secret": "eb1d92f06f95c41197583b80a9ae247d04b1dc400545c16a9ae247d04b1dc400545c16a9f3135147cd51148",
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
    const response = await fetch(`${WEBHOOK_BASE_URL}/get-orders`, {
      method: 'POST',
      headers: WEBHOOK_HEADERS,
      body: JSON.stringify(params)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch orders: ${response.statusText}`);
    }
    
    return response.json();
  },

  async getOrderById(orderId: string): Promise<Order> {
    const response = await fetch(`${WEBHOOK_BASE_URL}/get-order`, {
      method: 'POST',
      headers: WEBHOOK_HEADERS,
      body: JSON.stringify({ orderId })
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch order: ${response.statusText}`);
    }
    
    return response.json();
  },

  async getAnalytics(params: GetAnalyticsRequest): Promise<GetAnalyticsResponse> {
    const response = await fetch(`${WEBHOOK_BASE_URL}/get-analytics`, {
      method: 'POST',
      headers: WEBHOOK_HEADERS,
      body: JSON.stringify(params)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch analytics: ${response.statusText}`);
    }
    
    return response.json();
  },

  async getPrintOrders(params: PrintOrdersRequest): Promise<PrintOrdersResponse> {
    const response = await fetch(`${WEBHOOK_BASE_URL}/get-print-orders`, {
      method: 'POST',
      headers: WEBHOOK_HEADERS,
      body: JSON.stringify(params)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch print orders: ${response.statusText}`);
    }
    
    return response.json();
  }
};