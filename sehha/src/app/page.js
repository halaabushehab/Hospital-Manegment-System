"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Shield,
  FileText,
  Calendar,
  CreditCard,
  BarChart2,
  UserPlus,
  Clipboard,
  MessageSquare,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Youtube,
  Search,
  ArrowLeft,
  ArrowDown,
  ArrowUp,
  ArrowLeftCircle,
  ArrowRightCircle,
  ArrowUpCircle,
  ArrowDownCircle,
  MapPin,
  Phone,
  LineChart,
  User,
  CalendarClock,
  Mail,
  FileCheck,
  ClipboardList,
  PieChart,
  Settings,
  Bell,
  ArrowRight,
  Smile,
  PawPrint,
  Heart,
  Award,
  Clock,
  X,
  Pill,
  Syringe,
  Bone,
  Cat,
  Dog,
  Bird,
  Rabbit,
  ShoppingCart,
  PhoneCall,
  Stethoscope,
  Trash2,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  // States for articles
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [fetchedArticles, setFetchedArticles] = useState([]);
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [articlesLoading, setArticlesLoading] = useState(false);
  const [articlesError, setArticlesError] = useState(null);

  // States for products
  const [products, setProducts] = useState([]);
  const [shopLoading, setShopLoading] = useState(false);
  const [shopError, setShopError] = useState(null);

  // Next.js Router for navigation
  const router = useRouter();
  // Set a default userId; adjust as needed
  const userId = "guest";

  // Fetch articles from /api/articles
  useEffect(() => {
    async function fetchArticles() {
      try {
        setArticlesLoading(true);
        const response = await axios.get("/api/articles");
        const allArticles = response.data || [];
        if (allArticles.length > 0) {
          setFeaturedArticle(allArticles[0]);
          setFetchedArticles(allArticles.slice(1));
        } else {
          setFeaturedArticle(null);
          setFetchedArticles([]);
        }
        setArticlesError(null);
      } catch (error) {
        setArticlesError(
          error?.response?.data?.error || "Failed to fetch articles"
        );
      } finally {
        setArticlesLoading(false);
      }
    }
    fetchArticles();
  }, []);

  // Fetch products from /api/animal-products
  useEffect(() => {
    async function fetchProducts() {
      try {
        setShopLoading(true);
        const response = await axios.get(
          "http://localhost:3000/api/animal-products"
        );
        if (Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error(err);
        setProducts([]);
      } finally {
        setShopLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Function to open and close the article popup
  const closePopup = () => {
    setSelectedArticle(null);
    document.body.style.overflow = "auto";
  };

  const openArticlePopup = (article) => {
    setSelectedArticle(article);
    // Prevent background scrolling when popup is active
    document.body.style.overflow = "hidden";
  };

  // Updated addToCart function: posts product data to the cart endpoint and navigates directly to the cart page
  const addToCart = async (product) => {
    try {
      console.log("Adding product to cart:", product);
      const response = await axios.post("/api/cart", { userId, product });
      console.log("Add to cart response:", response.data);
      // Navigate directly to the cart page once the product is added
      router.push("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert(`Failed to add to cart: ${error.message}`);
    }
  };

  // Example Features array remains unchanged
  const features = [
    {
      icon: <Stethoscope size={28} />,
      title: "24/7 Emergency Care",
      description:
        "Round-the-clock veterinary services for urgent pet health situations with specialized equipment",
    },
    {
      icon: <FileText size={28} />,
      title: "Digital Health Records",
      description:
        "Comprehensive pet health tracking with instant access to medical history and treatment plans",
    },
    {
      icon: <Calendar size={28} />,
      title: "Easy Appointment Booking",
      description:
        "Convenient online scheduling with automatic reminders for check-ups and vaccinations",
    },
    {
      icon: <Pill size={28} />,
      title: "In-House Pharmacy",
      description:
        "Full-service pet pharmacy with prescription medications, supplements, and specialized diets",
    },
    {
      icon: <BarChart2 size={28} />,
      title: "Advanced Diagnostics",
      description:
        "State-of-the-art laboratory and imaging services for accurate, rapid diagnoses",
    },
    {
      icon: <UserPlus size={28} />,
      title: "Pet Parent Portal",
      description:
        "Self-service platform for appointments, prescriptions, and accessing medical records",
    },
    {
      icon: <Syringe size={28} />,
      title: "Preventive Care Plans",
      description:
        "Customized wellness programs to keep your pets healthy and prevent common diseases",
    },
    {
      icon: <MessageSquare size={28} />,
      title: "Telehealth Consultations",
      description:
        "Virtual veterinary consultations for minor concerns and follow-up appointments",
    },
  ];

  // Example userTypes array remains unchanged
  const userTypes = [
    {
      icon: <Dog size={32} />,
      emoji: "🐕",
      title: "For Dog Owners",
      color: "#FCAA29",
      description: "Specialized care for your canine companions",
      features: [
        { icon: <Bone size={18} />, text: "Breed-specific health monitoring" },
        { icon: <Heart size={18} />, text: "Preventive care & vaccinations" },
        {
          icon: <Pill size={18} />,
          text: "Prescription medications & supplements",
        },
      ],
    },
    {
      icon: <Cat size={32} />,
      emoji: "🐈",
      title: "For Cat Owners",
      color: "#FC7729",
      description: "Feline-focused healthcare solutions",
      features: [
        { icon: <PawPrint size={18} />, text: "Behavioral consultations" },
        { icon: <Pill size={18} />, text: "Specialized feline medications" },
        { icon: <Shield size={18} />, text: "Dental care & grooming services" },
      ],
    },
    {
      icon: <Bird size={32} />,
      emoji: "🦜",
      title: "For Exotic Pet Owners",
      color: "#FCAA29",
      description: "Expert care for birds, reptiles & small mammals",
      features: [
        {
          icon: <Stethoscope size={18} />,
          text: "Specialized exotic animal medicine",
        },
        {
          icon: <FileText size={18} />,
          text: "Species-specific nutritional guidance",
        },
        {
          icon: <Clipboard size={18} />,
          text: "Habitat & environmental consultations",
        },
      ],
    },
  ];

  return (
    <main className="bg-[#1D1D1D] text-[#FFFFFF]">
      {/* Hero Section with Video Background */}
      <div className="relative w-full h-screen overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-[#000000]/60 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
          <div className="animate-fadeIn">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[#FFFFFF] drop-shadow-lg">
              <span className="text-[#FCAA29]">VetNova</span> Animal Hospital
            </h1>
            <p className="text-lg md:text-xl mb-8 text-[#FFFFFF] max-w-2xl">
              Expert veterinary care and premium pet medications for your
              beloved companions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="appointment"
                className="bg-[#FC7729] hover:bg-[#FCAA29] text-[#FFFFFF] px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
              >
                Book Appointment
              </Link>
              <Link
                href="animal-products"
                className="bg-[#303241] hover:bg-[#FCAA29] text-[#FFFFFF] border border-[#FCAA29] px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
              >
                Shop Medicines
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <svg
            className="w-6 h-6 text-[#FFFFFF]"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-20 bg-[#ffffff]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fadeIn">
            <div className="inline-block px-4 py-1 rounded-full bg-[#FCAA29]/20 text-[#FCAA29] font-medium text-sm mb-4">
              OUR SERVICES
            </div>
            <h2 className="text-4xl font-bold text-[#000000] mb-4">
              Comprehensive Pet Healthcare
            </h2>
            <p className="text-lg text-[#000000] max-w-2xl mx-auto">
              State-of-the-art veterinary services designed to keep your pets
              healthy, happy, and thriving throughout every stage of their lives
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-[#303241] rounded-xl p-6 shadow-lg border border-[#C8C8C8]/10 transition-all duration-300 hover:shadow-xl hover:border-[#FCAA29]/20 hover:translate-y-[-5px] group animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-[#FCAA29]/10 text-[#FCAA29] rounded-xl p-3 inline-flex mb-4 group-hover:bg-[#FCAA29] group-hover:text-[#303241] transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#FFFFFF] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#C8C8C8]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop Section (Dynamic) */}
      {/* Shop Section (Dynamic) */}
      <section className="py-20 bg-[#ffffff]" id="shop">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fadeIn">
            <div className="inline-block px-4 py-1 rounded-full bg-[#FC7729]/20 text-[#FC7729] font-medium text-sm mb-4">
              PET PHARMACY
            </div>
            <h1 className="text-4xl font-bold text-gray-800">
              Quality Pet Medications & Supplies
            </h1>
          </div>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center mb-12">
            Browse our wide selection of veterinary-approved medications,
            supplements, and specialty pet products
          </p>

          {shopLoading ? (
            <div className="text-center text-gray-500">Loading products...</div>
          ) : shopError ? (
            <div className="text-center text-red-400">{shopError}</div>
          ) : products.length === 0 ? (
            <div className="text-center text-gray-500">No products found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <div
                  key={product._id || index}
                  className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-transform hover:-translate-y-2 duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-0 right-0 bg-amber-400 text-white px-3 py-1 rounded-bl-lg font-semibold">
                      {product.price}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="bg-amber-200 px-3 py-1 rounded-full text-sm text-gray-800 font-medium">
                        {product.category}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                      {product.name}
                    </h2>
                    <div className="mt-4">
                      {product.stock > 0 ? (
                        <button
                          onClick={() => addToCart(product)}
                          className="w-full bg-amber-400 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-500 transition-colors duration-300 flex items-center justify-center"
                        >
                          Add to Cart
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 ml-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                            <path d="M16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                          </svg>
                        </button>
                      ) : (
                        <button
                          disabled
                          className="w-full bg-gray-300 text-gray-600 py-3 px-4 rounded-lg font-medium cursor-not-allowed flex items-center justify-center"
                        >
                          Sold Out
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 text-center"></div>
        </div>
      </section>

      {/* Specialized Care Section */}
      <section className="py-20 bg-[#ffffff]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fadeIn">
            <span className="inline-block px-4 py-1 rounded-full bg-[#FCAA29]/20 text-[#FCAA29] font-medium text-sm mb-4">
              PET CARE
            </span>
            <h2 className="text-4xl font-bold text-[#000000] mb-4">
              Specialized Care For Every Pet
            </h2>
            <p className="text-lg text-[#000000] max-w-2xl mx-auto">
              Tailored veterinary services and products for different types of
              pets and their unique needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {userTypes.map((type, index) => (
              <div
                key={index}
                className="relative group animate-fadeIn"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#FCAA29] to-[#FC7729] rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-[#303241] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] h-full flex flex-col">
                  <div className="flex items-center mb-6">
                    <div
                      className="flex items-center justify-center w-14 h-14 rounded-full text-white"
                      style={{ backgroundColor: type.color }}
                    >
                      <span className="text-3xl">{type.emoji}</span>
                    </div>
                    <h3 className="ml-4 text-2xl font-bold text-[#FFFFFF]">
                      {type.title}
                    </h3>
                  </div>
                  <p className="text-[#C8C8C8] mb-6">{type.description}</p>
                  <div className="mt-auto">
                    {type.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start mb-4 last:mb-0 group"
                      >
                        <div className="p-1 rounded-full mr-3 flex-shrink-0 mt-0.5 text-[#FCAA29] bg-[#FCAA29]/10 group-hover:bg-[#FCAA29] group-hover:text-[#303241] transition-colors duration-300">
                          {feature.icon}
                        </div>
                        <span className="text-[#C8C8C8] group-hover:text-[#FFFFFF] transition-colors duration-300">
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pet Health Resources Section */}
      <section className="py-20 bg-[#ffffff]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fadeIn">
            <span className="inline-block px-4 py-1 rounded-full bg-[#FC7729]/20 text-[#FC7729] font-medium text-sm mb-4">
              PET HEALTH RESOURCES
            </span>
            <h2 className="text-4xl font-bold text-[#000000] mb-4">Articles</h2>
            <p className="text-lg text-[#000000] max-w-2xl mx-auto">
              Stay informed with our collection of veterinarian-approved
              articles on pet health, care guidelines, and emergency
              preparedness
            </p>
          </div>
          {articlesLoading ? (
            <div className="text-center text-[#C8C8C8]">
              Loading articles...
            </div>
          ) : articlesError ? (
            <div className="text-center text-red-400">{articlesError}</div>
          ) : !featuredArticle && fetchedArticles.length === 0 ? (
            <div className="text-center text-[#C8C8C8]">No articles found.</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredArticle && (
                <div className="lg:col-span-3 animate-fadeIn">
                  <div
                    className="relative overflow-hidden rounded-2xl cursor-pointer group"
                    onClick={() => openArticlePopup(featuredArticle)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      {featuredArticle.tags && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {featuredArticle.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="bg-[#FCAA29] text-[#000000] text-xs font-medium px-3 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <h3 className="text-2xl font-bold text-[#FFFFFF] mb-2">
                        {featuredArticle.title}
                      </h3>
                      <p className="text-[#C8C8C8] mb-4">
                        {featuredArticle.summary}
                      </p>
                      {featuredArticle.readTime && (
                        <div className="flex items-center text-sm text-[#C8C8C8]">
                          <Clock size={16} className="mr-1" />
                          {featuredArticle.readTime}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {fetchedArticles.map((article, index) => (
                <div
                  key={index}
                  className="bg-[#303241] rounded-xl overflow-hidden shadow-lg border border-[#C8C8C8]/10 hover:border-[#FCAA29]/30 transition-all duration-300 cursor-pointer group animate-fadeIn"
                  style={{ animationDelay: `${index * 0.15}s` }}
                  onClick={() => openArticlePopup(article)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-5">
                    {article.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {article.tags.slice(0, 2).map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-[#FCAA29]/20 text-[#FCAA29] text-xs px-3 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-[#FFFFFF] mb-2 group-hover:text-[#FCAA29] transition-colors">
                      {article.title}
                    </h3>
                    {article.summary && (
                      <p className="text-[#C8C8C8] mb-4 line-clamp-2">
                        {article.summary}
                      </p>
                    )}
                    {article.readTime && (
                      <div className="flex items-center text-sm text-[#C8C8C8]">
                        <Clock size={16} className="mr-1" />
                        {article.readTime}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="mt-12 text-center"></div>
        </div>
      </section>

      {/* Article Popup */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-[#000000]/80 flex items-center justify-center p-4"
          onClick={closePopup}
        >
          <div
            className="bg-[#303241] rounded-xl max-w-7xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-[#303241] p-4 border-b border-[#C8C8C8]/10 flex justify-between items-center z-10">
              <h3 className="text-xl font-bold text-[#FFFFFF]">
                {selectedArticle.title}
              </h3>
              <button
                onClick={closePopup}
                className="p-2 rounded-full hover:bg-[#303241] transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              {selectedArticle.tags && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedArticle.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-[#FCAA29]/20 text-[#FCAA29] text-xs px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {selectedArticle.readTime && (
                    <span className="bg-[#303241] text-[#C8C8C8] text-xs px-3 py-1 rounded-full flex items-center">
                      <Clock size={14} className="mr-1" />
                      {selectedArticle.readTime}
                    </span>
                  )}
                </div>
              )}
              {selectedArticle.image && (
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}
              <div className="prose prose-invert max-w-none">
                {(selectedArticle.fullContent || selectedArticle.content || "")
                  .split("\n\n")
                  .map((paragraph, idx) => {
                    if (
                      paragraph.startsWith("**") &&
                      paragraph.endsWith(":**")
                    ) {
                      return (
                        <h4
                          key={idx}
                          className="text-xl font-bold text-[#FFFFFF] mt-6 mb-3"
                        >
                          {paragraph.replace(/\*\*/g, "")}
                        </h4>
                      );
                    } else {
                      return (
                        <p key={idx} className="mb-4 text-[#C8C8C8]">
                          {paragraph}
                        </p>
                      );
                    }
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
