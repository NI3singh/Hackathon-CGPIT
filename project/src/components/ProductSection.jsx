import React from 'react';
import ProductCategory from './ProductCategory';
import '../styles/ProductSection.css';

const ProductSection = () => {
  const categories = [
    { id: 1, name: 'Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D' },
    { id: 2, name: 'Glasses', image: 'https://media.self.com/photos/5dd44cf5d0525b0009f5edf6/4:3/w_2560%2Cc_limit/AdobeStock_208000726.jpeg' },
    { id: 3, name: 'T-shirts', image: 'https://static.vecteezy.com/system/resources/thumbnails/028/252/048/small/men-s-t-shirt-realistic-mockup-in-different-colors-ai-generated-photo.jpg' },
    { id: 4, name: 'Watches', image: 'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?cs=srgb&dl=pexels-pixabay-277390.jpg&fm=jpg' },
  ];

  return (
    <div className="product-section">
      <h2 className="section-heading">Explore Categories</h2>
      <div className="categories-container">
        {categories.map(category => (
          <ProductCategory key={category.id} name={category.name} image={category.image} />
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
