import { useState } from "react"
import { Calendar, Download, FileText, Filter, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockOrders } from "@/data/mockOrders"

export default function PrintDocuments() {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [documentType, setDocumentType] = useState("packing-list")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredOrders = mockOrders.filter(order => {
    const orderDate = new Date(order.orderDate)
    const start = startDate ? new Date(startDate) : null
    const end = endDate ? new Date(endDate) : null
    
    const dateMatch = (!start || orderDate >= start) && (!end || orderDate <= end)
    const statusMatch = statusFilter === "all" || order.status === statusFilter
    
    return dateMatch && statusMatch
  })

  const handleOrderSelection = (orderId: string, checked: boolean) => {
    if (checked) {
      setSelectedOrders([...selectedOrders, orderId])
    } else {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrders(filteredOrders.map(order => order.orderId))
    } else {
      setSelectedOrders([])
    }
  }

  const handlePrint = () => {
    if (selectedOrders.length === 0) {
      alert("Please select at least one order to print")
      return
    }
    
    // Here you would implement the actual printing logic
    console.log("Printing documents for orders:", selectedOrders)
    alert(`Printing ${documentType} for ${selectedOrders.length} selected orders`)
  }

  const handleDownload = () => {
    if (selectedOrders.length === 0) {
      alert("Please select at least one order to download")
      return
    }
    
    // Here you would implement the actual download logic
    console.log("Downloading documents for orders:", selectedOrders)
    alert(`Downloading ${documentType} for ${selectedOrders.length} selected orders`)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Print Documents</h1>
          <p className="text-muted-foreground">Generate and print order documents</p>
        </div>
      </div>

      {/* Document Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Document Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={documentType} onValueChange={setDocumentType}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="packing-list">Packing List</SelectItem>
              <SelectItem value="shipping-label">Shipping Labels</SelectItem>
              <SelectItem value="invoice">Invoices</SelectItem>
              <SelectItem value="order-summary">Order Summary</SelectItem>
              <SelectItem value="customs-declaration">Customs Declaration</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Date Range and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="end-date">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div>
              <Label>Status Filter</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
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
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setStartDate("")
                  setEndDate("")
                  setStatusFilter("all")
                  setSelectedOrders([])
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Select Orders ({filteredOrders.length} available)</span>
            <div className="flex items-center gap-2">
              <Checkbox
                id="select-all"
                checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                onCheckedChange={handleSelectAll}
              />
              <Label htmlFor="select-all" className="text-sm">
                Select All
              </Label>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredOrders.map((order) => (
              <div
                key={order.orderId}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={selectedOrders.includes(order.orderId)}
                    onCheckedChange={(checked) => 
                      handleOrderSelection(order.orderId, checked as boolean)
                    }
                  />
                  <div>
                    <p className="font-medium">{order.orderId}</p>
                    <p className="text-sm text-muted-foreground">{order.customerName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{order.productName}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
            
            {filteredOrders.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No orders found for the selected date range and filters.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button 
              onClick={handlePrint}
              disabled={selectedOrders.length === 0}
              className="flex items-center gap-2"
            >
              <Printer className="h-4 w-4" />
              Print Documents ({selectedOrders.length})
            </Button>
            <Button 
              variant="outline"
              onClick={handleDownload}
              disabled={selectedOrders.length === 0}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download PDF ({selectedOrders.length})
            </Button>
          </div>
          
          {selectedOrders.length > 0 && (
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                Selected orders: {selectedOrders.join(", ")}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}