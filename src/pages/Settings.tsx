import { Settings as SettingsIcon, Bell, Package, User, Link } from "lucide-react"
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

      {/* Baselinker Account */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            Baselinker Account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Select Account</Label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Accounts</SelectItem>
                <SelectItem value="account-1">Production Account</SelectItem>
                <SelectItem value="account-2">Staging Account</SelectItem>
                <SelectItem value="account-3">Development Account</SelectItem>
                <SelectItem value="account-4">Test Account</SelectItem>
                <SelectItem value="account-5">Backup Account</SelectItem>
              </SelectContent>
            </Select>
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
          </div>
        </CardContent>
      </Card>
    </div>
  )
}