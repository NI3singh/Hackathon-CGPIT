import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProductCategory.css';

const ProductCategory = ({ name, image }) => {
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate(`/category/${name.toLowerCase()}`);
  };

  return (
    <div className="product-category">
      <img src={image} alt={name} className="category-image" />
      <h3>{name}</h3>
      <button onClick={handleViewAll} className="view-all-btn">View All</button>
    </div>
  );
};

export default ProductCategory;
