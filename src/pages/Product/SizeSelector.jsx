import Sizes from "./Sizes";

function SizeSelector({ sizes, selectedSize, handleSizeChange }) {
  if (!sizes) return null;

  return (
    <div>
      <p>Sizes:</p>
      <ul>
        {sizes.map((size) => (
          <Sizes
            size={size}
            key={size.id}
            selectedSize={selectedSize}
            handleSizeChange={handleSizeChange}
          />
        ))}
      </ul>
    </div>
  );
}

export default SizeSelector;
