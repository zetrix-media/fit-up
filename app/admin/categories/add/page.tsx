'use client';

import React, { useState } from 'react';
import { supabase } from '@/utils/supabaseClient';

const AddCategoryPage = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCategoryImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!categoryName || !categoryImage) {
      setError('Please provide both category name and image.');
      setLoading(false);
      return;
    }

    try {
      // Specify the bucket and folder path
      const bucketName = 'products';
      const folderPath = `categories/${categoryImage.name}`;

      // Upload image to Supabase storage
      const { data: imageData, error: imageError } = await supabase.storage
        .from(bucketName)
        .upload(folderPath, categoryImage);

      if (imageError) {
        throw imageError;
      }

      // Construct the public URL of the uploaded image
      const publicUrl = `https://khmsupnfosoalakcabzn.supabase.co/storage/v1/object/public/${bucketName}/${folderPath}`;

      // Insert category data into Supabase
      const { data, error } = await supabase
        .from('categories')
        .insert([{ categoryname: categoryName, categoryimage: publicUrl }]);

      if (error) {
        throw error;
      }

      setSuccess('Category added successfully!');
      setCategoryName('');
      setCategoryImage(null);
    } catch (error) {
      setError('Error adding category. Please try again.');
      console.error('Error adding category:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Add Category</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="category-name" className="block text-sm font-medium">
            Category Name
          </label>
          <input
            type="text"
            id="category-name"
            name="category-name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="category-image" className="block text-sm font-medium">
            Category Image
          </label>
          <input
            type="file"
            id="category-image"
            name="category-image"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Category'}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
      </form>
    </div>
  );
};

export default AddCategoryPage;