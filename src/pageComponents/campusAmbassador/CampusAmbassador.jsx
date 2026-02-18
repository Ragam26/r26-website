'use client'

import { useState } from 'react'
import Image from 'next/image'

function Vignette({ radialGradientString, extra }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${extra}`}
      style={{ background: radialGradientString }}
    />
  )
}

function FormField({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className='block text-white text-xs sm:text-sm mb-1 sm:mb-2'
      >
        {label} {required && <span className='text-red-500'>*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className='w-full bg-black/70 border border-gray-600 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors'
      />
    </div>
  )
}

function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    collegeName: '',
    district: '',
    year: '',
  })

  const [showContactNumber, setShowContactNumber] = useState(false)
  const [showContactEmail, setShowContactEmail] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const leftFields = [
    {
      label: 'College Name',
      id: 'collegeNameLeft',
      name: 'collegeName',
      placeholder: 'Your college name',
      required: true,
    },
    {
      label: 'Year',
      id: 'yearLeft',
      name: 'year',
      placeholder: 'Your year (e.g., 2nd, 3rd)',
      required: true,
    },
  ]

  const rightFields = [
    {
      label: 'First Name',
      id: 'firstName',
      name: 'firstName',
      placeholder: 'Your First name',
      required: true,
    },
    {
      label: 'Last Name',
      id: 'lastName',
      name: 'lastName',
      placeholder: 'Your Last name',
      required: true,
    },
    {
      label: 'Phone Number',
      id: 'phoneNumber',
      name: 'phoneNumber',
      type: 'tel',
      placeholder: 'Your phone number',
      required: true,
    },
    {
      label: 'District',
      id: 'district',
      name: 'district',
      placeholder: 'Your District',
      required: true,
    },
  ]

  return (
    <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-center mb-8 lg:mb-12'>
        CONTACT US
      </h1>

      <div className='flex flex-col lg:flex-row gap-6 lg:gap-8 bg-white/5 rounded-2xl lg:rounded-4xl p-4 sm:p-6 lg:p-8 shadow-[0_1px_0_rgba(255,255,255,0.07)_inset,0_2px_4px_rgba(0,0,0,0.3),0_30px_80px_rgba(0,0,0,0.5)]'>
        <div className='w-full lg:w-1/2 bg-black/50 rounded-2xl p-4 sm:p-6 lg:p-8 space-y-4 lg:space-y-6 flex flex-col justify-between shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_4px_12px_rgba(0,0,0,0.5),0_20px_40px_rgba(0,0,0,0.6),0_40px_80px_rgba(0,0,0,0.4)]'>
          <div
            className='bg-black rounded-xl lg:rounded-2xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 cursor-pointer transition-all hover:bg-gray-800'
            onMouseEnter={() => setShowContactEmail(true)}
            onMouseLeave={() => setShowContactEmail(false)}
          >
            <div className='bg-white rounded-full p-2 sm:p-3'>
              <svg
                className='w-5 h-5 sm:w-6 sm:h-6 text-black'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
              </svg>
            </div>
            <div>
              <div className='text-white font-bold text-base sm:text-lg'>
                CONTACT EMAIL
              </div>
              <div className='text-gray-300 text-xs sm:text-sm'>
                {showContactEmail ? 'contact@example.com' : '(hover to reveal)'}
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            {leftFields.map((field) => (
              <FormField
                key={field.id}
                {...field}
                value={formData[field.name]}
                onChange={handleInputChange}
              />
            ))}
          </div>
        </div>

        <div className='w-full lg:w-1/2 bg-black/50 rounded-2xl p-4 sm:p-6 lg:p-8 flex flex-col justify-between shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_4px_12px_rgba(0,0,0,0.5),0_20px_40px_rgba(0,0,0,0.6),0_40px_80px_rgba(0,0,0,0.4)]'>
          <form onSubmit={handleSubmit} className='space-y-4 lg:space-y-6'>
            <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
              {rightFields.slice(0, 2).map((field) => (
                <div key={field.id} className='flex-1'>
                  <FormField
                    {...field}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
            </div>

            {rightFields.slice(2).map((field) => (
              <FormField
                key={field.id}
                {...field}
                value={formData[field.name]}
                onChange={handleInputChange}
              />
            ))}

            <button
              type='submit'
              className='w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black'
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function CampusAmbassador() {
  return (
    <div className='relative min-h-screen overflow-hidden'>
      <Image
        src='/images/CA-page/fire.svg'
        alt='Background'
        fill
        className='lg:object-contain lg:scale-120 object-cover'
        priority
      />

      <Vignette
        extra='hidden lg:block'
        radialGradientString={`radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.7) 80%, rgba(0,0,0,0.9) 90%, rgba(0,0,0,1) 100%)`}
      />

      <Vignette
        extra='lg:hidden'
        radialGradientString={`radial-gradient(ellipse at center, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.7) 80%, rgba(0,0,0,1) 100%)`}
      />

      <div className='relative z-10 flex justify-center items-center scale-75 lg:scale-100 min-h-screen'>
        <ContactForm />
      </div>
    </div>
  )
}
