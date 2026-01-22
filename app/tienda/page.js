import Link from 'next/link'

export const metadata = {
  title: 'Talleres y Eventos | Psicóloga',
  description: 'Talleres grupales de desarrollo personal, manejo de estrés y bienestar emocional.',
}

const productos = [
  {
    id: 1,
    nombre: 'Taller: Manejo del Estrés',
    descripcion: 'Aprende técnicas prácticas para manejar el estrés diario y la ansiedad. 4 sesiones grupales.',
    precio: '$1,500 MXN',
    duracion: '4 semanas (1 sesión/semana)',
    fecha: 'Próximo inicio: Febrero 2026',
    emoji: '🧘',
    stripeLink: '#' // Reemplazar con Payment Link de Stripe
  },
  {
    id: 2,
    nombre: 'Taller: Autoestima y Amor Propio',
    descripcion: 'Trabaja en tu autoconcepto y desarrolla una relación más sana contigo misma/o.',
    precio: '$1,800 MXN',
    duracion: '6 semanas (1 sesión/semana)',
    fecha: 'Próximo inicio: Marzo 2026',
    emoji: '💚',
    stripeLink: '#'
  },
  {
    id: 3,
    nombre: 'Paquete 4 Sesiones Individuales',
    descripcion: 'Ahorra comprando un paquete de sesiones. Válido por 2 meses.',
    precio: '$2,800 MXN',
    precioRegular: '$3,200 MXN',
    ahorro: 'Ahorras $400',
    emoji: '🎯',
    stripeLink: '#'
  },
  {
    id: 4,
    nombre: 'Sesión Individual (1)',
    descripcion: 'Una sesión de terapia individual de 50 minutos.',
    precio: '$800 MXN',
    emoji: '👤',
    stripeLink: '#'
  }
]

export default function Tienda() {
  return (
    <main className="min-h-screen bg-cream-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-sage-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold text-sage-700">🌿 Psicóloga</Link>
          <div className="flex gap-4 items-center">
            <Link href="/agendar" className="text-sage-600 hover:text-sage-800 transition text-sm">
              Agendar cita
            </Link>
            <Link href="/" className="text-sage-600 hover:text-sage-800 transition text-sm">
              ← Inicio
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-sage-800 mb-4">Talleres y Paquetes</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Invierte en tu bienestar emocional con nuestros talleres grupales y paquetes de sesiones
          </p>
        </div>

        {/* Productos */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {productos.map((producto) => (
            <div key={producto.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{producto.emoji}</span>
                  {producto.ahorro && (
                    <span className="bg-sage-100 text-sage-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {producto.ahorro}
                    </span>
                  )}
                </div>
                
                <h2 className="text-xl font-bold text-sage-800 mb-2">{producto.nombre}</h2>
                <p className="text-gray-600 mb-4">{producto.descripcion}</p>
                
                {producto.duracion && (
                  <p className="text-sm text-sage-600 mb-1">⏱️ {producto.duracion}</p>
                )}
                {producto.fecha && (
                  <p className="text-sm text-sage-600 mb-4">📅 {producto.fecha}</p>
                )}

                <div className="flex items-end justify-between mt-6">
                  <div>
                    <span className="text-2xl font-bold text-sage-700">{producto.precio}</span>
                    {producto.precioRegular && (
                      <span className="text-gray-400 line-through ml-2 text-sm">{producto.precioRegular}</span>
                    )}
                  </div>
                  <a 
                    href={producto.stripeLink}
                    className="bg-sage-500 text-white px-6 py-2 rounded-full font-medium hover:bg-sage-600 transition"
                  >
                    Comprar
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info de Stripe */}
        <div className="bg-sage-50 rounded-2xl p-8 text-center">
          <h3 className="text-lg font-semibold text-sage-700 mb-2">🔒 Pago seguro con Stripe</h3>
          <p className="text-gray-600 text-sm mb-4">
            Todos los pagos son procesados de forma segura. Aceptamos tarjetas de crédito y débito.
          </p>
          <div className="bg-white rounded-lg p-6 text-left text-sm text-gray-600 max-w-lg mx-auto">
            <p className="font-semibold mb-2">Para activar los pagos:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Crea una cuenta en <a href="https://stripe.com" target="_blank" rel="noopener" className="text-sage-600 underline">stripe.com</a></li>
              <li>Crea los productos en Dashboard → Productos</li>
              <li>Genera Payment Links para cada producto</li>
              <li>Reemplaza los links en este archivo</li>
            </ol>
          </div>
        </div>
      </div>

      <footer className="py-8 text-center text-sage-400 text-sm">
        <p>hecho con ❤️ por Duendes 2026</p>
      </footer>
    </main>
  )
}
