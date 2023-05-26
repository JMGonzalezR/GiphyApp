"use client";

import { useState } from "react";
import Image from "next/image";
import { useGetTrendingGifsQuery, useGetSearchGifsQuery } from "api";
import Modal from "Components/Modal";
import { Gif } from "api";

const PAGE_SIZE = 10;

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGif, setSelectedGif] = useState<Gif | null>(null);
  const [page, setPage] = useState(0);

  const {
    data: trendingData,
    error: trendingError,
    isLoading: trendingIsLoading,
  } = useGetTrendingGifsQuery({ limit: PAGE_SIZE, offset: page * PAGE_SIZE });

  const {
    data: searchData,
    error: searchError,
    isLoading: searchIsLoading,
  } = useGetSearchGifsQuery({
    searchTerm,
    limit: PAGE_SIZE,
    offset: page * PAGE_SIZE,
  });

  const handleGifClick = (gif: Gif) => {
    setSelectedGif(gif);
  };

  const handleCloseModal = () => {
    setSelectedGif(null);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <h1 className="text-3xl font-bold text-gray-900">My GIPHY App</h1>
          <div className="mt-6">
            <input
              type="text"
              placeholder="Search GIFs..."
              className="w-full px-4 py-2 text-black rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {(searchTerm === "" || searchIsLoading) && trendingIsLoading && (
              <p className="text-black">Loading...</p>
            )}

            {searchTerm === "" &&
              trendingData &&
              trendingData.map((gif) => (
                <div
                  key={gif.id}
                  className="bg-white overflow-hidden shadow rounded-lg cursor-pointer"
                  onClick={() => handleGifClick(gif)}
                >
                  <Image
                    src={gif.images["original"].url}
                    alt={gif.title}
                    width={300}
                    height={300}
                  />
                  <div className="px-4 py-2">
                    <h2 className="text-lg font-medium text-gray-900">
                      {gif.title}
                    </h2>
                  </div>
                </div>
              ))}

            {searchTerm !== "" &&
              searchData &&
              searchData.map((gif) => (
                <div
                  key={gif.id}
                  className="bg-white overflow-hidden shadow rounded-lg cursor-pointer"
                  onClick={() => handleGifClick(gif)}
                >
                  <Image
                    src={gif.images["original"].url}
                    alt={gif.title}
                    width={300}
                    height={300}
                  />
                  <div className="px-4 py-2">
                    <h2 className="text-lg font-medium text-gray-900">
                      {gif.title}
                    </h2>
                  </div>
                </div>
              ))}

            {(searchTerm === "" || searchIsLoading) && trendingIsLoading && (
              <p className="text-black">Loading...</p>
            )}
            {!searchIsLoading && !trendingIsLoading && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLoadMore}
              >
                Load More
              </button>
            )}
          </div>
        </div>
      </div>
      {selectedGif && (
        <Modal isOpen={true} onClose={handleCloseModal}>
          <div className="text-center">
            <Image
              src={selectedGif.images.original.url}
              alt={selectedGif.title}
              width={500}
              height={500}
            />
            <h2 className="text-lg font-medium text-gray-900">
              {selectedGif.title}
            </h2>
          </div>
        </Modal>
      )}
    </div>
  );
}
