import { FiGithub, FiTwitter, FiLinkedin, FiInstagram } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Footer = () => {
  const socialLinks = [
    { icon: <FiGithub />, href: "#" },
    { icon: <FiTwitter />, href: "#" },
    { icon: <FiLinkedin />, href: "#" },
    { icon: <FiInstagram />, href: "#" },
  ];

  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">About Us</h3>
            <p className="text-gray-600">
              Discover amazing products with our AI-powered shopping platform. Join group buys and save more together.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Products', 'Group Buys', 'How it Works'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Support</h3>
            <ul className="space-y-2">
              {['FAQ', 'Contact Us', 'Shipping Info', 'Returns'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Newsletter</h3>
            <p className="text-gray-600">Subscribe to get updates on new products and group buys.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-4 py-2 bg-primary text-white rounded-r-lg hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
            <div className="flex space-x-4 pt-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-600 hover:text-primary text-xl transition-colors"
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-gray-600">
          <p>© 2024 AI-Powered Shopping. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;