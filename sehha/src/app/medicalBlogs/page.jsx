import Link from "next/link"
import Image from "next/image"

// Sample blog data

const blogPosts = [
    {
      id: 1,
      title: "Essential Vaccinations for Your Pet",
      excerpt: "Learn about the core vaccinations that every pet owner should consider for their furry friends.",
      date: "April 2, 2025",
      slug: "essential-vaccinations",
      image: "https://i.pinimg.com/736x/67/2d/78/672d78205a2d777fc5dffb71bd0cdbe0.jpg",
      category: "Pet Health",
    },
    {
      id: 2,
      title: "Nutrition Tips for Senior Dogs",
      excerpt:
        "As dogs age, their nutritional needs change. Discover how to adapt your senior dog's diet for optimal health.",
      date: "March 28, 2025",
      slug: "senior-dog-nutrition",
      image: "https://i.pinimg.com/736x/27/e0/3a/27e03ae1b2a2faccef17cc81311d4243.jpg",
      category: "Nutrition",
    },
    {
      id: 3,
      title: "Signs Your Cat Might Be in Pain",
      excerpt:
        "Cats are masters at hiding discomfort. Learn the subtle signs that might indicate your feline friend is in pain.",
      date: "March 25, 2025",
      slug: "cat-pain-signs",
      image: "https://i.pinimg.com/736x/44/ce/bf/44cebf1a2fa31ed0a0ac3c76e78ce21a.jpg",
      category: "Cat Care",
    },
    {
      id: 4,
      title: "The Benefits of Regular Vet Check-ups",
      excerpt: "Preventative care is essential for your pet's long-term health. Find out why regular vet visits matter.",
      date: "March 20, 2025",
      slug: "regular-checkups",
      image: "https://i.pinimg.com/736x/0e/ad/ee/0eadee684b3fc206b2b0c2116ef43776.jpg",
      category: "Preventative Care",
    },
    {
      id: 5,
      title: "How to Prepare Your Pet for a Video Consultation",
      excerpt:
        "Make the most of VetNova's virtual appointments with these preparation tips for a smooth video consultation.",
      date: "March 15, 2025",
      slug: "video-consultation-prep",
      image: "https://i.pinimg.com/736x/ed/74/66/ed74665802e45f39ef6ae70762a3e878.jpg",
      category: "Telemedicine",
    },
    {
      id: 6,
      title: "Common Parasites and How to Prevent Them",
      excerpt: "From fleas to ticks to intestinal worms, learn how to protect your pet from common parasites.",
      date: "March 10, 2025",
      slug: "parasite-prevention",
      image: "https://i.pinimg.com/736x/bb/bd/2a/bbbd2aedfb323c828230a9588e9fc301.jpg",
      category: "Parasites",
    },
  ]
export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-[#FC7729] text-white">
        <div className="absolute inset-0 bg-[url('https://i.pinimg.com/736x/0b/e8/6d/0be86d8bb0de9dd4950b5d9def983390.jpg?height=800&width=1600')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              VetNova Blog
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Expert advice and insights for the health and happiness of your
              furry family members
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link
              href={`/medicalBlogs/${post.slug}`}
              key={post.id}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-[#FCAA29] text-[#1D1D1D] text-sm font-medium px-3 py-1 rounded-full">
                  {post.category}
                </div>
              </div>
              <div className="p-6">
                <p className="text-[#303241] text-sm mb-2">{post.date}</p>
                <h3 className="text-xl font-bold text-[#1D1D1D] mb-3 group-hover:text-[#FC7729] transition-colors">
                  {post.title}
                </h3>
                <p className="text-[#303241] mb-4">{post.excerpt}</p>
                <div className="flex items-center text-[#FC7729] font-medium">
                  Read More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#303241] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Have Questions About Your Pet's Health?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Connect with professional veterinarians through secure appointments,
            live video calls, and real-time messaging.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#FC7729] text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors">
              Book a Consultation
            </button>
            <button className="bg-transparent border-2 border-[#FCAA29] text-[#FCAA29] px-8 py-3 rounded-full font-medium hover:bg-[#FCAA29] hover:text-[#303241] transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

