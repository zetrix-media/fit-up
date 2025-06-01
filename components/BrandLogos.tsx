// components/BrandLogos
'use client'

import Image from 'next/image'
import React from 'react'

const BrandLogos: React.FC = () => {
  return (
    <div className="w-full relative overflow-hidden rounded-lg shadow-md">
      <Image
        src="/assets/brand_logos.png"
        alt="Special Offer"
        layout="responsive"
        width={1200}
        height={400}
        className="object-cover"
        priority
      />
      {/* <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <h2 className="text-white text-3xl md:text-4xl font-bold text-center">
          Limited Time Offer!
        </h2>
      </div> */}
    </div>
  )
}

export default BrandLogos
