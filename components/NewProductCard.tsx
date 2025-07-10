"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/utils/supabaseClient"; // Ensure this path is correct
// import { ColorSelector } from "./ColorSelector"; // REMOVED: No longer directly used for rendering swatches

// Import the CSS Module
import styles from './NewProductCard.module.css';

interface ProductVariant {
  id: string;
  imageUrl: string;
  color: {
    name: string;
    hex: string;
  };
}

interface ProductInfo {
  name: string;
  price: number;
}

interface NewProductCardProps {
  productId: string;
}

const NewProductCard: React.FC<NewProductCardProps> = ({ productId }) => {
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [product, setProduct] = useState<ProductInfo | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProductAndVariants = async () => {
      const { data: productData, error: productError } = await supabase
        .from("products")
        .select("name, baseprice")
        .eq("productid", productId)
        .single();

      if (productError) {
        console.error("Error fetching product:", productError);
        return;
      }

      setProduct({
        name: productData.name,
        price: Number(productData.baseprice),
      });

      const { data: variantsData, error: variantError } = await supabase
        .from("productvariants")
        .select("variantid, mainimageurl, colorName, colorCode")
        .eq("productid", productId)
        .order("variantid");

      if (variantError) {
        console.error("Error fetching variants:", variantError);
        return;
      }

      const formattedVariants: ProductVariant[] = variantsData.map((variant) => ({
        id: variant.variantid.toString(),
        imageUrl: variant.mainimageurl || "/assets/product_placeholder.webp", // changed here
        color: {
          name: variant.colorName || "Unknown",
          hex: variant.colorCode || "#999999",
        },
      }));

      setVariants(formattedVariants);
      if (formattedVariants.length > 0) {
        setSelectedVariant(formattedVariants[0]);
        setImageSrc(formattedVariants[0].imageUrl);
      }
    };

    if (productId) {
      fetchProductAndVariants();
    }
  }, [productId]);

  const handleColorSelect = (colorHex: string) => { // Modified: Takes only the hex directly for simplicity of manual swatches
    const matchedVariant = variants.find((v) => v.color.hex === colorHex);
    if (matchedVariant) {
      setSelectedVariant(matchedVariant);
      setImageSrc(matchedVariant.imageUrl);
    }
  };

  const handleClick = () => {
    if (selectedVariant) {
      router.push(`/product-details/${selectedVariant.id}`);
    }
  };

  if (!product || !selectedVariant || !imageSrc) return null;

  // REMOVED: 'availableColorHexes' as it's no longer used after removing ColorSelector from rendering.
  // const availableColorHexes = variants.map(v => v.color.hex);

  return (
    <div className={styles.productCard} onClick={handleClick}>
      <div className={styles.imageContainer}>
        <Image
          src={imageSrc}
          alt={product.name}
          width={400}
          height={350}
          layout="fixed"
          objectFit="cover"
          className={styles.productImage}
          onError={() => setImageSrc("/assets/product_placeholder.webp")} // changed here
        />
      </div>

      <div className={styles.infoSection} onClick={(e) => e.stopPropagation()}>
        <div className={styles.colorSwatches}>
          {variants.map((variant) => (
            <div
              key={variant.id}
              className={`${styles.colorSwatch} ${selectedVariant.id === variant.id ? styles.selectedSwatch : ''}`}
              style={{ backgroundColor: variant.color.hex }}
              // Changed handler to directly pass hex string, aligning with manual swatch clicks
              onClick={() => handleColorSelect(variant.color.hex)}
            ></div>
          ))}
        </div>
        <h3 className={styles.productTitle}>{product.name}</h3>
        <p className={styles.productPrice}>ADE {product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default NewProductCard;