import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUpload, FiX, FiTrendingUp, FiUsers, FiShoppingBag, FiGift } from 'react-icons/fi';
import ImageUpload from './components/ImageUpload';
import ProductCard from './components/ProductCard';
import GroupBuyBadge from './components/GroupBuyBadge';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';
import { FiCamera } from "react-icons/fi";

import './App.css';

// Mock data - replace with actual API calls
const mockProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    groupSize: 3,
    discount: 15
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    groupSize: 4,
    discount: 20
  },
  {
    id: 3,
    name: "Laptop Stand",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46",
    groupSize: 5,
    discount: 25
  }
];

const categories = [
  { name: "Electronics", icon: <FiTrendingUp />, count: 150 },
  { name: "Fashion", icon: <FiShoppingBag />, count: 320 },
  { name: "Home & Living", icon: <FiGift />, count: 280 },
  { name: "Sports", icon: <FiUsers />, count: 190 }
];

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [similarProducts, setSimilarProducts] = useState(mockProducts);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const handleImageUpload = (file) => {
    setUploadedImage(URL.createObjectURL(file));
    setSimilarProducts(mockProducts);
    setIsUploadOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-gray-900"
            >
              AI-Powered Shopping
            </motion.h1>
            <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => setIsUploadOpen(true)}
  className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
>
  <FiCamera />
  <span>Visual Search</span>
</motion.button>

          </div>
          <SearchBar />
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary to-purple-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Discover Products with AI
              </h2>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Upload an image and let our AI find similar products at the best prices
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsUploadOpen(true)}
                className="bg-white text-primary px-8 py-3 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-colors"
              >
                Start Shopping
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Featured Categories */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="text-3xl text-primary mb-4">{category.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-gray-600">{category.count} Products</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Group Buy Benefits */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Group Buy?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="text-3xl text-primary mb-4">
                  <FiUsers />
                </div>
                <h3 className="text-xl font-semibold mb-2">Better Together</h3>
                <p className="text-gray-600">Join groups of buyers to unlock bigger discounts on your favorite products.</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="text-3xl text-primary mb-4">
                  <FiGift />
                </div>
                <h3 className="text-xl font-semibold mb-2">Exclusive Deals</h3>
                <p className="text-gray-600">Access special prices and deals available only for group purchases.</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="text-3xl text-primary mb-4">
                  <FiTrendingUp />
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Shopping</h3>
                <p className="text-gray-600">Let AI help you find the best products at the most competitive prices.</p>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <AnimatePresence>
            {isUploadOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Upload Product Image</h2>
                    <button
                      onClick={() => setIsUploadOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FiX size={24} />
                    </button>
                  </div>
                  <ImageUpload onImageUpload={handleImageUpload} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {uploadedImage && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Your Uploaded Image</h2>
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={uploadedImage}
                alt="Uploaded product"
                className="w-full max-w-md rounded-lg shadow-md"
              />
            </div>
          )}

          {similarProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Similar Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarProducts.map((product) => (
                  <div key={product.id} className="relative">
                    <ProductCard product={product} />
                    <GroupBuyBadge
                      discount={product.discount}
                      membersNeeded={product.groupSize}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;

// import { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FiUpload, FiX, FiTrendingUp, FiUsers, FiShoppingBag, FiGift } from 'react-icons/fi';

// import ImageUpload from './components/ImageUpload';
// import ProductCard from './components/ProductCard';
// import GroupBuyBadge from './components/GroupBuyBadge';
// import SearchBar from './components/SearchBar';
// import Footer from './components/Footer';
// import ProductDetails from "./components/ProductDetails";
// import ProductSection from './components/ProductSection';
// import CategoryPage from './components/CategoryPage';

// import './App.css';

// // Mock data - replace with actual API calls
// const mockProducts = [
//   { id: 1, name: "Premium Wireless Headphones", price: 199.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e", groupSize: 3, discount: 15 },
//   { id: 2, name: "Smart Watch Pro", price: 299.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30", groupSize: 4, discount: 20 },
//   { id: 3, name: "Laptop Stand", price: 49.99, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46", groupSize: 5, discount: 25 }
// ];

// const categories = [
//   { name: "Electronics", icon: <FiTrendingUp />, count: 150 },
//   { name: "Fashion", icon: <FiShoppingBag />, count: 320 },
//   { name: "Home & Living", icon: <FiGift />, count: 280 },
//   { name: "Sports", icon: <FiUsers />, count: 190 }
// ];

// function App() {
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const [similarProducts, setSimilarProducts] = useState(mockProducts);
//   const [isUploadOpen, setIsUploadOpen] = useState(false);

//   const handleImageUpload = (file) => {
//     setUploadedImage(URL.createObjectURL(file));
//     setSimilarProducts(mockProducts);
//     setIsUploadOpen(false);
//   };

//   return (
//     <Router>
//       <div className="App">
//         <header className="bg-white shadow-sm sticky top-0 z-50">
//           <div className="max-w-7xl mx-auto px-4 py-4">
//             <div className="flex items-center justify-between mb-4">
//               <motion.h1 
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="text-3xl font-bold text-gray-900"
//               >
//                 AI-Powered Shopping
//               </motion.h1>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setIsUploadOpen(true)}
//                 className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
//               >
//                 <FiUpload />
//                 <span>Upload Image</span>
//               </motion.button>
//             </div>
//             <SearchBar />
//           </div>
//         </header>

//         <Routes>
//           <Route path="/" element={<ProductSection />} />
//           <Route path="/category/:category" element={<CategoryPage />} />
//           <Route path="/product/:category/:id" element={<ProductDetails />} />
//         </Routes>

//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;
