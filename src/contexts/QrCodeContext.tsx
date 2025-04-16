
import React, { createContext, useContext, useState } from 'react';
import { generateQrCode } from '../data/mockData';
import { toast } from '../components/ui/use-toast';

interface QrCodeContextType {
  generateAppointmentQrCode: (appointmentId: string) => { qrCode: string; expiryTime: Date };
  validateQrCode: (qrCode: string) => boolean;
  currentQrCode: string | null;
  expiryTime: Date | null;
}

const QrCodeContext = createContext<QrCodeContextType | undefined>(undefined);

export const QrCodeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentQrCode, setCurrentQrCode] = useState<string | null>(null);
  const [expiryTime, setExpiryTime] = useState<Date | null>(null);

  const generateAppointmentQrCode = (appointmentId: string) => {
    const { qrCode, expiryTime } = generateQrCode(appointmentId);
    
    setCurrentQrCode(qrCode);
    setExpiryTime(expiryTime);
    
    // Set QR code expiry - it will be regenerated after 10 minutes
    setTimeout(() => {
      setCurrentQrCode(null);
      setExpiryTime(null);
      toast({
        title: "QR code expired",
        description: "Your QR code has expired. Please generate a new one.",
      });
    }, 10 * 60 * 1000); // 10 minutes
    
    return { qrCode, expiryTime };
  };

  const validateQrCode = (qrCode: string): boolean => {
    // In a real app, we'd validate this against a backend
    if (qrCode === currentQrCode && expiryTime && new Date() < expiryTime) {
      return true;
    }
    return false;
  };

  return (
    <QrCodeContext.Provider value={{ 
      generateAppointmentQrCode, 
      validateQrCode, 
      currentQrCode, 
      expiryTime 
    }}>
      {children}
    </QrCodeContext.Provider>
  );
};

export const useQrCode = (): QrCodeContextType => {
  const context = useContext(QrCodeContext);
  if (context === undefined) {
    throw new Error('useQrCode must be used within a QrCodeProvider');
  }
  return context;
};
