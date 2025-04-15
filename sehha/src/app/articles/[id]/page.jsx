"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { Loader2, AlertCircle, FileText, ArrowLeft } from "lucide-react";

export default function ArticleDetailsPage({ params }) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();
  const { id } = params; // dynamic route param from folder name [id]

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/articles/${id}`);
        setArticle(response.data);
        setError(null);
      } catch (error) {
        setError(error?.response?.data?.error || "Failed to fetch article");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchArticle();
  }, [id]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {!loading && article && (
        <section className="relative bg-[#FC7729] text-white">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FC7729] to-[#FCAA29] opacity-80"></div>
          <div className="container mx-auto px-4 py-16 relative z-10">
            <div className="max-w-3xl mx-auto">
              <Link
                href="/articles"
                className="inline-flex items-center text-white hover:text-opacity-80 transition-colors mb-6"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Articles
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center">
                <span className="bg-white bg-opacity-20 text-white text-sm font-medium px-3 py-1 rounded-full mr-4">
                  {article.category || "Article"}
                </span>
                <p className="text-white text-sm">
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
                {article.author && (
                  <p className="text-white text-sm ml-4">By {article.author}</p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-12 w-12 text-[#FC7729] animate-spin mb-4" />
          <p className="text-[#303241] text-lg">Loading article...</p>
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
                  Error loading article
                </h3>
                <p className="text-red-700 mt-2">{error}</p>
                <div className="mt-4 flex gap-4">
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-red-600 text-white px-5 py-2 rounded-full font-medium hover:bg-red-700 transition-colors"
                  >
                    Try again
                  </button>
                  <Link
                    href="/articles"
                    className="bg-gray-200 text-gray-800 px-5 py-2 rounded-full font-medium hover:bg-gray-300 transition-colors"
                  >
                    Back to Articles
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Article Content */}
      {!loading && !error && article && (
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            {/* Article Cover Image */}
            {article.image ? (
              <div className="relative h-80 w-full overflow-hidden rounded-xl mb-8 bg-gray-100">
                <img
                  src={article.image}
                  alt={article.title}
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="relative h-80 w-full overflow-hidden rounded-xl mb-8 bg-gray-100 flex items-center justify-center">
                <FileText className="h-20 w-20 text-gray-300" />
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed text-[#303241]">
                {article.content}
              </p>
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-8">
                <h4 className="text-lg font-bold text-[#1D1D1D] mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-[#303241] text-sm px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Back Button */}
            <div className="mt-12 text-center">
              <Link
                href="/articles"
                className="inline-flex items-center bg-[#FC7729] text-white px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Articles
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Related Articles CTA */}
      {!loading && !error && article && (
        <section className="bg-[#303241] text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Continue Reading</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Explore more of our articles or subscribe to stay updated with our
              latest content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/articles"
                className="bg-[#FC7729] text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors"
              >
                Browse All Articles
              </Link>
              <button className="bg-transparent border-2 border-[#FCAA29] text-[#FCAA29] px-8 py-3 rounded-full font-medium hover:bg-[#FCAA29] hover:text-[#303241] transition-colors">
                Subscribe Now
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
