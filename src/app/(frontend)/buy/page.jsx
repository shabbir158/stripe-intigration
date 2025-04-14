import Link from "next/link";
import React from "react";

const Buy = () => {
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 29000,
      image: "",
    },
    {
      id: 2,
      name: "Product 2",
      price: 49000,
      image: "",
    },
    {
      id: 3,
      name: "Product 3",

      price: 19000,
      image: "",
    },
  ];

  const ProductCard = ({ product }) => {
    return (
      <div style={styles.card}>
        <img src={product.image} alt={product.name} style={styles.image} />
        <h3 style={styles.name}>{product.name}</h3>
        <p style={styles.price}>${product.price}</p>
        <Link href={`/sample?amount=${product.price}`}>Buy</Link>
      </div>
    );
  };

  const styles = {
    card: {
      border: "1px solid #ddd",
      borderRadius: "8px",
      width: "200px",
      padding: "10px",
      textAlign: "center",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      margin: "10px",
    },
    image: {
      width: "100%",
      height: "150px",
      objectFit: "cover",
      borderRadius: "8px",
    },
    name: {
      fontSize: "18px",
      fontWeight: "bold",
      margin: "10px 0",
    },
    price: {
      fontSize: "16px",
      color: "white",
    },
    container: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      padding: "20px",
    },
  };

  return (
    <div style={styles.container}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Buy;
