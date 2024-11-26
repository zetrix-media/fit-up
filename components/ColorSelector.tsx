const colors = ['#000', '#FFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

const ColorSelector = () => {
  return (
    <div className="flex flex-col">
      <span className="font-semibold text-gray-700 mb-2">Select Colors</span>
      <div className="flex gap-2">
        {colors.map((color) => (
          <label key={color} className="w-8 h-8 rounded-full border border-gray-300" style={{ background: color }} />
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
