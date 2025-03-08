import { motion } from 'framer-motion';
import { FiUsers, FiShoppingCart } from 'react-icons/fi';

const ProductCard = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-2xl font-bold text-primary">${product.price}</span>
          <div className="flex items-center text-secondary">
            <FiUsers className="mr-1" />
            <span>{product.groupSize} needed</span>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <button className="w-full bg-primary text-white py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-primary/90 transition-colors">
            <FiShoppingCart />
            <span>Add to Cart</span>
          </button>
          <button className="w-full border border-primary text-primary py-2 rounded-lg hover:bg-primary/10 transition-colors">
            Join Group Buy
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;