import React from 'react'
import { Calendar, PhoneCall, CalendarClock, FileCheck, Bell } from 'lucide-react'

const page = () => {
  return (
    <div>
      <section className="py-20 bg-white" id="book-now">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                  <div className="animate-fadeIn">
                    <span className="inline-block px-4 py-1 rounded-full bg-[#FC7729]/20 text-[#FC7729] font-medium text-sm mb-4">
                      BOOK AN APPOINTMENT
                    </span>
                    <h2 className="text-4xl font-bold text-gray-800 mb-6">
                      Schedule Your Pet's Visit Today
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                      Whether it's a routine check-up, vaccination, or specialized treatment, 
                      our expert veterinary team is ready to provide the highest quality care for your beloved companions.
                    </p>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start">
                        <div className="bg-[#FCAA29]/10 text-[#FCAA29] p-2 rounded-full mr-4">
                          <Calendar size={24} />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-1">Flexible Scheduling</h3>
                          <p className="text-gray-600">Choose from available slots that fit your busy schedule</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-[#FCAA29]/10 text-[#FCAA29] p-2 rounded-full mr-4">
                          <FileCheck size={24} />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-1">Digital Check-In</h3>
                          <p className="text-gray-600">Complete paperwork online before your visit to save time</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-[#FCAA29]/10 text-[#FCAA29] p-2 rounded-full mr-4">
                          <Bell size={24} />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-1">Appointment Reminders</h3>
                          <p className="text-gray-600">Receive notifications so you never miss an important visit</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href="#"
                        className="bg-[#FC7729] hover:bg-[#FCAA29] text-white px-8 py-3 rounded-full font-medium transition-all duration-300 text-center flex items-center justify-center gap-2"
                      >
                        <Calendar size={18} />
                        Book Online
                      </a>
                      <a
                        href="tel:+1234567890"
                        className="bg-transparent border border-[#FC7729] text-[#FC7729] hover:bg-[#FC7729] hover:text-white px-8 py-3 rounded-full font-medium transition-all duration-300 text-center flex items-center justify-center gap-2"
                      >
                        <PhoneCall size={18} />
                        Call Us
                      </a>
                    </div>
                  </div>
                  
                  <div className="relative animate-fadeIn">
                    <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#FCAA29] rounded-full opacity-20 animate-pulse"></div>
                    <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#FC7729] rounded-full opacity-20 animate-pulse delay-1000"></div>
                    
                    <div className="bg-gray-100 p-8 rounded-2xl shadow-xl relative z-10 border border-gray-200">
                      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Request an Appointment</h3>
                      
                      <form className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-gray-600 mb-2">Your Name</label>
                          <input
                            type="text"
                            id="name"
                            className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:border-[#FCAA29]"
                            placeholder="Enter your full name"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-gray-600 mb-2">Email Address</label>
                          <input
                            type="email"
                            id="email"
                            className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:border-[#FCAA29]"
                            placeholder="Enter your email"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-gray-600 mb-2">Phone Number</label>
                          <input
                            type="tel"
                            id="phone"
                            className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:border-[#FCAA29]"
                            placeholder="Enter your phone number"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="service" className="block text-gray-600 mb-2">Service Needed</label>
                          <select
                            id="service"
                            className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:border-[#FCAA29]"
                          >
                            <option value="">Select a service</option>
                            <option value="check-up">Routine Check-up</option>
                            <option value="vaccination">Vaccination</option>
                            <option value="dental">Dental Care</option>
                            <option value="surgery">Surgery Consultation</option>
                            <option value="emergency">Emergency Care</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="date" className="block text-gray-600 mb-2">Preferred Date</label>
                          <input
                            type="date"
                            id="date"
                            className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:border-[#FCAA29]"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="message" className="block text-gray-600 mb-2">Additional Information</label>
                          <textarea
                            id="message"
                            rows={4}
                            className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:border-[#FCAA29]"
                            placeholder="Tell us about your pet and reason for visit"
                          ></textarea>
                        </div>
                        
                        <button
                          type="submit"
                          className="w-full bg-gradient-to-r from-[#FC7729] to-[#FCAA29] text-white py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2"
                        >
                          <CalendarClock size={18} />
                          Request Appointment
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
    </div>
  )
}

export default page