"use client";

type Option = {
  value: string;
  label: string;
};

type FormSelectProps = {
  label: string;
  id: string;
  options: Option[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
};

export function FormSelect({
  label,
  id,
  options,
  value,
  onChange,
  required = false,
}: FormSelectProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={id}
        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-yellow-500 focus:outline-none"
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}