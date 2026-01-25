import Link from 'next/link'

export default function CursosWhatsApp() {
  return (
    <main className="min-h-screen bg-cream-50">
      {/* Header */}
      <header className="bg-sage-600 text-white py-6 px-4">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="text-sage-200 hover:text-white text-sm">
            ← Volver al inicio
          </Link>
          <h1 className="text-2xl font-bold mt-4">
            📱 Cursos por WhatsApp
          </h1>
          <p className="text-sage-100 mt-2">
            Experiencia terapéutica completa
          </p>
        </div>
      </header>

      {/* Contenido */}
      <section className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <p className="text-gray-600 mb-8 text-lg">
            Procesos guiados de crecimiento personal directamente en tu WhatsApp, 
            diseñados para acompañarte en tu transformación.
          </p>

          <div className="space-y-6 mb-10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">💚</span>
              </div>
              <div>
                <h3 className="font-semibold text-sage-700 text-lg">Acompañamiento emocional</h3>
                <p className="text-gray-600">Soporte constante durante tu proceso de sanación y crecimiento personal.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">📝</span>
              </div>
              <div>
                <h3 className="font-semibold text-sage-700 text-lg">Ejercicios guiados</h3>
                <p className="text-gray-600">Actividades prácticas diseñadas para profundizar en tu autoconocimiento.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🎧</span>
              </div>
              <div>
                <h3 className="font-semibold text-sage-700 text-lg">Audios y seguimiento</h3>
                <p className="text-gray-600">Material de audio exclusivo y seguimiento personalizado de tu avance.</p>
              </div>
            </div>
          </div>

          <a
            href="https://wa.me/523221118596?text=Hola%20Mariela,%20me%20interesan%20los%20Cursos%20por%20WhatsApp"
            target="_blank"
            className="block w-full bg-green-500 text-white text-center py-4 rounded-xl font-semibold text-lg hover:bg-green-600 transition"
          >
            💬 Inscribirme por WhatsApp
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 text-center">
        <p className="text-gray-500 text-sm">
          🌿 Psic. Mariela Plácito
        </p>
      </footer>
    </main>
  )
}
