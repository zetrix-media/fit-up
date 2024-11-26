interface FormSelectProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FormSelect: React.FC<FormSelectProps> = ({ label, name, options, value, onChange }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
