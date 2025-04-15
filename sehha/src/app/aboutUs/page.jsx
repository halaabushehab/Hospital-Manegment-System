import Image from "next/image"
import { Play, MessageSquare, Calendar, PawPrint } from "lucide-react"

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0">
  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#FCAA29]/20 to-[#FC7729]/10"></div>
  <div className="absolute top-0 left-0 w-full h-full">
    {Array.from({ length: 20 }).map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-[#F2C94C]/10"
        style={{
          width: `${Math.random() * 100 + 50}px`,
          height: `${Math.random() * 100 + 50}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 10 + 10}s`,
          animationDelay: `${Math.random() * 5}s`,
        }}
      />
    ))}
  </div>
</div>

<div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
  <div className="flex flex-col items-center text-center mb-16">
    <div className="flex items-center mb-6">
      <PawPrint className="h-12 w-12 text-[#FC7729]" />
      <h1 className="text-5xl md:text-7xl font-bold text-[#303241] ml-4">VetNova</h1>
    </div>
    <p className="text-xl md:text-2xl text-[#1D1D1D] max-w-3xl">Advanced veterinary care at your fingertips</p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    <div className="order-2 md:order-1">
      <h2 className="text-3xl md:text-4xl font-bold text-[#303241] mb-6">Revolutionizing Pet Healthcare</h2>
      <p className="text-lg text-[#1D1D1D] mb-8">
        VetNova is an advanced veterinary platform designed to facilitate access to affordable, effective, and
        reliable animal healthcare. We're bridging the gap between pet owners and professional veterinarians
        through technology.
      </p>
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="bg-[#FCAA29] p-3 rounded-full mr-4">
            <Calendar className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-[#303241] text-xl">Secure Appointments</h3>
            <p className="text-[#1D1D1D]">Book one-time consultations or subscribe for full access</p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="bg-[#FC7729] p-3 rounded-full mr-4">
            <Play className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-[#303241] text-xl">Live Video Calls</h3>
            <p className="text-[#1D1D1D]">
              Connect with veterinarians through high-quality video consultations
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="bg-[#F2C94C] p-3 rounded-full mr-4">
            <MessageSquare className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-[#303241] text-xl">Real-time Messaging</h3>
            <p className="text-[#1D1D1D]">Stay in touch with your vet for follow-ups and quick questions</p>
          </div>
        </div>
      </div>
    </div>
    <div className="order-1 md:order-2 relative">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
        <div className="relative bg-[#C8C8C8] w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
          <div className="relative">
            <video
              src="/videos/Recording 2025-04-07 095225.mp4"
              controls
              className="object-cover w-full h-[350px] md:h-[500px] mx-auto"
            ></video>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-[#FC7729] rounded-full p-5 cursor-pointer hover:bg-[#FCAA29] transition-colors">
                <Play className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>



              {/* <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg hidden md:block">
                <div className="flex items-center space-x-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=100&width=100"
                      alt="Veterinarian"
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-[#303241]">Dr. Sarah</p>
                    <p className="text-sm text-[#C8C8C8]">Online now</p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          <div className="mt-24 relative">
  <h2 className="text-3xl md:text-4xl font-bold text-center text-[#303241] mb-12">
    Meet Our Happy Patients
  </h2>
  <div className="flex flex-wrap justify-center gap-6">
    {[
      { name: "Dog", img: "https://i.pinimg.com/736x/b2/c1/fd/b2c1fde7ade248d0510878acc1bf1ce9.jpg" },
      { name: "Cat", img: "https://i.pinimg.com/736x/05/3c/2d/053c2d274c278c1702469d441fe65747.jpg" },
      { name: "Rabbit", img: "https://i.pinimg.com/736x/c5/46/6e/c5466e4f63766823c37b40d5a6a4bc5f.jpg" },
      { name: "Bird", img: "https://i.pinimg.com/736x/66/b8/5e/66b85ec78de3493a90aa84c6bba8ae0f.jpg" },
    ].map((pet, index) => (
      <div
        key={index}
        className="group relative w-64 h-64 bg-gradient-to-br from-[#FCAA29]/20 to-[#FC7729]/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={pet.img}
            alt={pet.name}
            width={300}
            height={350}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#303241] to-transparent p-4">
          <p className="text-white font-medium">{pet.name} Care</p>
          <p className="text-[#C8C8C8] text-sm">Specialized treatment</p>
        </div>
      </div>
    ))}
  </div>
</div>


          {/* Trust Section */}
          <div className="mt-24 bg-[#303241] rounded-3xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Why Pet Owners Trust VetNova</h2>
                <p className="text-[#C8C8C8] mb-8">
                  We're committed to providing the highest quality veterinary care through our innovative platform. Our
                  network of certified veterinarians is available when you need them most.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-[#1D1D1D]/50 p-6 rounded-xl">
                    <h3 className="text-[#F2C94C] text-4xl font-bold mb-2">24/7</h3>
                    <p className="text-white">Access to care</p>
                  </div>
                  <div className="bg-[#1D1D1D]/50 p-6 rounded-xl">
                    <h3 className="text-[#F2C94C] text-4xl font-bold mb-2">100+</h3>
                    <p className="text-white">Certified vets</p>
                  </div>
                  <div className="bg-[#1D1D1D]/50 p-6 rounded-xl">
                    <h3 className="text-[#F2C94C] text-4xl font-bold mb-2">10k+</h3>
                    <p className="text-white">Happy pets</p>
                  </div>
                  <div className="bg-[#1D1D1D]/50 p-6 rounded-xl">
                    <h3 className="text-[#F2C94C] text-4xl font-bold mb-2">4.9</h3>
                    <p className="text-white">User rating</p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 md:pl-12">
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#FC7729] rounded-full opacity-20"></div>
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#FCAA29] rounded-full opacity-20"></div>
                  <div className="relative bg-[#1D1D1D] p-6 rounded-2xl">
                    <div className="flex items-center mb-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                        <Image
                          src="https://i.pinimg.com/736x/dc/6e/7e/dc6e7e2056fb65eb60499b528f03e65f.jpg"
                          alt="Pet owner"
                          width={100}
                          height={100}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-white">Emma Thompson</p>
                        <p className="text-sm text-[#C8C8C8]">Pet parent to Max</p>
                      </div>
                    </div>
                    <p className="text-[#C8C8C8] italic">
                      "VetNova was a lifesaver when my dog Max got sick in the middle of the night. I was able to
                      connect with a vet within minutes who helped me understand what was happening and what steps to
                      take. The peace of mind was invaluable."
                    </p>
                    <div className="flex mt-4">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-[#F2C94C]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-24 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#303241] mb-6">
              Ready to Experience Better Pet Healthcare?
            </h2>
            <p className="text-lg text-[#1D1D1D] mb-8 max-w-2xl mx-auto">
              Join thousands of pet owners who've discovered the convenience and reliability of VetNova's veterinary
              platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#FC7729] hover:bg-[#FCAA29] text-white font-medium py-3 px-8 rounded-full transition-colors">
                Book a Consultation
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

