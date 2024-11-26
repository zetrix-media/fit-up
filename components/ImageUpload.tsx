import React from 'react';

interface ImageUploadProps {
  label: string;
  multiple?: boolean;
  onImageUpload: (image: File | File[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ label, multiple = false, onImageUpload }) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      if (multiple) {
        onImageUpload(files);
      } else {
        onImageUpload(files[0]);
      }
    }
  };

  return (
    <div>
      <label>{label}</label>
      <input type="file" multiple={multiple} onChange={handleImageChange} />
    </div>
  );
};

export default ImageUpload;
