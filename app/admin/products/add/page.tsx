"use client";

import { useState } from "react";
import { FormInput } from "@/components/FormInput";
import { FormSelect } from "@/components/FormSelect";
import { FormTextarea } from "@/components/FormTextarea";
import { ColorPicker } from "@/components/ColorPicker";
import { ImageUpload } from "@/components/ImageUpload";

const SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
const COLORS = [
  { name: "Black", value: "#000000" },
  { name: "Blue", value: "#0000FF" },
  { name: "Green", value: "#00FF00" },
  { name: "Yellow", value: "#FFFF00" },
  { name: "Red", value: "#FF0000" },
  { name: "Pink", value: "#FFC0CB" },
];

const CATEGORIES = [
  { value: "clothing", label: "Clothing" },
  { value: "accessories", label: "Accessories" },
  { value: "footwear", label: "Footwear" },
];

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    category: "",
    productName: "",
    brandName: "",
    description: "",
    size: "",
    gender: "men",
    colors: [] as string[],
    regularPrice: "",
    discountPercentage: "",
    discountType: "",
    stock: "",
    seoUrl: "",
    seoTitle: "",
    seoKeywords: "",
    seoDescription: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <h1 className="mb-8 text-2xl font-bold">Add Products</h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Left Column */}
              <div>
                <FormSelect
                  label="Category"
                  id="category"
                  options={CATEGORIES}
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                />

                <FormInput
                  label="Product Name"
                  id="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  required
                />

                <FormInput
                  label="Brand Name"
                  id="brandName"
                  value={formData.brandName}
                  onChange={handleInputChange}
                  required
                />

                <FormTextarea
                  label="Product Description"
                  id="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />

                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Size
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SIZES.map((size) => (
                      <button
                        key={size}
                        type="button"
                        className={`h-10 w-12 rounded-md border ${
                          formData.size === size
                            ? "border-yellow-500 bg-yellow-50"
                            : "border-gray-300"
                        }`}
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, size }))
                        }
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <div className="flex gap-4">
                    {["men", "women", "unisex"].map((gender) => (
                      <label
                        key={gender}
                        className="flex items-center gap-2"
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={gender}
                          checked={formData.gender === gender}
                          onChange={handleInputChange}
                          className="text-yellow-500 focus:ring-yellow-500"
                        />
                        <span className="text-sm">{gender}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <ColorPicker
                  colors={COLORS}
                  selectedColors={formData.colors}
                  onChange={(colors) =>
                    setFormData((prev) => ({ ...prev, colors }))
                  }
                />
              </div>

              {/* Right Column */}
              <div>
                <ImageUpload />

                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    label="Regular Price"
                    id="regularPrice"
                    type="number"
                    value={formData.regularPrice}
                    onChange={handleInputChange}
                    required
                  />

                  <FormInput
                    label="Discount Percentage"
                    id="discountPercentage"
                    type="number"
                    value={formData.discountPercentage}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormSelect
                    label="Discount Type"
                    id="discountType"
                    options={[
                      { value: "percentage", label: "Percentage" },
                      { value: "fixed", label: "Fixed Amount" },
                    ]}
                    value={formData.discountType}
                    onChange={handleInputChange}
                  />

                  <FormInput
                    label="Stock"
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mt-6">
                  <h3 className="mb-4 text-lg font-semibold">SEO</h3>
                  <FormInput
                    label="SEO URL"
                    id="seoUrl"
                    value={formData.seoUrl}
                    onChange={handleInputChange}
                    required
                  />
                  <FormInput
                    label="SEO Title"
                    id="seoTitle"
                    value={formData.seoTitle}
                    onChange={handleInputChange}
                    required
                  />
                  <FormInput
                    label="SEO Keywords"
                    id="seoKeywords"
                    value={formData.seoKeywords}
                    onChange={handleInputChange}
                    required
                  />
                  <FormTextarea
                    label="SEO Description"
                    id="seoDescription"
                    value={formData.seoDescription}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-md bg-yellow-400 px-4 py-2 text-black hover:bg-yellow-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}