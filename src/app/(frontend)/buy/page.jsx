"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Buy = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetcData = async () => {
      const resp = await axios.get("/api/show-product");

      if (resp.data.status == "200") {
        setProducts(resp.data.data);
      }
    };
    fetcData();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "/api/add-product",
      {
        title,
        price,
        description,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (res.data.status == "200") {
      setIsModalOpen(false);
    }
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white shadow-md rounded-lg p-4 w-full sm:w-64">
      <div className="h-40 bg-gray-100 rounded mb-4"></div>
      <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
      <p className="text-gray-700 mb-2">${product.price}</p>
      <Link
        href={`/sample?id=${product._id}`}
        className="text-blue-600 hover:underline"
      >
        Buy
      </Link>
    </div>
  );

  return (
    <div className="p-4">
      {/* Add Product Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded"
        >
          Add Product
        </button>
      </div>

      {/* Product Grid */}
      <div className="flex flex-wrap gap-4 justify-center">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>

            <input
              type="text"
              placeholder="Product Name"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring"
            />

            <input
              type="text"
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
              className="w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring"
            />

            <input
              type="text"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring"
            />

            <div className="flex justify-between">
              <button
                onClick={handleAddProduct}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Add
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Buy;
