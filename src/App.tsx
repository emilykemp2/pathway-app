
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RoleProvider } from "./contexts/RoleContext";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <RoleProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tests" element={<TestSelection />} />
              <Route path="/tests/:testId/instructions" element={<TestInstructions />} />
              <Route path="/tests/:testId/capture" element={<CaptureTest />} />
              <Route path="/tests/:testId/results" element={<TestResults />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/athletes" element={<AthleteManagement />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RoleProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
