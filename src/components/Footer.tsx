
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">SpinalApp</h3>
            <p className="text-gray-400 text-sm">
              Il tuo partner per il benessere della schiena
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Link Utili</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms-of-use" className="text-gray-400 hover:text-white">Termini di Uso</Link></li>
              <li><Link to="/cookie-policy" className="text-gray-400 hover:text-white">Cookie Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Supporto</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contatti</Link></li>
              <li><Link to="/money-back-guarantee" className="text-gray-400 hover:text-white">Garanzia Rimborso</Link></li>
              <li><Link to="/subscription-policy" className="text-gray-400 hover:text-white">Politica di Abbonamento</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Accesso</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/admin/login" className="text-gray-400 hover:text-white">Accesso Admin</Link></li>
              <li><Link to="/manage-subscription" className="text-gray-400 hover:text-white">Gestione Piano</Link></li>
              <li><a href="https://spinal.systeme.io/dashboard/it/login" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">Area Riservata</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>SpinalApp. Tutti i diritti riservati © 2025 | Ambitioned Ltd 24 Tax Suite 137 b Westlink House 981 Great West Road Brentford - UK | È vietata qualsiasi riproduzione.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
