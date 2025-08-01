import { Order } from "@/types/order"

export const mockOrders: Order[] = [
  {
    orderId: "ORD-2024-001",
    trackId: "TK-45X7Y9Z2",
    courier: "FedEx Express",
    daysLeftToPack: 3,
    productName: "Premium Canvas Tote Bag",
    customerName: "Sarah Johnson",
    status: "pending",
    priority: "high",
    orderDate: "2025-08-01",
    expectedDelivery: "2024-01-25",
    quantity: 2,
    dimensions: "40 x 35 x 10 cm",
    weight: "0.8 kg",
    material: "Organic Cotton Canvas",
    colors: [
      { name: "Navy Blue", hex: "#1e3a8a" },
      { name: "Forest Green", hex: "#166534" }
    ],
    shippingAddress: "123 Main St, New York, NY 10001",
    notes: "Customer requested eco-friendly packaging"
  },
  {
    orderId: "ORD-2024-002",
    trackId: "TK-89B3C4D5",
    courier: "UPS Standard",
    daysLeftToPack: 1,
    productName: "Custom Logo T-Shirt",
    customerName: "Michael Chen",
    status: "processing",
    priority: "medium",
    orderDate: "2025-08-01",
    expectedDelivery: "2024-01-22",
    quantity: 5,
    dimensions: "30 x 25 x 2 cm",
    weight: "0.6 kg",
    material: "100% Cotton",
    colors: [
      { name: "White", hex: "#ffffff" },
      { name: "Black", hex: "#000000" }
    ],
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90210"
  },
  {
    orderId: "ORD-2024-003",
    trackId: "TK-12E5F7G8",
    courier: "DHL Express",
    daysLeftToPack: 5,
    productName: "Wireless Bluetooth Headphones",
    customerName: "Emma Wilson",
    status: "pending",
    priority: "low",
    orderDate: "2025-08-01",
    expectedDelivery: "2024-01-28",
    quantity: 1,
    dimensions: "20 x 18 x 8 cm",
    weight: "0.3 kg",
    material: "ABS Plastic, Silicone",
    colors: [
      { name: "Matte Black", hex: "#2d2d2d" }
    ],
    shippingAddress: "789 Pine St, Chicago, IL 60601",
    notes: "Handle with care - electronics"
  },
  {
    orderId: "ORD-2024-004",
    trackId: "TK-34H8I9J0",
    courier: "USPS Priority",
    daysLeftToPack: 2,
    productName: "Ceramic Coffee Mug Set",
    customerName: "David Rodriguez",
    status: "shipped",
    priority: "medium",
    orderDate: "2025-08-01",
    expectedDelivery: "2024-01-20",
    quantity: 4,
    dimensions: "25 x 20 x 15 cm",
    weight: "1.2 kg",
    material: "Ceramic",
    colors: [
      { name: "Ocean Blue", hex: "#0ea5e9" },
      { name: "Sunset Orange", hex: "#f97316" }
    ],
    shippingAddress: "321 Elm Dr, Miami, FL 33101",
    notes: "Fragile item - use extra padding"
  },
  {
    orderId: "ORD-2024-005",
    trackId: "TK-56K1L2M3",
    courier: "Amazon Logistics",
    daysLeftToPack: 4,
    productName: "Yoga Mat with Carrying Strap",
    customerName: "Lisa Thompson",
    status: "pending",
    priority: "low",
    orderDate: "2025-08-01",
    expectedDelivery: "2024-01-30",
    quantity: 1,
    dimensions: "183 x 61 x 0.6 cm",
    weight: "1.0 kg",
    material: "TPE (Thermoplastic Elastomer)",
    colors: [
      { name: "Purple", hex: "#a855f7" }
    ],
    shippingAddress: "654 Maple Ln, Seattle, WA 98101"
  },
  {
    orderId: "ORD-2024-006",
    trackId: "TK-78N4O5P6",
    courier: "FedEx Ground",
    daysLeftToPack: 0,
    productName: "Kitchen Knife Set",
    customerName: "Robert Brown",
    status: "processing",
    priority: "high",
    orderDate: "2025-08-01",
    expectedDelivery: "2024-01-19",
    quantity: 1,
    dimensions: "35 x 20 x 5 cm",
    weight: "2.1 kg",
    material: "Stainless Steel, Wood",
    colors: [
      { name: "Natural Wood", hex: "#8b4513" },
      { name: "Steel Silver", hex: "#c0c0c0" }
    ],
    shippingAddress: "987 Cedar St, Denver, CO 80201",
    notes: "Sharp objects - secure packaging required"
  }
]