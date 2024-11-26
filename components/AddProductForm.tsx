'use client';

import React from 'react';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import FormTextarea from './FormTextarea';
import SizeSelector from './SizeSelector';
import GenderSelector from './GenderSelector';
import ColorSelector from './ColorSelector';
import ImageUpload from './ImageUpload';
import PricingStock from './PricingStock';
import SEOFields from './SEOFields';

const AddProductForm = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Collect form data and submit
    console.log('Form submitted');
  };

  return (
    <form className="max-w-4xl mx-auto p-6 space-y-8" onSubmit={handleSubmit}>
      {/* Category & Product Name */}
      <div className="grid grid-cols-2 gap-4">
        <FormSelect label="Category" name="category" options={[]} />
        <FormInput label="Product Name" name="productName" />
      </div>

      {/* Brand & Description */}
      <div className="grid grid-cols-2 gap-4">
        <FormInput label="Brand Name" name="brand" />
        <FormTextarea label="Product Description" name="description" />
      </div>

      {/* Units: Sizes, Gender, Colors */}
      <div className="grid grid-cols-3 gap-4">
        <SizeSelector />
        <GenderSelector />
        <ColorSelector />
      </div>

      {/* Upload Images */}
      <ImageUpload label="Product Images" onImageUpload={(images) => console.log(images)} />

      {/* Pricing & Stock */}
      <PricingStock />

      {/* SEO Fields */}
      <SEOFields />

      <button
        type="submit"
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default AddProductForm;
