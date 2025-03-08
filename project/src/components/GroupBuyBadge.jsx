import { motion } from 'framer-motion';
import { FiUsers } from 'react-icons/fi';

const GroupBuyBadge = ({ discount, membersNeeded }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full flex items-center space-x-2"
    >
      <FiUsers />
      <span>{membersNeeded} more for {discount}% off</span>
    </motion.div>
  );
};

export default GroupBuyBadge;