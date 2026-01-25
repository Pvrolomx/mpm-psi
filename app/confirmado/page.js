import Link from 'next/link'

export default function ConfirmadoPage({ searchParams }) {
  const citaId = searchParams?.cita || ''
  const isPending = searchParams?.pending === '1'

  return (
    <main className="min-h-screen bg-cream-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {isPending ? (
          <>
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">⏳</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Pago Pendiente
            </h1>
            <p className="text-gray-600 mb-6">
              Tu pago está siendo procesado. Te notificaremos por correo cuando se confirme tu cita.
            </p>
          </>
        ) : (
          <>
            <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">✅</span>
            </div>
            <h1 className="text-2xl font-bold text-sage-700 mb-4">
              ¡Cita Confirmada!
            </h1>
            <p className="text-gray-600 mb-6">
              Tu pago se ha recibido correctamente. Recibirás un correo con los detalles de tu cita.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Si tienes alguna pregunta, no dudes en contactarme por WhatsApp.
            </p>
          </>
        )}

        <div className="space-y-3">
          <a
            href="https://wa.me/523221118596"
            target="_blank"
            className="block w-full bg-green-500 text-white py-3 rounded-xl font-medium hover:bg-green-600 transition"
          >
            💬 Contactar por WhatsApp
          </a>
          <Link
            href="/"
            className="block w-full bg-sage-500 text-white py-3 rounded-xl font-medium hover:bg-sage-600 transition"
          >
            Volver al inicio
          </Link>
        </div>

        {citaId && (
          <p className="text-xs text-gray-400 mt-6">
            Referencia: {citaId}
          </p>
        )}
      </div>
    </main>
  )
}
