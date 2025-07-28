import { TrendingUp, Package, Clock, Truck, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { mockOrders } from "@/data/mockOrders"

export default function Analytics() {
  const totalOrders = mockOrders.length
  const pendingOrders = mockOrders.filter(o => o.status === 'pending').length
  const processingOrders = mockOrders.filter(o => o.status === 'processing').length
  const shippedOrders = mockOrders.filter(o => o.status === 'shipped').length
  const urgentOrders = mockOrders.filter(o => o.daysLeftToPack <= 1).length
  
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

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">{totalOrders}</p>
                <p className="text-xs text-success">+12% from last month</p>
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
                <p className="text-xs text-destructive">Needs immediate attention</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-bold">
                  {Math.round((shippedOrders / totalOrders) * 100)}%
                </p>
                <p className="text-xs text-success">+5% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Avg. Pack Time</p>
                <p className="text-2xl font-bold">{averagePackingTime.toFixed(1)} days</p>
                <p className="text-xs text-muted-foreground">Per order</p>
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
                <span className="text-sm font-medium">{pendingOrders} ({Math.round((pendingOrders / totalOrders) * 100)}%)</span>
              </div>
              <Progress value={(pendingOrders / totalOrders) * 100} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Processing</span>
                <span className="text-sm font-medium">{processingOrders} ({Math.round((processingOrders / totalOrders) * 100)}%)</span>
              </div>
              <Progress value={(processingOrders / totalOrders) * 100} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Shipped</span>
                <span className="text-sm font-medium">{shippedOrders} ({Math.round((shippedOrders / totalOrders) * 100)}%)</span>
              </div>
              <Progress value={(shippedOrders / totalOrders) * 100} className="h-2" />
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
                  <span className="text-sm font-medium">{count} ({Math.round((count / totalOrders) * 100)}%)</span>
                </div>
                <Progress value={(count / totalOrders) * 100} className="h-2" />
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
                    <span className="text-sm font-medium">{Math.round((count / totalOrders) * 100)}%</span>
                  </div>
                  <Progress value={(count / totalOrders) * 100} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-success/10 rounded-lg border border-success/20">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-sm font-medium text-success">Positive Trend</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Order processing time has improved by 15% this month
              </p>
            </div>

            <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-warning" />
                <span className="text-sm font-medium text-warning">Attention Needed</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {urgentOrders} orders have less than 2 days left to pack
              </p>
            </div>

            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Package className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Opportunity</span>
              </div>
              <p className="text-sm text-muted-foreground">
                FedEx Express handles the most high-priority orders
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}