import './globals.css'

import localFont from 'next/font/local'

const brixton = localFont({
  src: '../../public/fonts/brixton-lead-vector.otf',
  display: 'swap',
})

export const metadata = {
  title: 'Ragam 2026',
  description:
    "Official website of Ragam 2026, South India's biggest cultural fest!",
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${brixton.className} antialiased`}>{children}</body>
    </html>
  )
}
