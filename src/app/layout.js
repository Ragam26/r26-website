import './globals.css'

export const metadata = {
  title: 'Ragam 2026',
  description:
    "Official website of Ragam 2026, South India's biggest cultural fest!",
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className='antialiased'>{children}</body>
    </html>
  )
}
