'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

interface ProductListItemProps {
  productId: number;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ productId }) => {
  const [product, setProduct] = useState<{
    name: string;
    category: string;
    price: number;
    stock: number;
    imageUrl: string;
    ordersLast30Days: number;
  } | null>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
  const fetchData = async () => {
    const { data: prod, error: prodError } = await supabase
      .from('products')
      .select(`
        name,
        baseprice,
        stock,
        categoryid,
        productid,
        categories ( categoryname )
      `)
      .eq('productid', productId)
      .single();

    if (prodError || !prod) {
      console.error('Product fetch error:', prodError);
      return;
    }

    const category = prod.categories?.categoryname || 'Uncategorized';

    const { data: variantData, error: variantError } = await supabase
      .from('productvariants')
      .select('mainimageurl, variantid')
      .eq('productid', productId)
      .order('variantid', { ascending: true })
      .limit(1);

    if (variantError || !variantData || variantData.length === 0) {
      console.error('Variant fetch error:', variantError);
      return;
    }

    const variant = variantData[0];

    const { data: orderDetailsData, error: orderDetailsError } = await supabase
      .from('orderdetails')
      .select(`
        orderid,
        quantity,
        price,
        orders (
          createdat
        )
      `)
      .eq('variantid', variant.variantid);

    if (orderDetailsError || !orderDetailsData) {
      console.error('Order fetch error:', orderDetailsError);
      return;
    }

    const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const filteredOrders = orderDetailsData.filter(
      (o) => new Date(o.orders?.createdat) >= cutoff
    );

    const totalSales = filteredOrders.reduce((sum, o) => sum + o.quantity, 0);

    setProduct({
      name: prod.name,
      category,
      price: Number(prod.baseprice) || 0,
      stock: prod.stock ?? 0,
      imageUrl: variant.mainimageurl || '/assets/product_placeholder.webp',
      ordersLast30Days: totalSales,
    });
  };

  fetchData();
}, [productId]);


  const handleEdit = () => router.push(`/edit-product/${productId}`);
  const handleRemove = async () => {
    await supabase.from('products').delete().eq('productid', productId);
    alert('Product removed');
  };

  if (!product) return null;

  return (
    <tr className="group hover:bg-gray-50 border-b transition text-sm">
      {/* Product name + image + category */}
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={40}
            height={40}
            className="rounded object-cover"
          />
          <div>
            <div className="font-medium text-gray-800">{product.name}</div>
            <div className="text-xs text-gray-500">{product.category}</div>
          </div>
        </div>
      </td>

      {/* Price */}
      <td className="px-4 py-3 whitespace-nowrap text-gray-700">
  AED {Number(product.price ?? 0).toFixed(2)}
</td>

      {/* Stock */}
      <td className="px-4 py-3 whitespace-nowrap text-gray-700">
        {product.stock} units
      </td>

      {/* Orders in last 30 days */}
      <td className="px-4 py-3 whitespace-nowrap text-gray-700">
        {product.ordersLast30Days} orders
      </td>

      {/* Menu */}
      <td className="px-4 py-3 pr-6 text-right relative">
        <button
          className="p-2 hover:bg-gray-100 rounded-full"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FontAwesomeIcon icon={faEllipsisVertical} className="text-gray-600" />
        </button>

        {menuOpen && (
          <div className="absolute right-4 top-10 w-36 bg-white border shadow-lg rounded z-50">
            <button
              onClick={() => {
                handleEdit();
                setMenuOpen(false);
              }}
              className="w-full px-4 py-2 text-sm hover:bg-gray-100 text-left"
            >
              <FontAwesomeIcon icon={faPen} className="mr-2" />
              Edit
            </button>
            <button
              onClick={() => {
                handleRemove();
                setMenuOpen(false);
              }}
              className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 text-left"
            >
              <FontAwesomeIcon icon={faTrash} className="mr-2" />
              Remove
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default ProductListItem;
