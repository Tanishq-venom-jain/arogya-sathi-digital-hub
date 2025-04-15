
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { toast } from '@/components/ui/use-toast';
import { FileUp, Send } from 'lucide-react';

const CreateReport: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [reportData, setReportData] = useState({
    patientName: '',
    patientId: '',
    diagnosis: '',
    prescription: '',
    notes: '',
    useLetterhead: true,
  });
  
  const [images, setImages] = useState<FileList | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReportData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImages(e.target.files);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we'd send this data to the backend
    toast({
      title: "Report Created",
      description: "Medical report has been created and shared with the patient",
    });
    
    // Redirect back to dashboard
    navigate('/doctor/dashboard');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-10 bg-gray-50">
        <div className="arogya-container max-w-3xl">
          <h1 className="text-2xl font-bold mb-6">Create Medical Report</h1>
          
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Patient Information</CardTitle>
                <CardDescription>
                  Enter details about the patient and their diagnosis
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Patient Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="patientName">Patient Name</Label>
                    <Input
                      id="patientName"
                      name="patientName"
                      value={reportData.patientName}
                      onChange={handleChange}
                      placeholder="Enter patient name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="patientId">Patient ID</Label>
                    <Input
                      id="patientId"
                      name="patientId"
                      value={reportData.patientId}
                      onChange={handleChange}
                      placeholder="Patient ID from QR code"
                      required
                    />
                  </div>
                </div>
                
                {/* Diagnosis */}
                <div className="space-y-2">
                  <Label htmlFor="diagnosis">Diagnosis</Label>
                  <Input
                    id="diagnosis"
                    name="diagnosis"
                    value={reportData.diagnosis}
                    onChange={handleChange}
                    placeholder="Enter diagnosis"
                    required
                  />
                </div>
                
                {/* Prescription */}
                <div className="space-y-2">
                  <Label htmlFor="prescription">Prescription</Label>
                  <Textarea
                    id="prescription"
                    name="prescription"
                    value={reportData.prescription}
                    onChange={handleChange}
                    placeholder="Enter detailed prescription"
                    rows={4}
                    required
                  />
                </div>
                
                {/* Additional Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={reportData.notes}
                    onChange={handleChange}
                    placeholder="Any additional notes or instructions"
                    rows={3}
                  />
                </div>
                
                {/* File Upload */}
                <div className="space-y-2">
                  <Label>Upload Report Images</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <FileUp className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500 mb-2">
                      Drag and drop files here, or click to select files
                    </p>
                    <Input
                      id="images"
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('images')?.click()}
                    >
                      Select Files
                    </Button>
                    {images && (
                      <p className="mt-2 text-sm text-arogya-600">
                        {images.length} file{images.length !== 1 ? 's' : ''} selected
                      </p>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    Upload clear images of any physical reports or test results. You'll earn ₹
                    {user?.role === 'doctor' ? (user as any).extraFeeForReport : 50} extra for complete digital reports.
                  </p>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/doctor/dashboard')}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="w-full sm:w-auto arogya-gradient"
                >
                  <Send className="w-4 h-4 mr-2" /> Create and Send Report
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateReport;
