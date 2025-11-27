import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "wouter";
import { 
  CheckCircle2, 
  XCircle, 
  Search,
  UserPlus,
  Calendar,
  DollarSign,
  Clock
} from "lucide-react";
import { AdminNav } from "@/components/AdminNav";

export default function AdminWorkshopAccess() {
  const { user, isAuthenticated } = useAuth();
  const [searchEmail, setSearchEmail] = useState("");
  const [grantEmail, setGrantEmail] = useState("");
  const [grantAmount, setGrantAmount] = useState("19700"); // $197 in cents
  
  const utils = trpc.useUtils();
  
  // Get all purchases
  const { data: purchases, isLoading } = trpc.admin.getAllPurchases.useQuery(
    undefined,
    { enabled: isAuthenticated && user?.role === "admin" }
  );

  // Manual access grant mutation
  const grantAccess = trpc.admin.grantWorkshopAccess.useMutation({
    onSuccess: () => {
      toast.success("Workshop access granted successfully!");
      setGrantEmail("");
      utils.admin.getAllPurchases.invalidate();
    },
    onError: (error: any) => {
      toast.error(`Failed to grant access: ${error.message}`);
    },
  });

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Admin Access Required</CardTitle>
            <CardDescription>You need admin privileges to access this page</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/">
              <Button className="w-full">Back to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleGrantAccess = () => {
    if (!grantEmail) {
      toast.error("Please enter an email address");
      return;
    }
    
    grantAccess.mutate({
      email: grantEmail,
      amount: parseInt(grantAmount),
    });
  };

  const filteredPurchases = purchases?.filter((p: any) => 
    !searchEmail || p.userEmail?.toLowerCase().includes(searchEmail.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Manual Access Grant */}
        <Card className="mb-8 border-2 border-brand-purple">
          <CardHeader>
            <div className="flex items-center gap-3">
              <UserPlus className="w-6 h-6 text-brand-purple" />
              <div>
                <CardTitle>Manually Grant Workshop Access</CardTitle>
                <CardDescription>
                  Add workshop access for a user who paid outside the system
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="grantEmail">User Email</Label>
                <Input
                  id="grantEmail"
                  type="email"
                  placeholder="user@example.com"
                  value={grantEmail}
                  onChange={(e) => setGrantEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="grantAmount">Amount (cents)</Label>
                <Input
                  id="grantAmount"
                  type="number"
                  placeholder="19700"
                  value={grantAmount}
                  onChange={(e) => setGrantAmount(e.target.value)}
                />
              </div>
            </div>
            <Button 
              className="w-full mt-4"
              onClick={handleGrantAccess}
              disabled={grantAccess.isPending}
            >
              {grantAccess.isPending ? "Granting Access..." : "Grant Workshop Access"}
            </Button>
            <p className="text-sm text-gray-600 mt-2">
              This will create a purchase record and grant lifetime access to recordings/resources 
              plus 1 month of live workshop access.
            </p>
          </CardContent>
        </Card>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search by email..."
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                className="border-none shadow-none focus-visible:ring-0"
              />
            </div>
          </CardContent>
        </Card>

        {/* Purchases List */}
        <Card>
          <CardHeader>
            <CardTitle>All Workshop Purchases</CardTitle>
            <CardDescription>
              {purchases?.length || 0} total purchases
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-purple mx-auto"></div>
                <p className="text-gray-600 mt-2">Loading purchases...</p>
              </div>
            ) : filteredPurchases && filteredPurchases.length > 0 ? (
              <div className="space-y-4">
                {filteredPurchases.map((purchase: any) => {
                  const hasLiveAccess = purchase.liveAccessExpiresAt 
                    ? new Date(purchase.liveAccessExpiresAt) > new Date()
                    : false;
                  
                  const daysUntilExpiry = purchase.liveAccessExpiresAt
                    ? Math.ceil((new Date(purchase.liveAccessExpiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
                    : 0;

                  return (
                    <div 
                      key={purchase.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold text-lg">{purchase.userName}</p>
                          <p className="text-sm text-gray-600">{purchase.userEmail}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {purchase.status === "completed" ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-500" />
                          )}
                          <span className="text-sm font-medium capitalize">{purchase.status}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="flex items-center gap-1 text-gray-600 mb-1">
                            <DollarSign className="w-4 h-4" />
                            <span>Amount</span>
                          </div>
                          <p className="font-semibold">
                            ${(purchase.amount / 100).toFixed(2)} {purchase.currency.toUpperCase()}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center gap-1 text-gray-600 mb-1">
                            <Calendar className="w-4 h-4" />
                            <span>Purchased</span>
                          </div>
                          <p className="font-semibold">
                            {new Date(purchase.purchasedAt).toLocaleDateString()}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center gap-1 text-gray-600 mb-1">
                            <Clock className="w-4 h-4" />
                            <span>Live Access</span>
                          </div>
                          {hasLiveAccess ? (
                            <p className="font-semibold text-green-600">
                              {daysUntilExpiry} days left
                            </p>
                          ) : (
                            <p className="font-semibold text-orange-600">
                              Expired
                            </p>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-1 text-gray-600 mb-1">
                            <span>Product</span>
                          </div>
                          <p className="font-semibold text-xs">
                            {purchase.productId}
                          </p>
                        </div>
                      </div>

                      {purchase.stripeSessionId && (
                        <p className="text-xs text-gray-500 mt-3">
                          Session: {purchase.stripeSessionId}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                {searchEmail ? "No purchases found matching your search" : "No purchases yet"}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
