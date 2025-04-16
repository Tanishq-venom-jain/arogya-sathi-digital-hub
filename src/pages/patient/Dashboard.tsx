
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ClipboardList, Search, QrCode } from 'lucide-react';
import { mockDoctors, mockReports, mockAppointments } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { useQrCode } from '@/contexts/QrCodeContext';
import { Doctor, MedicalReport, Appointment } from '@/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { toast } from '@/components/ui/use-toast';

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const { generateAppointmentQrCode } = useQrCode();
  const navigate = useNavigate();
  
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [reports, setReports] = useState<MedicalReport[]>([]);
  const [currentQr, setCurrentQr] = useState<{ code: string, expiryTime: Date } | null>(null);

  useEffect(() => {
    // In a real app, we'd fetch this data from an API
    if (user && user.role === 'patient') {
      const patientAppointments = mockAppointments.filter(
        appt => appt.patientId === user.id
      );
      setAppointments(patientAppointments);
      
      const patientReports = mockReports.filter(
        report => report.patientId === user.id
      );
      setReports(patientReports);
    }
  }, [user]);

  const handleGenerateQR = (appointmentId: string) => {
    const { qrCode, expiryTime } = generateAppointmentQrCode(appointmentId);
    setCurrentQr({ code: qrCode, expiryTime });
    toast({
      title: "QR Code Generated",
      description: "Your QR code is valid for 10 minutes",
    });
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

  const getDoctorName = (doctorId: string) => {
    const doctor = mockDoctors.find(d => d.id === doctorId);
    return doctor ? doctor.name : 'Unknown Doctor';
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-10 bg-gray-50">
        <div className="arogya-container">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-arogya-700 to-arogya-500 rounded-lg p-6 mb-8 text-white">
            <h1 className="text-2xl font-bold mb-2">Welcome, {user?.name}</h1>
            <p>Manage your appointments and medical reports in one place</p>
          </div>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <QuickActionCard 
              icon={<Search className="w-6 h-6" />}
              title="Find Doctors"
              description="Search for specialists near you"
              onClick={() => navigate('/patient/find-doctors')}
            />
            <QuickActionCard 
              icon={<Calendar className="w-6 h-6" />}
              title="Book Appointment"
              description="Schedule your next visit"
              onClick={() => navigate('/patient/book-appointment')}
            />
            <QuickActionCard 
              icon={<ClipboardList className="w-6 h-6" />}
              title="View All Reports"
              description="Access your medical history"
              onClick={() => navigate('/patient/reports')}
            />
          </div>
          
          {/* Active QR Code Display */}
          {currentQr && (
            <Card className="mb-8 border-arogya-300 bg-arogya-50">
              <CardHeader>
                <CardTitle className="flex items-center text-arogya-700">
                  <QrCode className="w-5 h-5 mr-2" /> Your Active QR Code
                </CardTitle>
                <CardDescription>
                  Valid until: {formatDate(currentQr.expiryTime)}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                  {/* In a real app, we'd use a QR code library to generate an actual QR code */}
                  <div className="w-48 h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                    QR Code: {currentQr.code.substring(0, 8)}...
                  </div>
                </div>
                <p className="text-sm text-gray-500 text-center">
                  Show this QR code to your doctor to securely share your information
                </p>
              </CardContent>
            </Card>
          )}
          
          {/* Upcoming Appointments */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Your scheduled doctor visits</CardDescription>
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
                          <p className="font-medium">{getDoctorName(appointment.doctorId)}</p>
                          <p className="text-gray-500 text-sm">{formatDate(appointment.date)}</p>
                          <p className="text-sm mt-1">Fee: ₹{appointment.totalFee}</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-arogya-600 border-arogya-300"
                          onClick={() => handleGenerateQR(appointment.id)}
                        >
                          <QrCode className="w-4 h-4 mr-2" /> Generate QR
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No upcoming appointments</p>
                    <Button 
                      variant="link" 
                      className="mt-2 text-arogya-600"
                      onClick={() => navigate('/patient/book-appointment')}
                    >
                      Book an appointment
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Recent Medical Reports */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Medical Reports</CardTitle>
                <CardDescription>Your latest medical documentation</CardDescription>
              </CardHeader>
              <CardContent>
                {reports.length > 0 ? (
                  <div className="space-y-4">
                    {reports.map(report => (
                      <div 
                        key={report.id} 
                        className="p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex justify-between mb-2">
                          <p className="font-medium">{report.hospitalName}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(report.createdAt).toLocaleDateString('en-IN')}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Diagnosis: {report.diagnosis}</p>
                        <p className="text-sm text-gray-600 truncate">Dr. {getDoctorName(report.doctorId)}</p>
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="text-arogya-600 p-0 h-auto mt-2"
                          onClick={() => navigate(`/patient/report/${report.id}`)}
                        >
                          View full report
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <ClipboardList className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No medical reports yet</p>
                  </div>
                )}
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

export default PatientDashboard;
