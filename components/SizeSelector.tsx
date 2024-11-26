const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];

const SizeSelector = () => {
  return (
    <div className="flex flex-col">
      <span className="font-semibold text-gray-700 mb-2">Sizes</span>
      <div className="flex gap-4">
        {sizes.map((size) => (
          <label key={size} className="flex items-center space-x-2">
            <input type="checkbox" value={size} className="form-checkbox" />
            <span>{size}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
