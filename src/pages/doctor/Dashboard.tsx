
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ClipboardList, QrCode, Plus, IndianRupee } from 'lucide-react';
import { mockAppointments } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { useQrCode } from '@/contexts/QrCodeContext';
import { Appointment } from '@/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const DoctorDashboard: React.FC = () => {
  const { user } = useAuth();
  const { validateQrCode } = useQrCode();
  const navigate = useNavigate();
  
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [qrInput, setQrInput] = useState('');
  const [earnings, setEarnings] = useState({ today: 0, week: 0, month: 0 });

  useEffect(() => {
    // In a real app, we'd fetch this data from an API
    if (user && user.role === 'doctor') {
      const doctorAppointments = mockAppointments.filter(
        appt => appt.doctorId === user.id
      );
      setAppointments(doctorAppointments);
      
      // Calculate mock earnings
      setEarnings({
        today: 850,
        week: 3200,
        month: 12500
      });
    }
  }, [user]);

  const handleScanQrCode = () => {
    if (!qrInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter a QR code",
        variant: "destructive"
      });
      return;
    }
    
    const isValid = validateQrCode(qrInput);
    
    if (isValid) {
      toast({
        title: "Success",
        description: "QR code validated successfully. You can now create a report for this patient.",
      });
      navigate('/doctor/create-report');
    } else {
      toast({
        title: "Invalid QR Code",
        description: "This QR code is invalid or has expired. Please ask for a new code.",
        variant: "destructive"
      });
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPatientName = (patientId: string) => {
    // In a real app, we'd fetch the actual patient name
    return patientId === 'p1' ? 'Aarav Singh' : 'Meera Desai';
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-10 bg-gray-50">
        <div className="arogya-container">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-arogya-700 to-arogya-500 rounded-lg p-6 mb-8 text-white">
            <h1 className="text-2xl font-bold mb-2">Welcome Dr. {user?.name?.split(' ')[1]}</h1>
            <p>Manage your appointments and create medical reports</p>
          </div>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <QuickActionCard 
              icon={<QrCode className="w-6 h-6" />}
              title="Scan QR Code"
              description="Access patient information"
              onClick={() => {
                document.getElementById('qr-input')?.focus();
              }}
            />
            <QuickActionCard 
              icon={<Plus className="w-6 h-6" />}
              title="New Medical Report"
              description="Create a prescription or report"
              onClick={() => navigate('/doctor/create-report')}
            />
            <QuickActionCard 
              icon={<ClipboardList className="w-6 h-6" />}
              title="Medical Reports"
              description="View your previous reports"
              onClick={() => navigate('/doctor/reports')}
            />
          </div>
          
          {/* QR Code Scanner */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <QrCode className="w-5 h-5 mr-2" /> Patient QR Scanner
              </CardTitle>
              <CardDescription>
                Scan a patient's QR code to access their information securely
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Input
                  id="qr-input"
                  placeholder="Enter QR code here"
                  value={qrInput}
                  onChange={(e) => setQrInput(e.target.value)}
                />
                <Button className="arogya-gradient" onClick={handleScanQrCode}>
                  Validate
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                In a real app, you would scan the QR code using your camera
              </p>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Today's Appointments */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Appointments</CardTitle>
                <CardDescription>Your scheduled patient visits</CardDescription>
              </CardHeader>
              <CardContent>
                {appointments.length > 0 ? (
                  <div className="space-y-4">
                    {appointments.map(appointment => (
                      <div 
                        key={appointment.id} 
                        className="p-4 border border-gray-200 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                      >
                        <div>
                          <p className="font-medium">{getPatientName(appointment.patientId)}</p>
                          <p className="text-gray-500 text-sm">{formatDate(appointment.date)}</p>
                          <p className="text-sm mt-1">Fee: ₹{appointment.totalFee}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-arogya-600 border-arogya-300"
                            onClick={() => navigate('/doctor/create-report')}
                          >
                            Create Report
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No appointments for today</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Earnings Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <IndianRupee className="w-5 h-5 mr-2" /> Earnings Summary
                </CardTitle>
                <CardDescription>Your consulting and report fees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <EarningCard period="Today" amount={earnings.today} />
                  <EarningCard period="This Week" amount={earnings.week} />
                  <EarningCard period="This Month" amount={earnings.month} />
                </div>
                <div className="mt-6 bg-arogya-50 p-4 rounded-lg border border-arogya-100">
                  <h4 className="font-medium text-arogya-800 mb-2">Extra Earnings</h4>
                  <p className="text-sm text-gray-600">
                    You earn ₹{user?.role === 'doctor' ? (user as any).extraFeeForReport : 50} extra for each digital report created through Arogya Mitra
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

const QuickActionCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}> = ({ icon, title, description, onClick }) => (
  <Card className="arogya-card cursor-pointer hover:bg-gray-50" onClick={onClick}>
    <CardContent className="p-6 flex items-start">
      <div className="w-10 h-10 rounded-full bg-arogya-100 text-arogya-600 flex items-center justify-center mr-4">
        {icon}
      </div>
      <div>
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </CardContent>
  </Card>
);

const EarningCard: React.FC<{
  period: string;
  amount: number;
}> = ({ period, amount }) => (
  <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
    <p className="text-gray-500 text-sm mb-1">{period}</p>
    <p className="text-xl font-bold text-arogya-700">₹{amount}</p>
  </div>
);

export default DoctorDashboard;
