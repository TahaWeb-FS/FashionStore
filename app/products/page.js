import React, { Suspense } from 'react';  // Add this import

import { redis } from '../lib/redis';

export const dynamic = 'force-dynamic'; // Optional: disable static caching

async function fetchProducts() {
  const cacheKey = 'fakestore:products';

  // Try to get cached data
  const cached = await redis.get(cacheKey);
  if (cached) {
    console.log('💾 Returning cached products');
    return cached;
  }

  // If not cached, fetch from API
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();

    // Cache the result with 1 hour TTL
    await redis.set(cacheKey, data, { ex: 3600 });
    console.log('📡 Fetched from API and cached');
    return data;
  } catch (error) {
    console.error('SSR fetch error:', error);
    return [];
  }
}

const categoryStyles = {
  "men's clothing": {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-200'
  },
  "women's clothing": {
    bg: 'bg-pink-100',
    text: 'text-pink-800',
    border: 'border-pink-200'
  },
  jewelry: {
    bg: 'bg-amber-100',
    text: 'text-amber-800',
    border: 'border-amber-200'
  },
  electronics: {
    bg: 'bg-indigo-100',
    text: 'text-indigo-800',
    border: 'border-indigo-200'
  }
};

export default async function ServerProductsPage() {
  const products = await fetchProducts();

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Our Collection
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Discover quality products for every need
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Suspense fallback={<div>Loading...</div>}>
            {products.map((product) => {
              const categoryStyle = categoryStyles[product.category] || {
                bg: 'bg-gray-100',
                text: 'text-gray-800',
                border: 'border-gray-200'
              };

              return (
                <div 
                  key={product.id} 
                  className="group relative flex flex-col h-full bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className={`h-2 w-full ${categoryStyle.bg}`}></div>

                  <div className="flex flex-col flex-grow p-4">
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-48 w-full object-contain object-center group-hover:opacity-90 transition-opacity duration-300"
                      />
                    </div>

                    <div className="mt-4 flex-grow">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryStyle.bg} ${categoryStyle.text} mb-2`}>
                        {product.category}
                      </span>
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2 min-h-[40px]">
                        {product.title}
                      </h3>
                      <div className="mt-3 flex items-center justify-between">
                        <p className="text-base font-bold text-gray-900">
                          ${product.price.toFixed(2)}
                        </p>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-4 w-4 ${i < Math.round(product.rating.rate) ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-1 text-xs text-gray-500">
                            ({product.rating.count})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50">
                    <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300">
                      Add to cart
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
