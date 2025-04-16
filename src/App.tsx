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
import PrivateRoute from "./components/auth/PrivateRoute";

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
              
              {/* Protected Patient Routes */}
              <Route
                path="/patient/dashboard"
                element={
                  <PrivateRoute requiredRole="patient">
                    <PatientDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/patient/find-doctors"
                element={
                  <PrivateRoute requiredRole="patient">
                    <PatientDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/patient/book-appointment"
                element={
                  <PrivateRoute requiredRole="patient">
                    <PatientDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/patient/reports"
                element={
                  <PrivateRoute requiredRole="patient">
                    <PatientDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/patient/report/:id"
                element={
                  <PrivateRoute requiredRole="patient">
                    <PatientDashboard />
                  </PrivateRoute>
                }
              />
              
              {/* Protected Doctor Routes */}
              <Route
                path="/doctor/dashboard"
                element={
                  <PrivateRoute requiredRole="doctor">
                    <DoctorDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/doctor/create-report"
                element={
                  <PrivateRoute requiredRole="doctor">
                    <CreateReport />
                  </PrivateRoute>
                }
              />
              <Route
                path="/doctor/reports"
                element={
                  <PrivateRoute requiredRole="doctor">
                    <DoctorDashboard />
                  </PrivateRoute>
                }
              />
              
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
