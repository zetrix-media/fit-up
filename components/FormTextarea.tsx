"use client";

type FormTextareaProps = {
  label: string;
  id: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
};

export function FormTextarea({
  label,
  id,
  placeholder,
  value,
  onChange,
  required = false,
}: FormTextareaProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id={id}
        className="h-32 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-yellow-500 focus:outline-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}