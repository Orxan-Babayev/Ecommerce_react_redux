function Sizes({ size, selectedSize, handleSizeChange }) {
  return (
    <li
      role="listitem"
      className={selectedSize === size.name ? "selected" : ""}
      onClick={() => handleSizeChange(size.name)}
    >
      {size.name}
    </li>
  );
}

export default Sizes;
