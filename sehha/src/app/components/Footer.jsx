"user client";

import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";


export default function Footer() {
  return (
    <footer className="bg-[#303241] text-[#C8C8C8] pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10">
          <div>
            <h3 className="text-2xl font-bold text-[#FFFFFF] mb-6">
              <span className="text-[#FCAA29]">PawCare</span> Animal Hospital
            </h3>
            <p className="mb-6">
              Providing compassionate and comprehensive veterinary care for your
              beloved animal companions.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-[#303241] w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-[#FCAA29]"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="bg-[#303241] w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-[#FCAA29]"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="bg-[#303241] w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-[#FCAA29]"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="bg-[#303241] w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-[#FCAA29]"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-[#FFFFFF] mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-[#FCAA29] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FCAA29] transition-colors">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FCAA29] transition-colors">
                  Book Appointment
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FCAA29] transition-colors">
                  Shop Medications
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FCAA29] transition-colors">
                  Pet Health Resources
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FCAA29] transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-[#FFFFFF] mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-[#FCAA29] transition-colors">
                  Preventive Care
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FCAA29] transition-colors">
                  Dental Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FCAA29] transition-colors">
                  Surgery
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FCAA29] transition-colors">
                  Emergency Care
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FCAA29] transition-colors">
                  Laboratory & Diagnostics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FCAA29] transition-colors">
                  Pharmacy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-[#FFFFFF] mb-6">
              Contact Information
            </h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-[#FCAA29] flex-shrink-0 mt-0.5" />
                <span>
                  123 Pet Care Lane
                  <br />
                  Veterinary District, VT 12345
                </span>
              </div>

              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-[#FCAA29] flex-shrink-0" />
                <span>(123) 456-7890</span>
              </div>

              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-[#FCAA29] flex-shrink-0" />
                <span>info@pawcare.example</span>
              </div>

              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-3 text-[#FCAA29] flex-shrink-0" />
                <div>
                  <div>Mon-Fri: 8am - 8pm</div>
                  <div>Sat: 9am - 5pm</div>
                  <div>Sun: 10am - 2pm</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#C8C8C8]/10 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>
              &copy; {new Date().getFullYear()} PawCare Animal Hospital. All
              rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-[#FCAA29] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#FCAA29] transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-[#FCAA29] transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
