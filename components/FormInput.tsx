"use client";

type FormInputProps = {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

export function FormInput({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
}: FormInputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-yellow-500 focus:outline-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}