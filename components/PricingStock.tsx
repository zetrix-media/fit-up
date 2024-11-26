import React from 'react';

interface FormInputProps {
  label: string;
  name: string;
  type: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({ label, name, type, value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="form-control"
      />
    </div>
  );
};

interface FormSelectProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FormSelect: React.FC<FormSelectProps> = ({ label, name, options, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} onChange={onChange} className="form-control">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const PricingStock = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormInput label="Regular Price" name="regularPrice" type="number" />
      <FormInput label="Discount Percentage" name="discountPercentage" type="number" />
      <FormSelect
        label="Discount Type"
        name="discountType"
        options={[
          { value: 'flat', label: 'Flat' },
          { value: 'percentage', label: 'Percentage' },
        ]}
      />
      <FormInput label="Stock" name="stock" type="number" />
    </div>
  );
};

export default PricingStock;