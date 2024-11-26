"use client";

import { useState } from "react";

const AddProductForm = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setSelectedImages((prev) => [...prev, ...files]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission
    console.log("Form submitted");
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Column */}
      <div className="space-y-4">
        {/* Select Product */}
        <div>
          <label htmlFor="select-product" className="block text-sm font-medium">
            Select Product
          </label>
          <select
            id="select-product"
            name="select-product"
            className="w-full p-2 border rounded"
          >
            <option value="">Select Product</option>
            <option value="1">Product 1</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium">
            Category
          </label>
          <select
            id="category"
            name="category"
            className="w-full p-2 border rounded"
          >
            <option value="">Select Category</option>
            <option value="1">Category 1</option>
          </select>
        </div>

        {/* Product Name */}
        <div>
          <label htmlFor="product-name" className="block text-sm font-medium">
            Product Name
          </label>
          <input
            type="text"
            id="product-name"
            name="product-name"
            className="w-full p-2 border rounded"
            placeholder="Product Name"
          />
        </div>

        {/* Brand Name */}
        <div>
          <label htmlFor="brand-name" className="block text-sm font-medium">
            Brand Name
          </label>
          <input
            type="text"
            id="brand-name"
            name="brand-name"
            className="w-full p-2 border rounded"
            placeholder="Brand Name"
          />
        </div>

        {/* Product Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Product Description
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full p-2 border rounded"
            rows={3}
            placeholder="Enter product description..."
          ></textarea>
        </div>

        {/* Units */}
        <div>
          <label className="block text-sm font-medium">Units</label>
          <div className="flex items-center space-x-2">
            {["XS", "S", "M", "L", "XL", "2XL", "3XL"].map((size) => (
              <button
                type="button"
                key={size}
                className="px-3 py-1 border rounded hover:bg-gray-200"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium">Gender</label>
          <div className="flex items-center space-x-4">
            {["Men", "Women", "Unisex"].map((gender) => (
              <label key={gender} className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value={gender.toLowerCase()}
                  className="mr-2"
                />
                {gender}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-4">
        {/* Upload Images */}
        <div>
          <label className="block text-sm font-medium">Upload Images</label>
          <div className="border p-4 rounded flex flex-wrap space-x-2">
            <label
              htmlFor="upload-images"
              className="border w-24 h-24 flex items-center justify-center rounded cursor-pointer hover:bg-gray-200"
            >
              +
            </label>
            <input
              type="file"
              id="upload-images"
              name="upload-images"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageUpload}
            />
            {selectedImages.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`preview-${index}`}
                className="w-24 h-24 object-cover rounded"
              />
            ))}
          </div>
        </div>

        {/* Pricing Stock */}
        <div className="grid grid-cols-2 gap-4 p-4 border rounded">
          <div>
            <label htmlFor="regular-price" className="block text-sm font-medium">
              Regular Price
            </label>
            <input
              type="number"
              id="regular-price"
              name="regular-price"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label
              htmlFor="discount-percentage"
              className="block text-sm font-medium"
            >
              Discount Percentage
            </label>
            <input
              type="number"
              id="discount-percentage"
              name="discount-percentage"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="discount-type" className="block text-sm font-medium">
              Discount Type
            </label>
            <select
              id="discount-type"
              name="discount-type"
              className="w-full p-2 border rounded"
            >
              <option value="">Select Discount Type</option>
              <option value="flat">Flat</option>
              <option value="percentage">Percentage</option>
            </select>
          </div>
          <div>
            <label htmlFor="stock" className="block text-sm font-medium">
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* SEO */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="SEO URL"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="SEO Title"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="SEO Keywords"
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="SEO Description"
            className="w-full p-2 border rounded col-span-2"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="col-span-2">
        <button
          type="submit"
          className="px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;
