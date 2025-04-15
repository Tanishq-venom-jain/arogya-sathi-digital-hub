
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 pt-10 pb-8">
      <div className="arogya-container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold mb-4">Arogya Mitra</h3>
            <p className="text-gray-600 mb-4">Aapki Sehat Ka Digital Saathi</p>
            <p className="text-gray-600 text-sm">
              A centralized platform for your medical records, making healthcare easier and more accessible.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">For Patients</h4>
            <ul className="space-y-2">
              <li><Link to="/login" className="text-gray-600 hover:text-arogya-600">Login</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-arogya-600">Find Doctors</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-arogya-600">Book Appointments</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-arogya-600">View Reports</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">For Doctors</h4>
            <ul className="space-y-2">
              <li><Link to="/login" className="text-gray-600 hover:text-arogya-600">Login</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-arogya-600">Manage Appointments</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-arogya-600">Create Reports</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-arogya-600">Customize Letterhead</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Contact</h4>
            <p className="text-gray-600">support@arogyamitra.com</p>
            <p className="text-gray-600">+91 1234567890</p>
            <p className="text-gray-600 mt-4">
              123 Health Avenue, <br />
              Digital District, <br />
              Tech City - 400001
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Arogya Mitra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
