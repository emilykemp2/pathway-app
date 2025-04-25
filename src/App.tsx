import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { RoleProvider } from "./contexts/RoleContext";
import { useRole } from "./contexts/RoleContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import TestSelection from "./pages/TestSelection";
import TestInstructions from "./pages/TestInstructions";
import CaptureTest from "./pages/CaptureTest";
import TestResults from "./pages/TestResults";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import AthleteManagement from "./pages/AthleteManagement";
import AthleteProfile from "./pages/AthleteProfile";
import { ReactNode } from "react";

const queryClient = new QueryClient();

// Component to protect routes that require a role
const RoleProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { role } = useRole();
  const location = useLocation();
  
  // If no role is set and we're trying to access a protected route, redirect to home
  if (!role && location.pathname.includes('/dashboard')) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// Routes need to be inside the providers
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Index />} />
      {/* Legacy route - redirect to proper role-based dashboard when visited directly */}
      <Route path="/dashboard" element={<Navigate to="/" replace />} />
      {/* New role-specific dashboard routes */}
      <Route path="/dashboard/:role" element={
        <RoleProtectedRoute>
          <Dashboard />
        </RoleProtectedRoute>
      } />
      <Route path="/tests" element={<TestSelection />} />
      <Route path="/tests/:testId/instructions" element={<TestInstructions />} />
      <Route path="/tests/:testId/capture" element={<CaptureTest />} />
      <Route path="/tests/:testId/results" element={<TestResults />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/athletes" element={<AthleteManagement />} />
      <Route path="/athlete/:id" element={<AthleteProfile />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <RoleProvider>
          <Toaster />
          <Sonner />
          <AppRoutes />
        </RoleProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
