'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=4')
      .then(res => res.json())
      .then(data => {
        setFeaturedProducts(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col">
      {/* Luxurious Hero Section */}
      <div className="relative  bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-50"
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Fashion background"
          />
          <div className="absolute inset-0 bg-gray-900 mix-blend-multiply"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Elevate Your Style
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
            Discover timeless pieces that blend sophistication with modern elegance
          </p>
          <div className="mt-10 flex justify-center space-x-4">
            <Link
              href="/client-products"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-900 bg-white hover:bg-gray-100 transition-colors duration-300"
            >
              Shop Collection
            </Link>
            <Link
              href="#new-arrivals"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-transparent hover:bg-gray-800 border-gray-300 transition-colors duration-300"
            >
              New Arrivals
            </Link>
          </div>
        </div>
      </div>

      {/* Minimalist Benefits */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-gray-100 text-gray-900">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Free Shipping</h3>
            <p className="mt-2 text-base text-gray-600">
              On all orders over $100
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-gray-100 text-gray-900">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Fast Delivery</h3>
            <p className="mt-2 text-base text-gray-600">
              Get your order in 2-3 business days
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-gray-100 text-gray-900">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Quality Guarantee</h3>
            <p className="mt-2 text-base text-gray-600">
              Premium materials and craftsmanship
            </p>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div id="new-arrivals" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-light tracking-wide text-gray-900 sm:text-4xl">
              New Arrivals
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-base text-gray-600">
              Curated selection of our latest pieces
            </p>
          </div>

          {loading ? (
            <div className="mt-10 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="w-full h-80 bg-gray-200 rounded-md"></div>
                  <div className="mt-4 h-4 bg-gray-200 rounded"></div>
                  <div className="mt-2 h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {featuredProducts.map((product) => (
                <div key={product.id} className="group relative">
                  <div className="w-full min-h-80 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full  object-contain lg:w-full lg:h-full"
                    />
                  </div>
                  <div className="mt-4 flex flex-col">
                    <h3 className="text-sm text-gray-700 font-medium">
                      <Link href={`/products/${product.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.title.split(' ').slice(0, 5).join(' ')}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 capitalize">
                      {product.category}
                    </p>
                    <p className="mt-2 text-sm font-medium text-gray-900">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 text-center">
            <Link
              href="/products"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-300"
            >
              View All Products
            </Link>
          </div>
        </div>
      </div>

      {/* Editorial Section */}
      <div className="relative bg-white py-16">
        <div className="absolute inset-0 overflow-hidden">
          <img
            className="w-full h-full object-cover opacity-10"
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Fabric texture"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-light tracking-wide text-gray-900 sm:text-4xl">
              The Art of Dressing Well
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-base text-gray-600">
              Our philosophy is simple: clothing should make you feel confident and comfortable. Each piece is thoughtfully designed to stand the test of time.
            </p>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <h2 className="text-2xl font-serif font-light tracking-wide text-gray-900 sm:text-3xl">
                Join Our Newsletter
              </h2>
              <p className="mt-3 max-w-3xl text-base text-gray-600">
                Receive exclusive offers, styling tips, and early access to new collections.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 lg:w-1/2">
              <form className="sm:flex">
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-5 py-3 border border-gray-300 shadow-sm placeholder-gray-500 focus:ring-gray-500 focus:border-gray-500 sm:max-w-xs rounded-md"
                  placeholder="Enter your email"
                />
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-300"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}