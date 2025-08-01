import { useState } from "react"
import { TrendingUp, Package, Clock, Truck, DollarSign, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { mockOrders } from "@/data/mockOrders"

export default function Analytics() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0])
  
  const filteredOrders = mockOrders.filter(order => order.orderDate === selectedDate)
  const totalOrders = filteredOrders.length
  const pendingOrders = filteredOrders.filter(o => o.status === 'pending').length
  const processingOrders = filteredOrders.filter(o => o.status === 'processing').length
  const shippedOrders = filteredOrders.filter(o => o.status === 'shipped').length
  const urgentOrders = filteredOrders.filter(o => o.daysLeftToPack <= 1).length
  
  const courierStats = mockOrders.reduce((acc, order) => {
    acc[order.courier] = (acc[order.courier] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const priorityStats = mockOrders.reduce((acc, order) => {
    acc[order.priority] = (acc[order.priority] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const averagePackingTime = mockOrders.reduce((sum, order) => sum + order.daysLeftToPack, 0) / totalOrders

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Order insights and performance metrics</p>
        </div>
      </div>

      {/* Date Selection */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <label htmlFor="analytics-date" className="text-sm font-medium">Select Date:</label>
            </div>
            <Input
              id="analytics-date"
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

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">{totalOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-warning" />
              <div>
                <p className="text-sm text-muted-foreground">Urgent Orders</p>
                <p className="text-2xl font-bold">{urgentOrders}</p>
                <p className="text-xs text-destructive">One day left</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Pending</span>
                <span className="text-sm font-medium">{pendingOrders} ({totalOrders > 0 ? Math.round((pendingOrders / totalOrders) * 100) : 0}%)</span>
              </div>
              <Progress value={totalOrders > 0 ? (pendingOrders / totalOrders) * 100 : 0} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Processing</span>
                <span className="text-sm font-medium">{processingOrders} ({totalOrders > 0 ? Math.round((processingOrders / totalOrders) * 100) : 0}%)</span>
              </div>
              <Progress value={totalOrders > 0 ? (processingOrders / totalOrders) * 100 : 0} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Shipped</span>
                <span className="text-sm font-medium">{shippedOrders} ({totalOrders > 0 ? Math.round((shippedOrders / totalOrders) * 100) : 0}%)</span>
              </div>
              <Progress value={totalOrders > 0 ? (shippedOrders / totalOrders) * 100 : 0} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Priority Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(priorityStats).map(([priority, count]) => (
              <div key={priority}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm capitalize">{priority}</span>
                  <span className="text-sm font-medium">{count} ({totalOrders > 0 ? Math.round((count / totalOrders) * 100) : 0}%)</span>
                </div>
                <Progress value={totalOrders > 0 ? (count / totalOrders) * 100 : 0} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Courier Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Courier Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(courierStats).map(([courier, count]) => (
              <div key={courier} className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">{courier}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Orders</span>
                    <span className="text-sm font-medium">{count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Share</span>
                    <span className="text-sm font-medium">{totalOrders > 0 ? Math.round((count / totalOrders) * 100) : 0}%</span>
                  </div>
                  <Progress value={totalOrders > 0 ? (count / totalOrders) * 100 : 0} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  )
}