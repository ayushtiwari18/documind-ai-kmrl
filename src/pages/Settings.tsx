// src/pages/Settings.tsx
import { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Globe,
  Monitor,
  Database,
  Users,
  Settings as SettingsIcon,
  Save,
  Key,
  Mail,
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [urgentAlerts, setUrgentAlerts] = useState(true);
  const [language, setLanguage] = useState("english");

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        isLoggedIn={true}
        userRole="System Administrator"
        notifications={2}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Settings & Configuration
          </h1>
          <p className="text-muted-foreground">
            Manage your account preferences and system configuration
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger
              value="profile"
              className="flex items-center space-x-2"
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center space-x-2"
            >
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="flex items-center space-x-2"
            >
              <Shield className="w-4 h-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center space-x-2">
              <SettingsIcon className="w-4 h-4" />
              <span>System</span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Admin</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="card-enterprise">
              <h3 className="text-lg font-semibold mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Rajesh" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Kumar" />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="rajesh.kumar@kochimetro.org"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+91 98765 43210" />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select defaultValue="operations">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="operations">Operations</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="customer-service">
                        Customer Service
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue="Document Manager" readOnly />
                </div>
              </div>
              <Button className="mt-4 btn-success">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <div className="card-enterprise">
              <h3 className="text-lg font-semibold mb-4">
                Notification Preferences
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Email Notifications</div>
                      <div className="text-sm text-muted-foreground">
                        Receive document alerts via email
                      </div>
                    </div>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Monitor className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Push Notifications</div>
                      <div className="text-sm text-muted-foreground">
                        Browser notifications for updates
                      </div>
                    </div>
                  </div>
                  <Switch
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Urgent Alerts</div>
                      <div className="text-sm text-muted-foreground">
                        Immediate alerts for high-priority documents
                      </div>
                    </div>
                  </div>
                  <Switch
                    checked={urgentAlerts}
                    onCheckedChange={setUrgentAlerts}
                  />
                </div>
              </div>
            </div>

            <div className="card-enterprise">
              <h3 className="text-lg font-semibold mb-4">
                Dashboard Customization
              </h3>
              <div className="space-y-4">
                <div>
                  <Label>Default Dashboard View</Label>
                  <Select defaultValue="standard">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard Layout</SelectItem>
                      <SelectItem value="compact">Compact View</SelectItem>
                      <SelectItem value="detailed">Detailed View</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Preferred Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="malayalam">
                        മലയാളം (Malayalam)
                      </SelectItem>
                      <SelectItem value="both">Both Languages</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="card-enterprise">
              <h3 className="text-lg font-semibold mb-4">
                Password & Security
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button className="btn-success">
                  <Key className="w-4 h-4 mr-2" />
                  Update Password
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <div className="card-enterprise">
              <h3 className="text-lg font-semibold mb-4">
                Document Sources Configuration
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>SharePoint Connection</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                      <span className="text-sm text-muted-foreground">
                        Connected
                      </span>
                    </div>
                  </div>
                  <div>
                    <Label>Email Integration</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                      <span className="text-sm text-muted-foreground">
                        Active
                      </span>
                    </div>
                  </div>
                  <div>
                    <Label>Maximo Integration</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="w-3 h-3 bg-warning rounded-full"></div>
                      <span className="text-sm text-muted-foreground">
                        Syncing
                      </span>
                    </div>
                  </div>
                  <div>
                    <Label>SAP Connection</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                      <span className="text-sm text-muted-foreground">
                        Connected
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="admin" className="space-y-6">
            <div className="card-enterprise">
              <h3 className="text-lg font-semibold mb-4">User Management</h3>
              <div className="space-y-4">
                <Button className="btn-success">
                  <Users className="w-4 h-4 mr-2" />
                  Add New User
                </Button>
                <div className="border border-border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-4 font-medium">Name</th>
                        <th className="text-left p-4 font-medium">
                          Department
                        </th>
                        <th className="text-left p-4 font-medium">Role</th>
                        <th className="text-left p-4 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-border">
                        <td className="p-4">Priya Nair</td>
                        <td className="p-4">Finance</td>
                        <td className="p-4">Manager</td>
                        <td className="p-4">
                          <span className="status-success">Active</span>
                        </td>
                      </tr>
                      <tr className="border-t border-border">
                        <td className="p-4">Arun Menon</td>
                        <td className="p-4">Operations</td>
                        <td className="p-4">Analyst</td>
                        <td className="p-4">
                          <span className="status-success">Active</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
