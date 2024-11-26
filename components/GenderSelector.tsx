const genders = ['Men', 'Women', 'Unisex'];

const GenderSelector = () => {
  return (
    <div className="flex flex-col">
      <span className="font-semibold text-gray-700 mb-2">Gender</span>
      <div className="flex gap-4">
        {genders.map((gender) => (
          <label key={gender} className="flex items-center space-x-2">
            <input type="radio" name="gender" value={gender} className="form-radio" />
            <span>{gender}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default GenderSelector;
