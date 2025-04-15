// sehha/src/app/articles/page.js
"use client";

import { useState, useEffect } from "react";
import axios from "axios";

async function fetchAuthors() {
  try {
    const response = await axios.get("http://localhost:3000/api/articles", {
      params: { getAuthors: true },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching authors:", error);
    return ["all"]; // Fallback
  }
}

async function fetchArticles({ author = "all", search = "", page = 1 }) {
  try {
    const response = await axios.get("http://localhost:3000/api/articles", {
      params: { author, search, page },
      headers: {
        "Cache-Control": "no-store",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return {
      articles: [],
      pagination: { currentPage: 1, totalPages: 1, totalArticles: 0, articlesPerPage: 6 },
      error: error.response?.data?.details || error.message,
    };
  }
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [author, setAuthor] = useState("all");
  const [search, setSearch] = useState("");
  const [authors, setAuthors] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalArticles: 0,
    articlesPerPage: 6,
  });
  const [error, setError] = useState(null);

  // Fetch authors on component mount
  useEffect(() => {
    fetchAuthors().then((data) => {
      console.log("Fetched authors:", data);
      setAuthors(data);
    });
  }, []);

  // Fetch articles when author, search, or page changes
  useEffect(() => {
    fetchArticles({ author, search, page: pagination.currentPage }).then((data) => {
      console.log("Fetched articles:", data);
      if (data.error) {
        setError(data.error);
        setArticles([]);
        setPagination({ currentPage: 1, totalPages: 1, totalArticles: 0, articlesPerPage: 6 });
      } else {
        setError(null);
        setArticles(data.articles || []);
        setPagination((prev) => ({
          ...prev,
          ...data.pagination,
        }));
      }
    });
  }, [author, search, pagination.currentPage]);

  const handleAuthorChange = (newAuthor) => {
    setAuthor(newAuthor);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, currentPage: newPage }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFFFF] to-[#C8C8C8]">
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center mb-8 pt-4">
          <div className="bg-[#FCAA29] p-3 rounded-full shadow-lg mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2c-5.33 4-8 8-8 12 0 4.42 3.58 8 8 8s8-3.58 8-8c0-4-2.67-8-8-12zm1 17.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm1.5-5.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-3-3c-.83 0-1.5-.67-1.5-1.5S10.67 8 11.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-1-3c-.83 0-1.5-.67-1.5-1.5S9.67 4 10.5 4s1.5.67 1.5 1.5S11.33 8 10.5 8z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-[#303241]">
            Pet Care Articles
          </h1>
        </div>

        <div className="max-w-xl mx-auto mb-6 flex justify-between items-center">
          <div>
            <label htmlFor="author" className="mr-2 text-[#303241] font-medium">
              Filter by Author:
            </label>
            <select
              id="author"
              value={author}
              onChange={(e) => handleAuthorChange(e.target.value)}
              className="p-2 border rounded"
            >
              {authors.map((auth) => (
                <option key={auth} value={auth}>
                  {auth.charAt(0).toUpperCase() + auth.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="max-w-xl mx-auto mb-10">
          <div className="relative rounded-full overflow-hidden border-2 border-[#FC7729] shadow-md">
            <input
              type="text"
              placeholder="Search articles by title..."
              value={search}
              onChange={handleSearchChange}
              className="w-full py-3 px-6 bg-white text-[#1D1D1D] focus:outline-none"
            />
            <button className="absolute right-0 top-0 h-full px-6 bg-[#FC7729] text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {error ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-[#FCAA29] mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="text-[#FC7729] text-xl font-semibold">
              Failed to load articles
            </p>
            <p className="text-gray-600 mt-2">{error}</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-[#FCAA29] mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="text-[#FC7729] text-xl font-semibold">
              No articles found.
            </p>
            <p className="text-gray-600 mt-2">
              Please add some articles to the database or adjust your search.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <div
                  key={article._id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-transform hover:-translate-y-2"
                >
                  {article.image && (
                    <div className="relative">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="bg-[#F2C94C] px-3 py-1 rounded-full text-sm text-[#303241] font-medium">
                        {article.author}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-[#303241] mb-3">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.content}
                    </p>
                    <p className="text-gray-500 text-sm mb-4">
                      Published on: {new Date(article.date).toLocaleDateString()}
                    </p>
                    <button className="bg-[#FC7729] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#FCAA29] transition-colors duration-300 flex items-center justify-center w-full">
                      Read More
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {pagination.totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center gap-4">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className={`py-2 px-4 rounded-lg font-medium ${
                    pagination.currentPage === 1
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-[#FC7729] text-white hover:bg-[#FCAA29]"
                  }`}
                >
                  Previous
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: pagination.totalPages }, (_, index) => index + 1).map(
                    (pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`py-2 px-4 rounded-lg font-medium ${
                          pagination.currentPage === pageNum
                            ? "bg-[#FCAA29] text-white"
                            : "bg-gray-200 text-[#303241] hover:bg-gray-300"
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className={`py-2 px-4 rounded-lg font-medium ${
                    pagination.currentPage === pagination.totalPages
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-[#FC7729] text-white hover:bg-[#FCAA29]"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        <div className="mt-16 p-6 text-center">
          <div className="inline-block px-6 py-2 bg-[#303241] text-white rounded-full mb-4">
            <span className="text-[#FCAA29] font-bold">Pet</span>
            <span className="text-white font-bold">Care</span>
            <span className="text-[#FC7729] font-bold">Plus</span>
          </div>
          <p className="text-[#1D1D1D] text-sm">
            Providing the best resources for your beloved pets
          </p>
        </div>
      </div>
    </div>
  );
}