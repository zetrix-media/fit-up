"use client";

import React, { useState } from "react";

const AddProductPage = () => {
  const [formData, setFormData] = useState({
    productId: "new", // "new" indicates creating a new product
    categoryId: "",
    name: "",
    brand: "",
    description: "",
    sizes: [] as string[],
    gender: "Men",
    regularPrice: "",
    discountPercentage: "",
    discountType: "fixed",
    stock: "",
    seoUrl: "",
    seoTitle: "",
    seoKeywords: "",
    seoDescription: "",
    mainImage: null as File | null,
    variantImages: [] as File[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSizeToggle = (size: string) => {
    setFormData((prevData) => {
      const sizes = [...prevData.sizes];
      if (sizes.includes(size)) {
        return { ...prevData, sizes: sizes.filter((s) => s !== size) };
      } else {
        sizes.push(size);
        return { ...prevData, sizes };
      }
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isMainImage: boolean = false) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      if (isMainImage) {
        setFormData({ ...formData, mainImage: files[0] });
      } else {
        setFormData({ ...formData, variantImages: [...formData.variantImages, ...Array.from(files)] });
      }
    }
  };

  const handleSubmit = () => {
    // Simulate submission
    console.log(formData);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add Products</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Form */}
          <div>
            {/* Select Product */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Select Product</label>
              <select
                name="productId"
                value={formData.productId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="new">New Product</option>
                {/* Dynamically load options here */}
                <option value="1">Existing Product 1</option>
                <option value="2">Existing Product 2</option>
              </select>
            </div>

            {/* Category */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Select Category</option>
                {/* Dynamically load options here */}
                <option value="1">Category 1</option>
                <option value="2">Category 2</option>
              </select>
            </div>

            {/* Product Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            {/* Brand Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Brand Name</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            {/* Product Description */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Product Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            {/* Units */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Units</label>
              <div className="flex items-center space-x-2">
                {["XS", "S", "M", "L", "XL", "2XL", "3XL"].map((size) => (
                  <button
                    type="button"
                    key={size}
                    onClick={() => handleSizeToggle(size)}
                    className={`px-3 py-1 rounded-md border ${
                      formData.sizes.includes(size) ? "bg-black text-white" : "bg-gray-100"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Gender</label>
              <div className="flex items-center space-x-4">
                {["Men", "Women", "Unisex"].map((gender) => (
                  <label key={gender} className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={formData.gender === gender}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    {gender}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div>
            {/* Upload Images */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Upload Images</label>
              <div className="flex flex-col space-y-2">
                {/* Main Image */}
                <input
                  type="file"
                  onChange={(e) => handleImageUpload(e, true)}
                  className="border border-gray-300 rounded-md p-2"
                  accept="image/*"
                />
                {/* Variant Images */}
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleImageUpload(e, false)}
                  className="border border-gray-300 rounded-md p-2"
                  accept="image/*"
                />
              </div>
            </div>

            {/* Pricing and Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Regular Price</label>
                <input
                  type="text"
                  name="regularPrice"
                  value={formData.regularPrice}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Discount Percentage</label>
                <input
                  type="text"
                  name="discountPercentage"
                  value={formData.discountPercentage}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Discount Type</label>
                <select
                  name="discountType"
                  value={formData.discountType}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="fixed">Fixed</option>
                  <option value="percentage">Percentage</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Stock</label>
                <input
                  type="text"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SEO Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">SEO</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="seoUrl"
              placeholder="SEO URL"
              value={formData.seoUrl}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            <input
              type="text"
              name="seoTitle"
              placeholder="SEO Title"
              value={formData.seoTitle}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            <input
              type="text"
              name="seoKeywords"
              placeholder="SEO Keywords"
              value={formData.seoKeywords}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            <textarea
              name="seoDescription"
              placeholder="SEO Description"
              value={formData.seoDescription}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
