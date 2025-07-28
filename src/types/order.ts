export interface Order {
  orderId: string
  trackId: string
  courier: string
  daysLeftToPack: number
  productName: string
  customerName: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  priority: 'low' | 'medium' | 'high'
  orderDate: string
  expectedDelivery: string
  quantity: number
  dimensions: string
  weight: string
  material: string
  colors: { name: string; hex: string }[]
  shippingAddress: string
  notes?: string
}