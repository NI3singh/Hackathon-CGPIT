import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetails.css";

const categoryProducts = {
  shoes: [
    { id: 1, name: "Nike Air Max", price: 120, image: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/0ca73e26-13fb-4cf6-854d-aea2287675d3/AIR+MAX+90.png" },
    { id: 2, name: "Adidas Ultraboost", price: 140, image: "https://assets.adidas.com/images/w_600,f_auto,q_auto/d97211d7698e4b92ada9fb490d5ec884_9366/Ultraboost_5_Shoes_Black_IH3754.jpg" },
    { id: 3, name: "Puma RS-X", price: 110, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQpF2GWRvUmCB3zOnZHseXVVR3Jg2Ez0TBtWpjTZx-OnISswah7th64tAA8GLz6g7OxEWNQDkRViMKoE-0hhOTZIR8Pu1DAeojsfPCTRMPbt42uH1YQZZCxgQ" },
  ],
  glasses: [
    { id: 1, name: "Ray-Ban Aviator", price: 150, image: "https://images2.ray-ban.com//cdn-record-files-pi/7a1ca51a-50df-4468-bb71-add7002829f0/c6fba4b8-a020-45d9-a871-add700282b73/0RB3625__9196G5__STD__shad__qt.png?impolicy=RB_Product_clone&width=700&bgc=%23f2f2f2" },
    { id: 2, name: "Oakley Holbrook", price: 130, image: "https://golfmartindia.com/wp-content/uploads/2024/12/holbrook-oo9102-f055_7.jpg" },
    { id: 3, name: "Gucci GG0061S", price: 200, image: "https://image4.cdnsbg.com/2/10/352397_1651816512311.jpg" },
  ],
  "t-shirts": [
    { id: 1, name: "Plain Cotton Tee", price: 25, image: "https://m.media-amazon.com/images/I/31lRIQQBhmL._AC_UY1100_.jpg" },
    { id: 2, name: "Graphic Printed Tee", price: 30, image: "https://veirdo.in/cdn/shop/files/v51.jpg?v=1736570574" },
    { id: 3, name: "V-Neck T-Shirt", price: 28, image: "https://www.americancrew.in/cdn/shop/products/ACZ390-A.jpg?v=1655880562" },
  ],
  watches: [
    { id: 1, name: "Rolex Submariner", price: 10000, image: "https://billionarewatches.com/wp-content/uploads/2023/05/Rolex-Submariner-Full-Silver-Green-Dial-Super-High-Quality-Swiss-Automatic-Watch-4-2.jpg" },
    { id: 2, name: "Casio G-Shock", price: 150, image: "https://www.casio.com/content/dam/casio/product-info/locales/in/en/timepiece/product/watch/G/GM/GMA/gma-p2100bb-1a/assets/GMA-P2100BB-1A_hand.jpg.transform/main-visual-sp/image.jpg" },
    { id: 3, name: "Apple Watch", price: 400, image: "https://media.istockphoto.com/id/496730484/photo/apple-watch-sport-42mm-silver-aluminum-case-with-white-band.jpg?s=612x612&w=0&k=20&c=RY2MGp4S-OVqAZm1ZCUDhM6KSmfAJ02RU51l4mJa2EA=" },
  ],
};

const ProductDetails = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const product = categoryProducts[category]?.find((p) => p.id === parseInt(id));

  const [quantity, setQuantity] = useState(1);
  const pricePerUnit = product?.price || 0;

  // Discount logic: 10% off if buying 5 or more
  const discount = quantity >= 5 ? 0.1 : 0;
  const totalPrice = pricePerUnit * quantity * (1 - discount);

  if (!product) {
    return <h2>Product not found!</h2>;
  }

  return (
    <div className="product-details">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>Price per unit: <strong>${pricePerUnit}</strong></p>

      <div className="quantity-section">
        <label>Quantity: </label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
      </div>

      {/* Show discount message ONLY if quantity is 5 or more */}
      {quantity >= 1 && (
        <div className="discount-highlight">
          🎉 Bulk Offer: You get <strong>10% OFF</strong> for buying 5 or more!
        </div>
      )}

      <h3>Total Price: <span className={quantity >= 5 ? "discounted-price" : ""}>${totalPrice.toFixed(2)}</span></h3>

      <button onClick={() => alert("Purchase successful!")}>Confirm Purchase</button>
      <button className="back-btn" onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default ProductDetails;
