import { useState, useEffect } from "react"
import { Search, Package, Clock, Truck, Eye, Filter, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { OrderDetails } from "@/components/OrderDetails"
import { useDataMode } from "@/contexts/DataContext"
import { dataService } from "@/services/dataService"
import { Order } from "@/types/order"

export default function Orders() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0])
  const [orders, setOrders] = useState<Order[]>([])
  const [totals, setTotals] = useState({ total: 0, termo: 0, dn: 0, dachowki: 0, mixed: 0 })
  const [loading, setLoading] = useState(false)
  
  const { useRealData } = useDataMode()

  // Fetch orders data
  const fetchOrders = async () => {
    console.log('🔄 ORDERS PAGE - fetchOrders called');
    console.log('📅 Selected Date:', selectedDate);
    console.log('🎯 Status Filter:', statusFilter);
    console.log('🔀 Use Real Data:', useRealData);
    
    setLoading(true)
    try {
      const result = await dataService.getOrders({
        date: selectedDate,
        status: statusFilter === 'all' ? undefined : statusFilter
      }, useRealData)
      
      console.log('✅ ORDERS PAGE - Data received:', result);
      setOrders(result.orders)
      setTotals(result.totals)
    } catch (error) {
      console.error('💥 ORDERS PAGE - Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    console.log('🎬 ORDERS PAGE - useEffect triggered');
    console.log('📅 selectedDate changed to:', selectedDate);
    console.log('🎯 statusFilter changed to:', statusFilter);
    console.log('🔀 useRealData changed to:', useRealData);
    fetchOrders()
  }, [selectedDate, statusFilter, useRealData])

  // Filter orders by search term (client-side)
  const filteredOrders = searchQuery 
    ? orders.filter(order => 
        order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.trackId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.productName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : orders

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-warning'
      case 'processing': return 'bg-primary'
      case 'shipped': return 'bg-success'
      case 'delivered': return 'bg-muted'
      default: return 'bg-muted'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive'
      case 'medium': return 'bg-warning'
      case 'low': return 'bg-success'
      default: return 'bg-muted'
    }
  }

  const getDaysLeftColor = (days: number) => {
    if (days === 0) return 'text-destructive'
    if (days <= 2) return 'text-warning'
    return 'text-foreground'
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Orders Dashboard</h1>
          <p className="text-muted-foreground">Manage and track all your orders</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-sm">
            {filteredOrders.length} orders
          </Badge>
        </div>
      </div>

      {/* Date Selection */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <label htmlFor="order-date" className="text-sm font-medium">Select Date:</label>
            </div>
            <Input
              id="order-date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-48"
            />
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}
            >
              Today
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">{loading ? '...' : totals.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Termo</p>
                <p className="text-2xl font-bold">{loading ? '...' : totals.termo}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">D/N</p>
                <p className="text-2xl font-bold">{loading ? '...' : totals.dn}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Dachowki</p>
                <p className="text-2xl font-bold">{loading ? '...' : totals.dachowki}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Mixed</p>
                <p className="text-2xl font-bold">{loading ? '...' : totals.mixed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search orders, customers, products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.orderId}
                className="p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => setSelectedOrder(order)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <h3 className="font-semibold text-sm">{order.orderId}</h3>
                      <p className="text-xs text-muted-foreground">{order.customerName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{order.productName}</p>
                      <p className="text-xs text-muted-foreground">Track: {order.trackId}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Courier</p>
                      <p className="text-sm font-medium">{order.courier}</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Time Left</p>
                      <p className={`text-sm font-bold ${getDaysLeftColor(order.daysLeftToPack)}`}>
                        {order.daysLeftToPack} days
                      </p>
                    </div>

                    <div className="flex flex-col gap-1">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                      <Badge className={getPriorityColor(order.priority)} variant="outline">
                        {order.priority.charAt(0).toUpperCase() + order.priority.slice(1)}
                      </Badge>
                    </div>

                    <Button variant="ghost" size="sm">
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  )
}