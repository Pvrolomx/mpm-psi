import './globals.css'

export const metadata = {
  title: 'Psicóloga | Terapia Individual y Talleres',
  description: 'Psicóloga clínica especializada en terapia individual, parejas y talleres grupales. Agenda tu cita online.',
  manifest: '/manifest.json',
  themeColor: '#627362',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/icon-192.png" />
        <meta name="theme-color" content="#627362" />
      </head>
      <body className="bg-cream-50 text-gray-800">
        {children}
      </body>
    </html>
  )
}
