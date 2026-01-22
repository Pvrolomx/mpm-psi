import Link from 'next/link'

export const metadata = {
  title: 'Agendar Cita | Psicóloga',
  description: 'Agenda tu cita de terapia psicológica online. Horarios flexibles.',
}

export default function Agendar() {
  return (
    <main className="min-h-screen bg-cream-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-sage-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold text-sage-700">🌿 Psicóloga</Link>
          <Link href="/" className="text-sage-600 hover:text-sage-800 transition">
            ← Volver al inicio
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-sage-800 mb-4">Agenda tu cita</h1>
          <p className="text-gray-600">
            Selecciona el tipo de consulta y el horario que mejor te convenga
          </p>
        </div>

        {/* Calendly Embed Placeholder */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="border-2 border-dashed border-sage-200 rounded-xl p-12 text-center">
            <div className="text-5xl mb-4">📅</div>
            <h2 className="text-xl font-semibold text-sage-700 mb-2">Calendly Widget</h2>
            <p className="text-gray-500 mb-6">
              Aquí se mostrará el calendario de citas cuando se configure Calendly
            </p>
            
            {/* Placeholder for Calendly - Replace CALENDLY_URL with actual URL */}
            <div className="bg-sage-50 rounded-lg p-6 text-left text-sm text-gray-600">
              <p className="font-semibold mb-2">Para activar el calendario:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Crea una cuenta en <a href="https://calendly.com" target="_blank" rel="noopener" className="text-sage-600 underline">calendly.com</a></li>
                <li>Configura tus tipos de evento (sesión individual, primera consulta, etc.)</li>
                <li>Copia tu URL de Calendly</li>
                <li>Reemplaza el placeholder en este archivo</li>
              </ol>
            </div>

            {/* Uncomment and add your Calendly URL when ready:
            <iframe
              src="https://calendly.com/YOUR-USERNAME?hide_gdpr_banner=1"
              width="100%"
              height="700"
              frameBorder="0"
            ></iframe>
            */}
          </div>
        </div>

        {/* Info cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="font-semibold text-sage-700 mb-2">📍 Modalidad</h3>
            <p className="text-gray-600 text-sm">
              Sesiones presenciales en consultorio o videollamada según tu preferencia.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="font-semibold text-sage-700 mb-2">⏰ Duración</h3>
            <p className="text-gray-600 text-sm">
              Primera cita: 30 min (conocernos)<br/>
              Sesión regular: 50 min
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="font-semibold text-sage-700 mb-2">💳 Formas de pago</h3>
            <p className="text-gray-600 text-sm">
              Transferencia, tarjeta de crédito/débito, efectivo en consultorio.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="font-semibold text-sage-700 mb-2">❓ ¿Dudas?</h3>
            <p className="text-gray-600 text-sm">
              Escríbeme a <a href="mailto:contacto@psicologa.com" className="text-sage-600 underline">contacto@psicologa.com</a>
            </p>
          </div>
        </div>
      </div>

      <footer className="py-8 text-center text-sage-400 text-sm">
        <p>hecho con ❤️ por Duendes 2026</p>
      </footer>
    </main>
  )
}
