import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#F7E1D7] border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <span className="font-bold text-xl mb-4 font-['Playfair_Display'] text-rose-600">Crave</span>
            <span className="font-bold text-xl ml-1 mb-4 text-indigo-600">Bots</span>
            <p className="text-gray-700 mb-4">
              AI-powered restaurant menu search that understands your cravings
              and mood, not just keywords.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-xl mb-4 font-['Playfair_Display'] text-gray-800">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-700 hover:text-rose-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-700 hover:text-rose-600 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/restaurants" className="text-gray-700 hover:text-rose-600 transition-colors">
                  Partner Restaurants
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-700 hover:text-rose-600 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-xl mb-4 font-['Playfair_Display'] text-gray-800">Connect With Us</h3>
            <p className="text-gray-700 mb-2">Have questions or feedback?</p>
            <p className="text-gray-700 mb-4">
              <a href="mailto:hello@cravebots.com" className="text-indigo-600 hover:underline">
                hello@cravebots.com
              </a>
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-rose-600 transition-colors">
                <span className="sr-only">Twitter</span>
                {/* Twitter SVG */}
              </a>
              <a href="#" className="text-gray-500 hover:text-rose-600 transition-colors">
                <span className="sr-only">Instagram</span>
                {/* Instagram SVG */}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-6 mt-6 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} CraveBots. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-2">
            <Link href="/privacy" className="hover:text-rose-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-rose-600 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
