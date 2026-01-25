import Link from 'next/link'

export default function CursosWhatsApp() {
  const servicios = [
    {
      icon: '💚',
      titulo: 'Acompañamiento emocional',
      descripcion: 'Soporte constante durante tu proceso de sanación y crecimiento personal.',
    },
    {
      icon: '📝',
      titulo: 'Ejercicios guiados',
      descripcion: 'Actividades prácticas diseñadas para profundizar en tu autoconocimiento.',
    },
    {
      icon: '🎧',
      titulo: 'Audios y seguimiento',
      descripcion: 'Material de audio exclusivo y seguimiento personalizado de tu avance.',
    },
  ]

  return (
    <main className="min-h-screen bg-cream-50">
      {/* Header */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-sage-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold text-sage-700">🌿 Psic. Mariela Plácito</Link>
          <a href="https://wa.me/523221118596" target="_blank" className="bg-sage-500 text-white px-4 py-2 rounded-full hover:bg-sage-600 transition text-sm">
            Contactar
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-12 px-4 bg-gradient-to-b from-sage-50 to-cream-50">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-6xl mb-6">📱</div>
          <h1 className="text-3xl md:text-4xl font-bold text-sage-800 mb-4">
            Cursos por WhatsApp
          </h1>
          <p className="text-xl text-sage-600 font-medium">
            Experiencia terapéutica completa
          </p>
        </div>
      </section>

      {/* Descripción */}
      <section className="py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-600 text-center leading-relaxed">
            Procesos guiados de crecimiento personal, con acompañamiento emocional, 
            ejercicios, audios y seguimiento. Experiencia terapéutica completa.
          </p>
        </div>
      </section>

      {/* 3 Cards */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          {servicios.map((servicio, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition">
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">{servicio.icon}</span>
              </div>
              <h3 className="text-lg font-semibold text-sage-700 mb-2">{servicio.titulo}</h3>
              <p className="text-gray-600 text-sm">{servicio.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4">
        <div className="max-w-md mx-auto">
          <a
            href="https://wa.me/523221118596?text=Hola%20Mariela,%20me%20interesan%20los%20Cursos%20por%20WhatsApp"
            target="_blank"
            className="block w-full bg-green-500 text-white text-center py-4 rounded-xl font-semibold text-lg hover:bg-green-600 transition shadow-lg"
          >
            💬 Inscribirme por WhatsApp
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-sage-800 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-semibold mb-2">Psic. Mariela Plácito</p>
          <p className="text-sage-300 text-sm">Psicoterapia Integral en Español</p>
          <Link href="/" className="text-sage-400 hover:text-white text-sm mt-4 inline-block">
            ← Volver al inicio
          </Link>
        </div>
      </footer>
    </main>
  )
}
