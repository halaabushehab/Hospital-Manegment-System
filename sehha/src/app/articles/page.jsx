"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { Loader2, AlertCircle, FileText } from "lucide-react";

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/articles");
        setArticles(response.data);
        setError(null);
      } catch (error) {
        setError(error.response?.data?.error || "Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-[#FC7729] text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FC7729] to-[#FCAA29] opacity-80"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Articles
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Expert insights and in-depth analysis to keep you informed
            </p>
          </div>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-12 w-12 text-[#FC7729] animate-spin mb-4" />
          <p className="text-[#303241] text-lg">Loading articles...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="container mx-auto px-4 py-12">
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-6">
            <div className="flex items-start">
              <AlertCircle className="h-6 w-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-bold text-red-800">
                  Error loading articles
                </h3>
                <p className="text-red-700 mt-2">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 bg-red-600 text-white px-5 py-2 rounded-full font-medium hover:bg-red-700 transition-colors"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && articles.length === 0 && (
        <div className="container mx-auto px-4 py-16">
          <div className="bg-gray-50 rounded-xl p-8 text-center max-w-2xl mx-auto">
            <FileText className="h-16 w-16 text-[#FCAA29] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[#1D1D1D] mb-3">
              No articles found
            </h3>
            <p className="text-[#303241] text-lg mb-6">
              We’ll be adding new content soon. Check back later!
            </p>
            <Link
              href="/"
              className="inline-flex items-center bg-[#FC7729] text-white px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      )}

      {/* Articles Grid */}
      {!loading && articles.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                href={`/articles/${article._id}`}
                key={article._id}
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  {/* Conditionally show article image or a placeholder */}
                  {article.image ? (
                    <img
                      src={article.image}
                      alt={article.title}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                      <FileText className="h-12 w-12 text-gray-400" />
                    </div>
                  )}

                  <div className="absolute top-4 left-4 bg-[#FCAA29] text-[#1D1D1D] text-sm font-medium px-3 py-1 rounded-full">
                    {article.category || "Article"}
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[#303241] text-sm mb-2">
                    {article.date
                      ? new Date(article.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : new Date().toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                  </p>
                  <h3 className="text-xl font-bold text-[#1D1D1D] mb-3 group-hover:text-[#FC7729] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-[#303241] mb-4 line-clamp-3">
                    {article.content}
                  </p>
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
      )}

      {/* CTA Section */}
      <section className="bg-[#303241] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Want to Stay Updated?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and never miss our latest articles,
            updates, and expert insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#FC7729] text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors">
              Subscribe Now
            </button>
            <button className="bg-transparent border-2 border-[#FCAA29] text-[#FCAA29] px-8 py-3 rounded-full font-medium hover:bg-[#FCAA29] hover:text-[#303241] transition-colors">
              Browse All Articles
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
