"use client";

type Color = {
  name: string;
  value: string;
};

type ColorPickerProps = {
  colors: Color[];
  selectedColors: string[];
  onChange: (colors: string[]) => void;
};

export function ColorPicker({ colors, selectedColors, onChange }: ColorPickerProps) {
  const toggleColor = (colorValue: string) => {
    const newColors = selectedColors.includes(colorValue)
      ? selectedColors.filter((c) => c !== colorValue)
      : [...selectedColors, colorValue];
    onChange(newColors);
  };

  return (
    <div className="mb-4">
      <label className="mb-2 block text-sm font-medium text-gray-700">
        Select Colors
      </label>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <button
            key={color.value}
            type="button"
            className={`h-8 w-8 rounded-full border-2 ${
              selectedColors.includes(color.value)
                ? "border-black"
                : "border-transparent"
            }`}
            style={{ backgroundColor: color.value }}
            onClick={() => toggleColor(color.value)}
          />
        ))}
      </div>
    </div>
  );
}