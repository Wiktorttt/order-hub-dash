import { Order } from "@/types/order";
import { mockOrders } from "@/data/mockOrders";
import { webhookService, GetOrdersRequest, GetAnalyticsRequest, PrintOrdersRequest } from "./webhookService";

// Mock data service functions
const mockDataService = {
  async getOrders(params: GetOrdersRequest) {
    let filteredOrders = mockOrders;
    
    if (params.date) {
      filteredOrders = filteredOrders.filter(order => order.orderDate === params.date);
    }
    
    if (params.status && params.status !== 'all') {
      filteredOrders = filteredOrders.filter(order => order.status === params.status);
    }

    if (params.priority && params.priority !== 'all') {
      filteredOrders = filteredOrders.filter(order => order.priority === params.priority);
    }

    // Calculate totals (mock logic for categories)
    const total = filteredOrders.length;
    const termo = Math.floor(total * 0.3);
    const dn = Math.floor(total * 0.25);
    const dachowki = Math.floor(total * 0.25);
    const mixed = total - termo - dn - dachowki;

    return {
      orders: filteredOrders,
      totals: { total, termo, dn, dachowki, mixed }
    };
  },

  async getOrderById(orderId: string): Promise<Order> {
    const order = mockOrders.find(o => o.orderId === orderId);
    if (!order) {
      throw new Error(`Order ${orderId} not found`);
    }
    return order;
  },

  async getAnalytics(params: GetAnalyticsRequest) {
    let filteredOrders = mockOrders;
    
    if (params.date) {
      filteredOrders = filteredOrders.filter(order => order.orderDate === params.date);
    }

    const totalOrders = filteredOrders.length;
    const urgentOrders = filteredOrders.filter(o => o.daysLeftToPack <= 1).length;
    
    const statusDistribution = {
      pending: filteredOrders.filter(o => o.status === 'pending').length,
      processing: filteredOrders.filter(o => o.status === 'processing').length,
      shipped: filteredOrders.filter(o => o.status === 'shipped').length,
    };

    const priorityDistribution = {
      high: filteredOrders.filter(o => o.priority === 'high').length,
      medium: filteredOrders.filter(o => o.priority === 'medium').length,
      low: filteredOrders.filter(o => o.priority === 'low').length,
    };

    const courierStats = filteredOrders.reduce((acc, order) => {
      acc[order.courier] = (acc[order.courier] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalOrders,
      urgentOrders,
      statusDistribution,
      priorityDistribution,
      courierStats
    };
  },

  async getPrintOrders(params: PrintOrdersRequest) {
    let filteredOrders = mockOrders;

    // Filter by date range
    if (params.startDate && params.endDate) {
      filteredOrders = filteredOrders.filter(order => 
        order.orderDate >= params.startDate && order.orderDate <= params.endDate
      );
    }

    if (params.status && params.status !== 'all') {
      filteredOrders = filteredOrders.filter(order => order.status === params.status);
    }

    return {
      orders: filteredOrders.map(order => ({
        orderId: order.orderId,
        productName: order.productName,
        customerName: order.customerName,
        status: order.status,
        orderDate: order.orderDate
      }))
    };
  }
};

// Data service that switches between mock and real data
export const dataService = {
  async getOrders(params: GetOrdersRequest, useRealData: boolean) {
    if (useRealData) {
      return await webhookService.getOrders(params);
    }
    return await mockDataService.getOrders(params);
  },

  async getOrderById(orderId: string, useRealData: boolean): Promise<Order> {
    if (useRealData) {
      return await webhookService.getOrderById(orderId);
    }
    return await mockDataService.getOrderById(orderId);
  },

  async getAnalytics(params: GetAnalyticsRequest, useRealData: boolean) {
    if (useRealData) {
      return await webhookService.getAnalytics(params);
    }
    return await mockDataService.getAnalytics(params);
  },

  async getPrintOrders(params: PrintOrdersRequest, useRealData: boolean) {
    if (useRealData) {
      return await webhookService.getPrintOrders(params);
    }
    return await mockDataService.getPrintOrders(params);
  }
};