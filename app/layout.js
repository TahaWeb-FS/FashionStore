import './globals.css';
import Navbar from './navbar.';
import Footer from './footer';

export const metadata = {
  title: 'FashionStore',
  description: 'Next.js e-commerce demo',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow p-4 bg-gray-50">{children}</main>
        <Footer />
      </body>
    </html>
  );
}