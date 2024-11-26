interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({ label, name, type = 'text', value, onChange }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
    </div>
  );
};

export default FormInput;
