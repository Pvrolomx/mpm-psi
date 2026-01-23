'use client'
import Link from 'next/link'
import { useState } from 'react'

const productos = [
  {
    id: 1,
    nombre: 'Taller: Manejo del Estrés',
    descripcion: 'Aprende técnicas prácticas para manejar el estrés diario. 4 sesiones grupales.',
    precio: 1500,
    precioDisplay: '$1,500 MXN',
    duracion: '4 semanas',
    fecha: 'Febrero 2026',
    emoji: '🧘',
  },
  {
    id: 2,
    nombre: 'Taller: Autoestima y Amor Propio',
    descripcion: 'Trabaja en tu autoconcepto y desarrolla una relación más sana contigo.',
    precio: 1800,
    precioDisplay: '$1,800 MXN',
    duracion: '6 semanas',
    fecha: 'Marzo 2026',
    emoji: '💚',
  },
  {
    id: 3,
    nombre: 'Paquete 4 Sesiones',
    descripcion: 'Ahorra comprando un paquete. Válido por 2 meses.',
    precio: 2800,
    precioDisplay: '$2,800 MXN',
    precioRegular: '$3,200 MXN',
    ahorro: 'Ahorras $400',
    emoji: '🎯',
  },
  {
    id: 4,
    nombre: 'Sesión Individual',
    descripcion: 'Una sesión de terapia individual de 50 minutos.',
    precio: 800,
    precioDisplay: '$800 MXN',
    emoji: '👤',
  }
]

export default function Tienda() {
  const [comprando, setComprando] = useState(null)
  const [exito, setExito] = useState(false)
  const [formData, setFormData] = useState({ nombre: '', email: '' })

  const handleComprar = (producto) => {
    setComprando(producto)
  }

  const handlePagar = () => {
    // Simulación de pago exitoso (en producción usaría Stripe Checkout)
    setTimeout(() => {
      setExito(true)
      setComprando(null)
    }, 1500)
  }

  if (exito) {
    return (
      <main className="min-h-screen bg-cream-50">
        <nav className="bg-white border-b border-sage-100">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <Link href="/" className="text-xl font-semibold text-sage-700">🌿 Psicóloga</Link>
          </div>
        </nav>
        <div className="max-w-lg mx-auto px-4 py-20 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-2xl font-bold text-sage-800 mb-4">¡Pago exitoso!</h1>
            <p className="text-gray-600 mb-6">Te enviamos los detalles a tu correo.</p>
            <Link href="/" className="inline-block bg-sage-500 text-white px-6 py-3 rounded-full hover:bg-sage-600">Volver al inicio</Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-cream-50">
      <nav className="bg-white border-b border-sage-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold text-sage-700">🌿 Psicóloga</Link>
          <div className="flex gap-4 items-center">
            <Link href="/agendar" className="text-sage-600 hover:text-sage-800 text-sm">Agendar</Link>
            <Link href="/" className="text-sage-600 hover:text-sage-800 text-sm">← Inicio</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-sage-800 mb-4">Talleres y Paquetes</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Invierte en tu bienestar emocional</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {productos.map((producto) => (
            <div key={producto.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{producto.emoji}</span>
                  {producto.ahorro && (
                    <span className="bg-sage-100 text-sage-700 text-xs font-semibold px-3 py-1 rounded-full">{producto.ahorro}</span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-sage-800 mb-2">{producto.nombre}</h2>
                <p className="text-gray-600 mb-4">{producto.descripcion}</p>
                {producto.duracion && <p className="text-sm text-sage-600 mb-1">⏱️ {producto.duracion}</p>}
                {producto.fecha && <p className="text-sm text-sage-600 mb-4">📅 {producto.fecha}</p>}
                <div className="flex items-end justify-between mt-6">
                  <div>
                    <span className="text-2xl font-bold text-sage-700">{producto.precioDisplay}</span>
                    {producto.precioRegular && <span className="text-gray-400 line-through ml-2 text-sm">{producto.precioRegular}</span>}
                  </div>
                  <button onClick={() => handleComprar(producto)} className="bg-sage-500 text-white px-6 py-2 rounded-full font-medium hover:bg-sage-600 transition">
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-sage-50 rounded-2xl p-8 text-center">
          <h3 className="text-lg font-semibold text-sage-700 mb-2">🔒 Pago seguro con Stripe</h3>
          <p className="text-gray-600 text-sm">Aceptamos tarjetas de crédito y débito.</p>
          <p className="text-xs text-sage-400 mt-2">Modo TEST activo — No se realizan cobros reales</p>
        </div>
      </div>

      {/* Modal de checkout */}
      {comprando && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold text-sage-800">{comprando.nombre}</h2>
                <p className="text-sage-600 font-semibold">{comprando.precioDisplay}</p>
              </div>
              <button onClick={() => setComprando(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input type="text" value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})} className="w-full px-4 py-3 border border-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-500" placeholder="Tu nombre" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 border border-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-500" placeholder="tu@email.com" />
              </div>
            </div>

            {/* Stripe Test Card Info */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-xs text-gray-500 mb-2">🧪 Tarjeta de prueba:</p>
              <p className="font-mono text-sm text-gray-700">4242 4242 4242 4242</p>
              <p className="text-xs text-gray-500">Cualquier fecha futura y CVC</p>
            </div>

            <button onClick={handlePagar} disabled={!formData.nombre || !formData.email} className="w-full bg-sage-500 text-white py-3 rounded-full font-medium hover:bg-sage-600 disabled:opacity-50">
              Pagar {comprando.precioDisplay}
            </button>
            
            <p className="text-xs text-center text-gray-400 mt-4">Procesado por Stripe (modo test)</p>
          </div>
        </div>
      )}

      {process.env.NEXT_PUBLIC_SHOW_FIRMA !== "false" && <footer className="py-8 text-center text-sage-400 text-sm"><p>hecho con ❤️ por Duendes 2026</p></footer>}
    </main>
  )
}
