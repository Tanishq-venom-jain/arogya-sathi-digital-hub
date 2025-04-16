import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { QrCodeProvider } from "./contexts/QrCodeContext";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PatientDashboard from "./pages/patient/Dashboard";
import DoctorDashboard from "./pages/doctor/Dashboard";
import CreateReport from "./pages/doctor/CreateReport";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <QrCodeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              
              {/* Patient Routes */}
              <Route path="/patient/dashboard" element={<PatientDashboard />} />
              <Route path="/patient/find-doctors" element={<PatientDashboard />} /> {/* Placeholder */}
              <Route path="/patient/book-appointment" element={<PatientDashboard />} /> {/* Placeholder */}
              <Route path="/patient/reports" element={<PatientDashboard />} /> {/* Placeholder */}
              <Route path="/patient/report/:id" element={<PatientDashboard />} /> {/* Placeholder */}
              
              {/* Doctor Routes */}
              <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
              <Route path="/doctor/create-report" element={<CreateReport />} />
              <Route path="/doctor/reports" element={<DoctorDashboard />} /> {/* Placeholder */}
              
              {/* Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QrCodeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
