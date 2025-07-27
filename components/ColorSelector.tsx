'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import { HexColorPicker } from 'react-colorful';

type ColorOption = {
  name: string;
  hex: string;
};

interface ColorSelectorProps {
  selectedColors: ColorOption[];
  onSelect: (selected: ColorOption[]) => void;
  availableColors?: ColorOption[];
  multiple?: boolean;
  allowAddColor?: boolean;
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
  { name: 'White', hex: '#ffffff' },
];

export const ColorSelector: React.FC<ColorSelectorProps> = ({
  selectedColors,
  onSelect,
  availableColors = defaultColors,
  multiple = false,
  allowAddColor = false,
}) => {
  const [customColors, setCustomColors] = useState<ColorOption[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#1f2937');

  const handleClick = (color: ColorOption) => {
    const isAvailable =
      availableColors.some((c) => c.hex === color.hex) ||
      customColors.some((c) => c.hex === color.hex);

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
    !availableColors.some((c) => c.hex === color.hex) &&
    !customColors.some((c) => c.hex === color.hex);

  const handleAddColorConfirm = () => {
    if (!newColorName.trim()) {
      alert('Please enter a color name');
      return;
    }

    const hex = newColorHex.trim().startsWith('#')
      ? newColorHex.trim()
      : `#${newColorHex.trim()}`;

    if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      alert('Please enter a valid 6-digit HEX color (e.g., #123ABC)');
      return;
    }

    const newColor: ColorOption = {
      name: newColorName.trim(),
      hex: hex.toLowerCase(),
    };

    setCustomColors((prev) => [...prev, newColor]);
    onSelect([...selectedColors, newColor]);

    setNewColorName('');
    setNewColorHex('#1f2937');
    setIsModalOpen(false);
  };

  const colorsToShow = [
    ...availableColors,
    ...customColors.filter(
      (custom) =>
        !availableColors.some((c) => c.hex.toLowerCase() === custom.hex.toLowerCase())
    ),
  ].filter(
    (color, idx, arr) =>
      arr.findIndex(
        (c) =>
          c.hex.toLowerCase() === color.hex.toLowerCase() &&
          c.name.toLowerCase() === color.name.toLowerCase()
      ) === idx
  );

  return (
    <div className="space-y-2 relative">
      <div className="flex gap-2 flex-wrap items-center">
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

        {allowAddColor && (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-[1.375rem] h-[1.375rem] rounded-full border-2 border-dashed border-gray-400 text-gray-500 hover:text-black hover:border-black flex items-center justify-center text-lg"
            title="Add custom color"
          >
            +
          </button>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded shadow-lg p-6 w-[320px] space-y-4">
            <h3 className="text-sm font-semibold text-gray-800">Add New Color</h3>

            <div className="space-y-2">
              <label className="block text-sm">
                Name
                <input
                  type="text"
                  className="mt-1 w-full border rounded px-2 py-1 text-sm"
                  placeholder="e.g. Sky Blue"
                  value={newColorName}
                  onChange={(e) => setNewColorName(e.target.value)}
                />
              </label>

              <label className="block text-sm">
                Pick Color
                <div className="mt-2">
                  <HexColorPicker color={newColorHex} onChange={setNewColorHex} />
                </div>
              </label>

              <label className="block text-sm mt-2">
                HEX Value
                <input
                  type="text"
                  className="mt-1 w-full border rounded px-2 py-1 text-sm font-mono"
                  value={newColorHex}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^#?[0-9A-Fa-f]{0,6}$/.test(val)) {
                      setNewColorHex(val.startsWith('#') ? val : `#${val}`);
                    }
                  }}
                />
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-sm text-gray-600 hover:underline"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddColorConfirm}
                className="text-sm bg-black text-white px-3 py-1 rounded"
              >
                Add Color
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
