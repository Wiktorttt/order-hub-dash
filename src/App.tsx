import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { DataProvider, useDataMode } from "@/contexts/DataContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Orders from "./pages/Orders";
import PrintDocuments from "./pages/PrintDocuments";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const DataModeToggle = () => {
  const { useRealData, setUseRealData } = useDataMode();
  
  return (
    <div className="flex items-center space-x-2 mr-4">
      <Label htmlFor="data-mode" className="text-sm font-medium">
        Use Real Data
      </Label>
      <Switch 
        id="data-mode"
        checked={useRealData}
        onCheckedChange={setUseRealData}
      />
    </div>
  );
};

const AppContent = () => (
  <SidebarProvider>
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <header className="h-12 flex items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SidebarTrigger className="ml-4" />
          <DataModeToggle />
        </header>
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Orders />} />
            <Route path="/print" element={<PrintDocuments />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  </SidebarProvider>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DataProvider>
          <AppContent />
        </DataProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
