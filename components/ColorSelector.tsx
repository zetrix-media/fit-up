// Components/ColorSelector.tsx
'use client';

import React from 'react';
import clsx from 'clsx';

type ColorOption = {
  name: string;
  hex: string;
};

interface ColorSelectorProps {
  selectedColors: ColorOption[]; // Array of objects with { hex, name }
  onSelect: (selected: ColorOption[]) => void;
  availableColors?: ColorOption[]; // Optional: to disable some
  multiple?: boolean; // Default: false
}

const defaultColors: ColorOption[] = [
  { name: 'Dark', hex: '#1f2937' },
  { name: 'Purple', hex: '#8b5cf6' },
  { name: 'Blue', hex: '#3b82f6' },
  { name: 'Cyan', hex: '#06b6d4' },
  { name: 'Green', hex: '#22c55e' },
  { name: 'Yellow', hex: '#facc15' },
  { name: 'Orange', hex: '#f97316' },
  { name: 'Pink', hex: '#ec4899' },
  { name: 'White', hex: '#ffffff'},
];

export const ColorSelector: React.FC<ColorSelectorProps> = ({
  selectedColors,
  onSelect,
  availableColors = defaultColors,
  multiple = false,
}) => {
  const handleClick = (color: ColorOption) => {
    const isAvailable = availableColors.some((c) => c.hex === color.hex);
    if (!isAvailable) return;

    const exists = selectedColors.find((c) => c.hex === color.hex);

    if (multiple) {
      const updated = exists
        ? selectedColors.filter((c) => c.hex !== color.hex)
        : [...selectedColors, color];
      onSelect(updated);
    } else {
      onSelect([color]);
    }
  };

  const isSelected = (color: ColorOption) =>
    selectedColors.some((c) => c.hex === color.hex);

  const isDisabled = (color: ColorOption) =>
    !availableColors.some((c) => c.hex === color.hex);

  // Use availableColors if provided, otherwise defaultColors
  // Remove duplicates by hex and name
  const colorsToShow = (availableColors && availableColors.length > 0 ? availableColors : defaultColors)
    .filter(
      (color, idx, arr) =>
        arr.findIndex(
          (c) => c.hex.toLowerCase() === color.hex.toLowerCase() && c.name.toLowerCase() === color.name.toLowerCase()
        ) === idx
    );

  return (
    <div className="space-y-2">
      {/* <p className="text-sm font-medium text-gray-700">Color</p> */}
      <div className="flex gap-2">
        {colorsToShow.map((color) => (
          <button
            type="button"
            key={color.hex}
            onClick={() => handleClick(color)}
            disabled={isDisabled(color)}
            className={clsx(
              'w-[1.375rem] h-[1.375rem] rounded-full border-2 transition-all duration-200 flex items-center justify-center',
              isSelected(color)
                ? 'ring-1 ring-offset-1 ring-gray-900'
                : 'hover:scale-105',
              isDisabled(color) && 'opacity-40 cursor-not-allowed'
            )}
            style={{ backgroundColor: color.hex }}
            title={color.name}
          >
            {isSelected(color) && (
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
