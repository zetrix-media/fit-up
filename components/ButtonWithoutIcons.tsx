"use client";

import React from 'react';

interface ButtonWithoutIconsProps {
  text: string;
  url: string;
}

const ButtonWithoutIcons: React.FC<ButtonWithoutIconsProps> = ({ text, url }) => {
  return (
    <button
      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
      onClick={() => window.location.href = url}
    >
      {text}
    </button>
  );
};

export default ButtonWithoutIcons;