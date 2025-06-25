'use client'

import { useRef, useState } from 'react'
import ImageUploader from '@/components/ImageUploader'

export default function CreateProductPage() {
  const uploadFnRef = useRef<(() => Promise<{ mainImageUrl?: string; galleryUrls: string[] }>) | null>(null)
  const [loading, setLoading] = useState(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState<number | ''>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!uploadFnRef.current) {
      console.error('Upload function not ready')
      setLoading(false)
      return
    }

    const { mainImageUrl, galleryUrls } = await uploadFnRef.current()

    const formData = {
      title,
      description,
      price: Number(price),
      mainImageUrl,
      galleryUrls,
    }

    console.log('📦 Submitting product:', formData)

    // Uncomment when Supabase is configured
    // await supabase.from('products').insert([formData])

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-bold">Add New Product</h1>

      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
          rows={4}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Price</label>
        <input
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
          required
          min={0}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <ImageUploader
        onReady={({ getUploadFunction }) => {
          uploadFnRef.current = getUploadFunction
        }}
      />

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Add Product'}
      </button>
    </form>
  )
}
