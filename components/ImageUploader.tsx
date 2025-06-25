// Components/ImageUploader
'use client'

import { useCallback, useEffect, useState} from 'react'
import { useDropzone } from 'react-dropzone'
import { supabase } from '@/utils/supabaseClient'
import { v4 as uuidv4 } from 'uuid'
import clsx from 'clsx'
import Image from 'next/image'

export type UploadedImage = {
  file: File
  previewUrl: string
  uploadedUrl?: string
  isMain?: boolean
}

interface Props {
  onReady?: (api: {
    getUploadFunction: () => Promise<{
      mainImageUrl?: string
      galleryUrls: string[]
    }>
  }) => void
}

export default function ImageUploader({ onReady }: Props) {
  const [images, setImages] = useState<UploadedImage[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles
      .filter(file => file.type.startsWith('image/'))
      .map(file => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }))

    setImages(prev => [...prev, ...newImages])
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    onDrop,
    multiple: true,
  })

  const markAsMain = (index: number) => {
    setImages(prev =>
      prev.map((img, i) => ({
        ...img,
        isMain: i === index,
      }))
    )
  }

  const removeImage = (index: number) => {
    const removed = images[index].previewUrl
    URL.revokeObjectURL(removed)
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const uploadImages = useCallback(async () => {
    const uploaded: UploadedImage[] = []

    for (const image of images) {
      const ext = image.file.name.split('.').pop()
      const filePath = `products/${uuidv4()}.${ext}`

      const { error } = await supabase.storage
        .from('product-images')
        .upload(filePath, image.file)

      if (error) {
        console.error('❌ Upload error:', error)
        continue
      }

      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath)

      uploaded.push({
        ...image,
        uploadedUrl: data.publicUrl,
      })
    }

    const mainImage = uploaded.find(img => img.isMain)
    const gallery = uploaded.filter(img => !img.isMain)

    return {
      mainImageUrl: mainImage?.uploadedUrl,
      galleryUrls: gallery.map(img => img.uploadedUrl!).filter(Boolean),
    }
  }, [images])

  useEffect(() => {
    onReady?.({ getUploadFunction: uploadImages })

    return () => {
      images.forEach(img => URL.revokeObjectURL(img.previewUrl))
    }
  }, [images, onReady, uploadImages])

  return (
    <div className="p-4 border rounded w-full">
      <label className="block text-sm font-medium mb-2">Upload Images</label>

      <div
        {...getRootProps()}
        className="w-full h-48 border-2 border-dashed rounded flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition text-sm text-gray-500"
      >
        <input {...getInputProps()} />
        Click or drag images here
      </div>

      {images.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-4">
          {images.map((img, idx) => (
            <div
              key={img.previewUrl}
              className={clsx(
                'relative border rounded overflow-hidden',
                'w-[96px] h-[96px]',
                img.isMain ? 'ring-2 ring-blue-600' : ''
              )}
            >
              <Image
                src={img.previewUrl}
                alt={`Preview ${idx}`}
                fill
                unoptimized
                className="object-cover"
              />

              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-bl hover:bg-red-600"
              >
                ×
              </button>

              <button
                type="button"
                onClick={() => markAsMain(idx)}
                className="absolute bottom-0 w-full bg-black bg-opacity-60 text-white text-xs py-0.5 text-center"
              >
                {img.isMain ? 'Main Image' : 'Set as Main'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
