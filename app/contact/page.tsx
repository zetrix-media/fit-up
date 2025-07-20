'use client'

import { Suspense, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

function ContactContent() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Form submitted!')
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-gradient-to-r from-[#0e0e6b] to-[#1f1f99] text-white flex items-center justify-center py-10">
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row shadow-xl rounded-lg overflow-hidden">
          {/* Left Section */}
          <div className="w-full md:w-1/2 p-10 flex flex-col justify-center bg-transparent">
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
                <a href="tel:+21123456586" className="hover:underline">Support: (+21) 123 456 586</a>
              </div>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="w-full md:w-1/2 bg-white text-black p-10 rounded-tl-2xl md:rounded-tl-2xl md:rounded-bl-2xl rounded-tr-2xl md:rounded-tr-2xl flex items-center">
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
                  <div className="flex">
                    <select className="border border-gray-300 rounded-l px-4 py-2 bg-white">
                      <option value="us">US</option>
                      <option value="uk">UK</option>
                      <option value="in">IN</option>
                    </select>
                    <input
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      value={form.phone}
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
