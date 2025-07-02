// Components/SizeSelector.tsx
'use client';

import React from 'react';
import clsx from 'clsx';

type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL' | '3XL';

interface SizeSelectorProps {
  selectedSizes: Size[]; // Always an array (single or multiple)
  onSelect: (selected: Size[]) => void;
  availableSizes?: Size[]; // Optional: to disable some sizes
  multiple?: boolean; // Default: false
}

const allSizes: Size[] = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  selectedSizes,
  onSelect,
  availableSizes = allSizes,
  multiple = false,
}) => {
  const handleClick = (size: Size) => {
    if (!availableSizes.includes(size)) return;

    if (multiple) {
      const exists = selectedSizes.includes(size);
      const updated = exists
        ? selectedSizes.filter((s) => s !== size)
        : [...selectedSizes, size];
      onSelect(updated);
    } else {
      onSelect([size]);
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-gray-700">Size</p>
      <div className="flex flex-wrap gap-2">
        {allSizes.map((size) => {
          const isSelected = selectedSizes.includes(size);
          const isDisabled = !availableSizes.includes(size);

          return (
            <button
              type="button"
              key={size}
              disabled={isDisabled}
              onClick={() => handleClick(size)}
              className={clsx(
                'w-12 h-12 rounded-md border text-sm font-medium transition-colors',
                isSelected
                  ? 'bg-black text-white'
                  : 'bg-white text-black hover:border-black',
                isDisabled
                  ? 'opacity-40 cursor-not-allowed'
                  : 'cursor-pointer'
              )}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
};
