import Image from 'next/image';
import styles from './ProductCard.module.css'; // Import CSS Module

// Define types for the component's props
interface ProductCardProps {
  imageUrl: string;
  productTitle: string;
  price: string; // Keeping price as string as it's displayed with a dollar sign
  colors: string[]; // Array of color hex codes or names
}

const ProductCard: React.FC<ProductCardProps> = ({ imageUrl, productTitle, price, colors }) => {
  return (
    <div className={styles.productCard}>
      <div className={styles.imageContainer}>
        {/*
          When using next/image with TypeScript, it's good practice to provide
          width and height, especially with layout="responsive" or layout="fill".
          If the image dimensions are dynamic or unknown at build time,
          you might need to set 'layout="fill"' and wrap it in a parent
          with defined dimensions, or use 'unoptimized' prop if optimization
          is not critical and you just need to display.
          For exact replication of the design, a fixed aspect ratio or known
          dimensions from the image are helpful.
          Here, I'm using placeholder width/height that give a reasonable aspect ratio
          similar to the image provided. Adjust these based on your actual image and design needs.
        */}
        <Image
          src={imageUrl}
          alt={productTitle}
          width={400} // Example width, adjust as per your image's intrinsic size or desired display size
          height={600} // Example height, adjust as per your image's intrinsic size or desired display size
          layout="responsive" // Makes the image responsive within its container
          objectFit="cover" // Ensures the image covers the area, cropping if necessary
        />
      </div>

      <div className={styles.colorSwatches}>
        {colors.map((color, index) => (
          <div
            key={index}
            className={styles.colorSwatch}
            style={{ backgroundColor: color }}
            // You might want to add onClick handlers here for actual color selection in a real app
          ></div>
        ))}
      </div>

      <h3 className={styles.productTitle}>{productTitle}</h3>
      <p className={styles.productPrice}>${price}</p>
    </div>
  );
};

export default ProductCard;