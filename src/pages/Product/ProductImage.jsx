import { useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import styles from "./ProductImage.module.css";

function ProductImage({ src, alt, img }) {
  // State to track the currently selected large image (defaults to src)

  const [selectedImage, setSelectedImage] = useState(src);
  const [isMobile, setIsMobile] = useState(false);
  console.log(img);

  useEffect(() => {
    const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobile(mobile);
  }, []);

  // Handle clicking a thumbnail to update the large image
  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className={styles.productImage}>
      {/* Small Images (Thumbnails) */}
      {Array.isArray(img) && img.length > 0 && (
        <div className={styles.thumbnails}>
          {img.map((image, index) => (
            <img
              key={index}
              src={image.image}
              alt={`${alt} thumbnail ${index + 1}`}
              className={`${styles.thumbnail} ${
                image.image === selectedImage ? styles.selected : ""
              }`}
              onClick={() => handleThumbnailClick(image.image)}
            />
          ))}
        </div>
      )}

      {/* Large Image with Magnifier */}
      <div className={styles.largeImage}>
        {isMobile ? (
          <TransformWrapper
            initialScale={1}
            minScale={0.8}
            maxScale={3}
            wheel={{ disabled: true }}
            pinch={{ step: 0.1 }}
            doubleClick={{ step: 1 }}
            limitToBounds={true}
          >
            <TransformComponent>
              <img
                src={selectedImage}
                alt={alt}
                className={styles.mobileImage}
              />
            </TransformComponent>
          </TransformWrapper>
        ) : (
          <div className={styles.desktopZoomContainer}>
            <img
              src={selectedImage}
              alt={alt}
              className={styles.desktopImage}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImage;
