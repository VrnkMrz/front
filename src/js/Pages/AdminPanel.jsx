import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import '../../css/styles.css'
import '../../css/AdminPanel.css'

const AdminPanel = () => {
  const navigate = useNavigate();

  const links = [
    { path: '/dashboard_tickets', label: 'Dashboard Tickets' },
    { path: '/dashboard_services', label: 'Dashboard Services' },
    { path: '/dashboard_wagons', label: 'Dashboard Wagons' },
    { path: '/admin-select-train', label: 'Admain Trains' }
  ];

  return (
    <>
    <Navbar label={"Admin Panel"}/>
    <div className='admin-panel-back'>
    <div className="admin-panel">
      {links.map((link, index) => (
        <button
          key={index}
          className="admin-link"
          onClick={() => navigate(link.path)}
        >
          {link.label}
        </button>
      ))}
    </div>
    </div>
    </>
  );
};

export default AdminPanel;
