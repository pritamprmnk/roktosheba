import { Mail, Phone, Facebook, X, Instagram, Linkedin, Globe } from "lucide-react";
import { CiLock } from "react-icons/ci";


export default function Footer() {
  return (
    <footer className="from-gray-50 to-white text-gray-800 py-12 mt-10 ">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo + About */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <img 
              src="/assets/blood.png" 
              alt="Logo" 
              className="w-10 h-10 object-contain"
            />
            <h2 className="text-2xl font-bold"><span className="text-red-700">Rokto</span>Sheba</h2>

          </div>

          <p className="mt-3 text-gray-600">
            Connecting donors with those in need to save lives through the power of community and technology.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-red-600">Home</a></li>
            <li><a href="/alltickets" className="hover:text-red-600">Find a Donor</a></li>
            <li><a href="#" className="hover:text-red-600">About Us</a></li>
            <li><a href="#" className="hover:text-red-600">Donate Blood</a></li>
          </ul>
        </div>
        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-red-600">Help Center</a></li>
            <li><a href="/alltickets" className="hover:text-red-600">Eligibility Requirements</a></li>
            <li><a href="#" className="hover:text-red-600">Hospital Partners</a></li>

          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>

          <p className="flex items-center gap-2">
            <Mail size={18} className="text-red-600" />
            support@roktosheba.com
          </p>

          <p className="flex items-center gap-2 mt-2">
            <Phone size={18} className="text-red-600" />
            +9644 4444444
          </p>

          <p className="flex items-center gap-2 mt-2">
            <Facebook size={18} className="text-red-600" />
            < X size={18} className="text-red-600" />
            <Instagram size={18} className="text-red-600" />
            <Linkedin size={18} className="text-red-600" />
            < Globe size={18} className="text-red-600" />
        
          </p>
        </div>


      </div>

      {/* Bottom Section */}
      <div className="mt-10 border-t pt-5 text-center md:flex md:justify-between md:text-left max-w-7xl mx-auto px-6 text-gray-600">
        <p>© 2025 RoktoSheba. All rights reserved.</p>

        <div className="flex gap-6 mt-3 md:mt-0">
          <a href="#" className="hover:text-red-600">Privacy Policy</a>
          <a href="#" className="hover:text-red-600">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
