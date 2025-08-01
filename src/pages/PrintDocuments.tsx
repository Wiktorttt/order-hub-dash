import { useState, useEffect } from "react"
import { Calendar, Download, FileText, Filter, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDataMode } from "@/contexts/DataContext"
import { dataService } from "@/services/dataService"

export default function PrintDocuments() {
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0])
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().split('T')[0])
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [documentType, setDocumentType] = useState("both")
  const [statusFilter, setStatusFilter] = useState("all")
  const [orders, setOrders] = useState<Array<{
    orderId: string;
    productName: string;
    customerName: string;
    status: string;
    orderDate: string;
  }>>([])
  const [loading, setLoading] = useState(false)
  
  const { useRealData } = useDataMode()

  const fetchPrintOrders = async () => {
    setLoading(true)
    try {
      const result = await dataService.getPrintOrders({
        startDate,
        endDate,
        station: documentType as "station1" | "station2" | "both",
        status: statusFilter === 'all' ? undefined : statusFilter
      }, useRealData)
      
      setOrders(result.orders)
    } catch (error) {
      console.error('Failed to fetch print orders:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPrintOrders()
  }, [startDate, endDate, documentType, statusFilter, useRealData])

  const handleOrderSelection = (orderId: string, checked: boolean) => {
    if (checked) {
      setSelectedOrders([...selectedOrders, orderId])
    } else {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrders(orders.map(order => order.orderId))
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
              <SelectItem value="station1">Station 1</SelectItem>
              <SelectItem value="station2">Station 2</SelectItem>
              <SelectItem value="both">Both</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Date Range */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Date Range
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
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
            <div className="flex items-end">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  const today = new Date().toISOString().split('T')[0]
                  setStartDate(today)
                  setEndDate(today)
                }}
              >
                Today
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div>
              <Label>Status Filter</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
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
            <span>Select Orders ({loading ? '...' : orders.length} available)</span>
            <div className="flex items-center gap-2">
              <Checkbox
                id="select-all"
                checked={selectedOrders.length === orders.length && orders.length > 0}
                onCheckedChange={handleSelectAll}
                disabled={loading}
              />
              <Label htmlFor="select-all" className="text-sm">
                Select All
              </Label>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">
                Loading orders...
              </div>
            ) : orders.map((order) => (
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
                    <p className="text-sm text-muted-foreground">{order.productName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{order.customerName}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
            
            {!loading && orders.length === 0 && (
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
              disabled={selectedOrders.length === 0 || loading}
              className="flex items-center gap-2"
            >
              <Printer className="h-4 w-4" />
              Print Documents ({selectedOrders.length})
            </Button>
            <Button 
              variant="outline"
              onClick={handleDownload}
              disabled={selectedOrders.length === 0 || loading}
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