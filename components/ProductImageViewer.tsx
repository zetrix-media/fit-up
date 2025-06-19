// components/ProductImageViewer

'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { supabase } from "@/utils/supabaseClient";

interface VariantImage {
  imageid: number
  imageurl: string
  sortorder: number
}

interface ProductImageViewerProps {
  variantid: number
}

export default function ProductImageViewer({ variantid }: ProductImageViewerProps) {
  const [mainImage, setMainImage] = useState<string | null>(null)
  const [thumbnails, setThumbnails] = useState<VariantImage[]>([])

  useEffect(() => {
    const fetchImages = async () => {
      const { data: variant, error: variantErr } = await supabase
        .from('productvariants')
        .select('mainimageurl')
        .eq('variantid', variantid)
        .single()

      const { data: images, error: imageErr } = await supabase
        .from('variantimages')
        .select('*')
        .eq('variantid', variantid)
        .order('sortorder', { ascending: true })

      if (variantErr || imageErr) {
        console.error('Error loading images:', variantErr || imageErr)
        return
      }

      setMainImage(variant?.mainimageurl || images?.[0]?.imageurl || null)
      setThumbnails(images || [])
    }

    fetchImages()
  }, [variantid])

  if (!mainImage) return <div className="text-gray-500">Loading images...</div>

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="relative w-[350px] h-[450px]">
        <Image
          src={mainImage}
          alt="Main Product Image"
          fill
          className="object-cover rounded-md border border-gray-200"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto">
        {thumbnails.map((thumb) => (
          <div
            key={thumb.imageid}
            className={`relative w-[80px] h-[100px] cursor-pointer border rounded-md ${
              thumb.imageurl === mainImage ? 'border-black' : 'border-gray-300'
            }`}
            onClick={() => setMainImage(thumb.imageurl)}
          >
            <Image
              src={thumb.imageurl}
              alt={`Thumbnail ${thumb.imageid}`}
              fill
              className="object-cover rounded"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
