'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Home() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstall, setShowInstall] = useState(false)

  useEffect(() => {
    // Registrar Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
    }
    
    // PWA Install prompt
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstall(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setShowInstall(false)
    }
    setDeferredPrompt(null)
  }

  return (
    <main className="min-h-screen">
      {/* Install Banner */}
      {showInstall && (
        <div className="fixed bottom-0 left-0 right-0 bg-sage-700 text-white p-4 z-50 shadow-lg">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <span className="text-2xl">🌿</span>
              </div>
              <div>
                <p className="font-semibold">Psicóloga App</p>
                <p className="text-sm text-sage-200">Instalar en tu dispositivo</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowInstall(false)} className="px-4 py-2 text-sage-200 hover:text-white">
                Ahora no
              </button>
              <button onClick={handleInstall} className="bg-white text-sage-700 px-6 py-2 rounded-full font-semibold hover:bg-sage-50">
                Instalar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-sage-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <span className="text-xl font-semibold text-sage-700">🌿 Psicóloga</span>
          <div className="hidden md:flex gap-6 text-sm items-center">
            <a href="#servicios" className="text-gray-600 hover:text-sage-600 transition">Servicios</a>
            <a href="#sobre-mi" className="text-gray-600 hover:text-sage-600 transition">Sobre mí</a>
            <Link href="/tienda" className="text-gray-600 hover:text-sage-600 transition">Talleres</Link>
            {showInstall && (
              <button onClick={handleInstall} className="text-sage-600 hover:text-sage-800 flex items-center gap-1">
                📲 Descargar App
              </button>
            )}
            <Link href="/agendar" className="bg-sage-500 text-white px-4 py-2 rounded-full hover:bg-sage-600 transition">
              Agendar cita
            </Link>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            {showInstall && (
              <button onClick={handleInstall} className="text-sage-600 text-xl">📲</button>
            )}
            <Link href="/agendar" className="bg-sage-500 text-white px-4 py-2 rounded-full text-sm">
              Agendar
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-sage-50 to-cream-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-sage-800 leading-tight mb-6">
              Tu bienestar emocional es mi prioridad
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Te acompaño en tu proceso de autoconocimiento y crecimiento personal. 
              Terapia individual, de pareja y talleres grupales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/agendar" className="bg-sage-500 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-sage-600 transition shadow-lg shadow-sage-200">
                Agendar primera cita
              </Link>
              <a href="#servicios" className="border-2 border-sage-300 text-sage-700 px-8 py-3 rounded-full text-lg font-medium hover:bg-sage-50 transition">
                Ver servicios
              </a>
            </div>
          </div>
          <div className="flex-1">
            <div className="w-72 h-72 md:w-96 md:h-96 bg-gradient-to-br from-sage-200 to-sage-300 rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-8xl">🧠</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="servicios" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-sage-800 mb-4">Servicios</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Ofrezco diferentes modalidades de atención adaptadas a tus necesidades
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/agendar" className="bg-cream-50 rounded-2xl p-8 hover:shadow-xl transition cursor-pointer block group">
              <div className="w-14 h-14 bg-sage-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-sage-200 transition">
                <span className="text-2xl">👤</span>
              </div>
              <h3 className="text-xl font-semibold text-sage-800 mb-3">Terapia Individual</h3>
              <p className="text-gray-600 mb-4">Sesiones personalizadas de 50 minutos para trabajar ansiedad, depresión, autoestima y más.</p>
              <p className="text-sage-600 font-semibold">$800 MXN / sesión</p>
              <p className="text-sage-500 text-sm mt-3 group-hover:underline">Agendar cita →</p>
            </Link>

            <Link href="/agendar" className="bg-cream-50 rounded-2xl p-8 hover:shadow-xl transition cursor-pointer block group">
              <div className="w-14 h-14 bg-sage-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-sage-200 transition">
                <span className="text-2xl">💑</span>
              </div>
              <h3 className="text-xl font-semibold text-sage-800 mb-3">Terapia de Pareja</h3>
              <p className="text-gray-600 mb-4">Espacio seguro para mejorar la comunicación y resolver conflictos en pareja.</p>
              <p className="text-sage-600 font-semibold">$1,200 MXN / sesión</p>
              <p className="text-sage-500 text-sm mt-3 group-hover:underline">Agendar cita →</p>
            </Link>

            <Link href="/tienda" className="bg-cream-50 rounded-2xl p-8 hover:shadow-xl transition cursor-pointer block group">
              <div className="w-14 h-14 bg-sage-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-sage-200 transition">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold text-sage-800 mb-3">Talleres Grupales</h3>
              <p className="text-gray-600 mb-4">Talleres temáticos sobre manejo de emociones, estrés y desarrollo personal.</p>
              <p className="text-sage-600 font-semibold">Desde $1,500 MXN</p>
              <p className="text-sage-500 text-sm mt-3 group-hover:underline">Ver próximos talleres →</p>
            </Link>
          </div>

          <div className="text-center mt-12">
            <Link href="/agendar" className="inline-block bg-sage-500 text-white px-8 py-3 rounded-full font-medium hover:bg-sage-600 transition">
              Agendar cita
            </Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="sobre-mi" className="py-20 px-4 bg-sage-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 flex justify-center">
            {/* Foto de perfil - placeholder hasta que se suba imagen */}
            <div className="relative">
              <img 
                src="/foto-psicologa.png" 
                alt="Psicóloga"
                className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-2xl shadow-xl"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-sage-300 to-sage-400 rounded-2xl items-center justify-center shadow-xl hidden">
                <span className="text-6xl">👩‍⚕️</span>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-sage-800 mb-6">Sobre mí</h2>
            <p className="text-gray-600 mb-4">
              Soy psicóloga clínica con más de 10 años de experiencia acompañando a personas 
              en su proceso de crecimiento personal y bienestar emocional.
            </p>
            <p className="text-gray-600 mb-4">
              Mi enfoque es humanista e integrativo, combinando diferentes técnicas terapéuticas 
              según las necesidades de cada persona.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2"><span className="text-sage-500">✓</span> Licenciatura en Psicología - UNAM</li>
              <li className="flex items-center gap-2"><span className="text-sage-500">✓</span> Maestría en Psicoterapia Humanista</li>
              <li className="flex items-center gap-2"><span className="text-sage-500">✓</span> Certificada en Terapia Cognitivo-Conductual</li>
              <li className="flex items-center gap-2"><span className="text-sage-500">✓</span> Cédula Profesional: 12345678</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-sage-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">¿Lista/o para dar el primer paso?</h2>
          <p className="text-sage-100 mb-8 text-lg">La primera consulta es para conocernos. Sin compromiso.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/agendar" className="inline-block bg-white text-sage-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-cream-100 transition shadow-xl">
              Agendar primera cita gratuita
            </Link>
            {showInstall && (
              <button onClick={handleInstall} className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition">
                📲 Descargar App
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-sage-800 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">🌿 Psicóloga</h3>
              <p className="text-sage-200 text-sm">Consulta psicológica profesional para tu bienestar emocional.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contacto</h3>
              <p className="text-sage-200 text-sm">📧 contacto@psicologa.com</p>
              <p className="text-sage-200 text-sm">📱 +52 33 1234 5678</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Redes</h3>
              <div className="flex gap-4">
                <a href="#" className="text-sage-200 hover:text-white transition">Instagram</a>
                <a href="#" className="text-sage-200 hover:text-white transition">Facebook</a>
              </div>
            </div>
          </div>
          <div className="border-t border-sage-700 pt-8 text-center">
            <p className="text-sage-300 text-sm">hecho con ❤️ por Duendes 2026</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
