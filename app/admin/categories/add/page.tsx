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
      const bucketName = 'categories';
      const folderPath = `${categoryImage.name}`;

      // Upload the image to Supabase storage
      const { data: imageData, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(folderPath, categoryImage);

      if (uploadError) {
        console.error('Image upload error:', uploadError); // Log the upload error
        setError('Failed to upload image.');
        setLoading(false);
        return;
      }

      console.log('Uploaded image data:', imageData);

      // Get the public URL of the uploaded image
      const imageUrl = supabase.storage.from(bucketName).getPublicUrl(folderPath).data.publicUrl;

      // Insert the new category into the database
      const { error: insertError } = await supabase
        .from('categories')
        .insert([{ categoryname: categoryName, categoryimage: imageUrl }]);

      if (insertError) {
        console.error('Database insert error:', insertError); // Log the insert error
        setError('Failed to add category.');
        setLoading(false);
        return;
      }

      setSuccess('Category added successfully.');
      setCategoryName('');
      setCategoryImage(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Add Category</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
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
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category-image" className="block text-sm font-medium">
            Category Image
          </label>
          <input
            type="file"
            id="category-image"
            name="category-image"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Category'}
        </button>
      </form>
    </div>
  );
};

export default AddCategoryPage;