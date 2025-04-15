
import { Doctor, Patient, MedicalReport, Appointment } from '../types';

// Mock Doctors
export const mockDoctors: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Rajiv Sharma',
    email: 'rajiv.sharma@arogyamitra.com',
    role: 'doctor',
    specialization: 'Cardiologist',
    consultationFee: 800,
    extraFeeForReport: 50,
    hospital: 'Arogya City Hospital',
    profilePicture: '/doctors/doctor1.jpg',
    createdAt: new Date('2022-01-15')
  },
  {
    id: 'd2',
    name: 'Dr. Priya Patel',
    email: 'priya.patel@arogyamitra.com',
    role: 'doctor',
    specialization: 'Pediatrician',
    consultationFee: 600,
    extraFeeForReport: 50,
    hospital: 'Child Care Center',
    profilePicture: '/doctors/doctor2.jpg',
    createdAt: new Date('2022-03-10')
  },
  {
    id: 'd3',
    name: 'Dr. Anand Gupta',
    email: 'anand.gupta@arogyamitra.com',
    role: 'doctor',
    specialization: 'Neurologist',
    consultationFee: 1200,
    extraFeeForReport: 100,
    hospital: 'Neuro Sciences Institute',
    profilePicture: '/doctors/doctor3.jpg',
    createdAt: new Date('2021-11-05')
  }
];

// Mock Patients
export const mockPatients: Patient[] = [
  {
    id: 'p1',
    name: 'Aarav Singh',
    email: 'aarav@example.com',
    role: 'patient',
    profilePicture: '/patients/patient1.jpg',
    createdAt: new Date('2022-05-20')
  },
  {
    id: 'p2',
    name: 'Meera Desai',
    email: 'meera@example.com',
    role: 'patient',
    profilePicture: '/patients/patient2.jpg',
    createdAt: new Date('2022-07-12')
  }
];

// Mock Reports
export const mockReports: MedicalReport[] = [
  {
    id: 'r1',
    patientId: 'p1',
    doctorId: 'd1',
    hospitalName: 'Arogya City Hospital',
    diagnosis: 'Hypertension Stage 1',
    prescription: 'Amlodipine 5mg once daily, low sodium diet',
    notes: 'Follow up in 2 weeks. Monitor BP daily.',
    createdAt: new Date('2023-01-10'),
    letterhead: {
      hospitalName: 'Arogya City Hospital',
      address: '123 Health Avenue, Mumbai, 400001',
      contactInfo: 'Tel: +91 22 12345678, Email: info@arogyacityhospital.com'
    }
  },
  {
    id: 'r2',
    patientId: 'p1',
    doctorId: 'd3',
    hospitalName: 'Neuro Sciences Institute',
    diagnosis: 'Tension headache',
    prescription: 'Ibuprofen 400mg as needed, stress management techniques',
    notes: 'MRI scan negative for pathological findings.',
    createdAt: new Date('2023-02-15'),
    letterhead: {
      hospitalName: 'Neuro Sciences Institute',
      address: '45 Brain Street, Delhi, 110001',
      contactInfo: 'Tel: +91 11 87654321, Email: info@neuroinstitute.com'
    }
  }
];

// Mock Appointments
export const mockAppointments: Appointment[] = [
  {
    id: 'a1',
    patientId: 'p1',
    doctorId: 'd1',
    date: new Date('2023-05-25T10:30:00'),
    status: 'completed',
    totalFee: 850
  },
  {
    id: 'a2',
    patientId: 'p2',
    doctorId: 'd2',
    date: new Date('2023-05-30T15:00:00'),
    status: 'scheduled',
    totalFee: 650,
    qrCode: 'qr-code-data-string',
    qrExpiryTime: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes from now
  }
];

// Helper function to get a user by email (for login mock)
export const getUserByEmail = (email: string): Patient | Doctor | undefined => {
  return [...mockDoctors, ...mockPatients].find(user => user.email === email);
};

// Helper to generate a new QR code for an appointment
export const generateQrCode = (appointmentId: string): { qrCode: string, expiryTime: Date } => {
  const qrCode = `AROGYA-${appointmentId}-${Date.now()}`;
  const expiryTime = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
  
  return { qrCode, expiryTime };
};
