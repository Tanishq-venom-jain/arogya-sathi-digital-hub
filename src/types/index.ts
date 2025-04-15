
export type UserRole = 'patient' | 'doctor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profilePicture?: string;
  createdAt: Date;
}

export interface Patient extends User {
  role: 'patient';
  medicalHistory?: MedicalReport[];
  appointments?: Appointment[];
}

export interface Doctor extends User {
  role: 'doctor';
  specialization: string;
  consultationFee: number;
  extraFeeForReport: number;
  hospital?: string;
  appointments?: Appointment[];
}

export interface MedicalReport {
  id: string;
  patientId: string;
  doctorId: string;
  hospitalName: string;
  diagnosis: string;
  prescription: string;
  notes?: string;
  images?: string[];
  createdAt: Date;
  letterhead?: Letterhead;
}

export interface Letterhead {
  hospitalName: string;
  logo?: string;
  address: string;
  contactInfo: string;
  footer?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  totalFee: number;
  qrCode?: string;
  qrExpiryTime?: Date;
}
