import { Settings as SettingsIcon, Bell, Package, Truck, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export default function Settings() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your dashboard preferences and configurations</p>
        </div>
      </div>

      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Company Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company-name">Company Name</Label>
              <Input id="company-name" defaultValue="OrderFlow Industries" />
            </div>
            <div>
              <Label htmlFor="contact-email">Contact Email</Label>
              <Input id="contact-email" type="email" defaultValue="admin@orderflow.com" />
            </div>
          </div>
          <div>
            <Label htmlFor="company-address">Company Address</Label>
            <Input id="company-address" defaultValue="123 Business Park, Industrial City, IC 12345" />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      {/* Order Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Order Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="default-pack-days">Default Packing Days</Label>
              <Input id="default-pack-days" type="number" defaultValue="5" min="1" max="30" />
            </div>
            <div>
              <Label>Order ID Format</Label>
              <Select defaultValue="ord-year-number">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ord-year-number">ORD-YYYY-NNN</SelectItem>
                  <SelectItem value="year-month-number">YYYY-MM-NNN</SelectItem>
                  <SelectItem value="custom">Custom Format</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-archive">Auto-archive completed orders</Label>
                <p className="text-sm text-muted-foreground">Automatically move shipped orders to archive after 30 days</p>
              </div>
              <Switch id="auto-archive" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="priority-alerts">Priority order alerts</Label>
                <p className="text-sm text-muted-foreground">Show alerts for high-priority orders</p>
              </div>
              <Switch id="priority-alerts" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="urgent-notifications">Urgent order notifications</Label>
                <p className="text-sm text-muted-foreground">Get notified when orders have 1 day left to pack</p>
              </div>
              <Switch id="urgent-notifications" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="daily-summary">Daily summary</Label>
                <p className="text-sm text-muted-foreground">Receive daily order summary at 9:00 AM</p>
              </div>
              <Switch id="daily-summary" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="shipping-updates">Shipping updates</Label>
                <p className="text-sm text-muted-foreground">Get notified when orders are shipped</p>
              </div>
              <Switch id="shipping-updates" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Courier Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Courier Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <Label>Preferred Courier for Express Delivery</Label>
              <Select defaultValue="fedex">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fedex">FedEx Express</SelectItem>
                  <SelectItem value="ups">UPS Next Day Air</SelectItem>
                  <SelectItem value="dhl">DHL Express</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Preferred Courier for Standard Delivery</Label>
              <Select defaultValue="ups">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ups">UPS Ground</SelectItem>
                  <SelectItem value="fedex">FedEx Ground</SelectItem>
                  <SelectItem value="usps">USPS Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-tracking">Auto-generate tracking numbers</Label>
                <p className="text-sm text-muted-foreground">Automatically create tracking IDs for new orders</p>
              </div>
              <Switch id="auto-tracking" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="courier-sync">Sync with courier APIs</Label>
                <p className="text-sm text-muted-foreground">Keep shipping status updated in real-time</p>
              </div>
              <Switch id="courier-sync" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            Data Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <h4 className="font-medium">Export Data</h4>
              <p className="text-sm text-muted-foreground mb-2">Download your order data for backup or analysis</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Export as CSV</Button>
                <Button variant="outline" size="sm">Export as JSON</Button>
                <Button variant="outline" size="sm">Export as PDF Report</Button>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-medium text-destructive">Danger Zone</h4>
              <p className="text-sm text-muted-foreground mb-2">Irreversible actions that affect your data</p>
              <div className="flex gap-2">
                <Button variant="destructive" size="sm">Clear All Data</Button>
                <Button variant="outline" size="sm">Reset Settings</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}