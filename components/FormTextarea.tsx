import React from 'react';

interface FormTextareaProps {
  label: string;
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}

const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  name,
  placeholder = '',
  value = '',
  onChange,
  rows = 4,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FormTextarea;
