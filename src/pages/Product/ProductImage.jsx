// import { GlassMagnifier } from "react-image-magnifiers";

// function ProductImage({ src, alt, enableMagnifier, img }) {
//   console.log(img);
//   return (
//     <div className="product-image">
//       {enableMagnifier ? (
//         <GlassMagnifier
//           imageSrc={src}
//           imageAlt={alt}
//           largeImageSrc={src}
//           magnifierSize="30%"
//           magnifierBorderSize={2}
//           magnifierBackgroundColor="rgba(0,0,0, 0.5)"
//         />
//       ) : (
//         <img src={src} alt={alt} />
//       )}
//     </div>
//   );
// }

// export default ProductImage;

import { GlassMagnifier } from "react-image-magnifiers";
import { useState } from "react";

function ProductImage({ src, alt, enableMagnifier, img }) {
  // State to track the currently selected large image (defaults to src)

  const [selectedImage, setSelectedImage] = useState(src);
  console.log(img);

  // Handle clicking a thumbnail to update the large image
  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="product-image">
      {/* Large Image with Magnifier */}
      <div className="large-image">
        {enableMagnifier ? (
          <GlassMagnifier
            imageSrc={selectedImage} // Use selected image as base
            imageAlt={alt}
            largeImageSrc={selectedImage} // Use selected image for zoom
            magnifierSize="30%"
            magnifierBorderSize={2}
            magnifierBackgroundColor="rgba(0,0,0, 0.5)"
          />
        ) : (
          <img src={selectedImage} alt={alt} />
        )}
      </div>

      {/* Small Images (Thumbnails) */}
      {Array.isArray(img) && img.length > 0 && (
        <div className="thumbnails">
          {img.map((image, index) => (
            <img
              key={index}
              src={image.image}
              alt={`${alt} thumbnail ${index + 1}`}
              className={`thumbnail ${
                image === selectedImage ? "selected" : ""
              }`}
              onClick={() => handleThumbnailClick(image.image)}
              style={{
                cursor: "pointer",
                width: "60px",
                height: "60px",
                margin: "5px",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductImage;
