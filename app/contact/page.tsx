'use client'

import { useEffect, useState, Suspense } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'

interface RawCountry {
  name: {
    common: string
  }
  cca2: string
  idd: {
    root: string
    suffixes?: string[]
  }
}

interface Country {
  name: string
  code: string
  dialCode: string
}

function ContactContent() {
  const [countries, setCountries] = useState<Country[]>([])
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    country: '',
    countryCode: '',
    phoneNumber: '',
    address: '',
    message: ''
  })

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,idd')
        const data: RawCountry[] = await res.json()

        const parsed: Country[] = data
          .filter((c) => c.idd?.root && c.idd?.suffixes?.length)
          .map((c) => ({
            name: c.name.common,
            code: c.cca2,
            dialCode: `${c.idd.root}${c.idd.suffixes![0]}`
          }))
          .sort((a, b) => a.name.localeCompare(b.name))

        setCountries(parsed)

        const uae = parsed.find(c => c.code === 'AE') // UAE = AE
        if (uae) {
          setForm(f => ({
            ...f,
            country: uae.code,
            countryCode: uae.dialCode
          }))
        }
      } catch (error) {
        console.error('Failed to fetch countries:', error)
      }
    }

    fetchCountries()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleCountrySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = countries.find(c => c.code === e.target.value)
    if (selected) {
      setForm({
        ...form,
        country: selected.code,
        countryCode: selected.dialCode
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Phone: ${form.countryCode} ${form.phoneNumber}`)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-gradient-to-r from-[#0e0e6b] to-[#1f1f99] text-white flex items-center justify-center py-10">
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row shadow-xl rounded-lg overflow-hidden">
          {/* Left Section */}
          <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
            <h1 className="text-4xl font-semibold mb-4">Contact Us</h1>
            <p className="mb-6 max-w-md">
              Not sure what you need? The team at Fitup will be happy to listen to you and suggest ideas you hadn’t considered.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span>📧</span>
                <a href="mailto:info@fitup.com" className="hover:underline">info@fitup.com</a>
              </div>
              <div className="flex items-center space-x-2">
                <span>📞</span>
                <a href="tel:+971505000000" className="hover:underline">Support: (+971) 50 500 0000</a>
              </div>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="w-full md:w-1/2 bg-white text-black p-10 rounded-tl-2xl md:rounded-bl-2xl flex items-center">
            <div className="w-full">
              <h2 className="text-2xl font-semibold mb-1">We’d love to hear from you!</h2>
              <p className="mb-6">Let’s get in touch</p>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-4 py-2 w-full"
                    required
                  />
                  <input
                    name="company"
                    placeholder="Company"
                    value={form.company}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-4 py-2 w-full"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-4 py-2 w-full"
                    required
                  />

                  {/* Country code + flag */}
                  <div className="flex w-full relative">
                    <div className="border border-gray-300 rounded-l px-4 py-2 bg-white text-black w-28 flex items-center justify-center text-sm gap-2">
                      {form.country && (
                        <Image
                          src={`https://flagcdn.com/w40/${form.country.toLowerCase()}.png`}
                          alt="flag"
                          width={28}      // increase width for better aspect ratio
                          height={20}     // increase height to balance stretching
                          className="object-cover rounded"
                        />
                      )}
                      {form.countryCode}
                    </div>

                    {/* Hidden real <select> */}
                    <select
                      value={form.country}
                      onChange={handleCountrySelect}
                      className="absolute top-0 left-0 h-full w-28 opacity-0 z-10 cursor-pointer"
                    >
                      {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.name} ({country.dialCode})
                        </option>
                      ))}
                    </select>

                    <input
                      name="phoneNumber"
                      placeholder="Phone number"
                      value={form.phoneNumber}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-r px-4 py-2 w-full"
                      required
                    />
                  </div>
                </div>

                <input
                  name="address"
                  placeholder="Address"
                  value={form.address}
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-4 py-2 w-full"
                />

                <textarea
                  name="message"
                  rows={4}
                  placeholder="Type your message here"
                  value={form.message}
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-4 py-2 w-full"
                />

                <button
                  type="submit"
                  className="bg-[#4d3fd2] hover:bg-[#392fb0] text-white px-6 py-3 rounded transition-all"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function ContactPage() {
  return (
    <Suspense>
      <ContactContent />
    </Suspense>
  )
}
