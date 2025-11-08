function Sizes({ size, selectedSize, handleSizeChange }) {
  return (
    <li
      role="listitem"
      className={selectedSize === size.size.name ? "selected" : ""}
      onClick={() => handleSizeChange(size.size.name)}
    >
      {size.size.name}
    </li>
  );
}

export default Sizes;
