'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Home() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstall, setShowInstall] = useState(false)

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
    }
    
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
                <p className="font-semibold">Psic. Mariela Plácito</p>
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
          <span className="text-xl font-semibold text-sage-700">🌿 Psic. Mariela Plácito</span>
          <div className="hidden md:flex gap-6 text-sm items-center">
            <a href="#servicios" className="text-gray-600 hover:text-sage-600 transition">Servicios</a>
            <a href="#sobre-mi" className="text-gray-600 hover:text-sage-600 transition">Sobre mí</a>
            <a href="#beneficios" className="text-gray-600 hover:text-sage-600 transition">Beneficios</a>
            <Link href="/tienda" className="text-gray-600 hover:text-sage-600 transition">Talleres</Link>
            <a href="https://wa.me/523221118596" target="_blank" className="bg-sage-500 text-white px-4 py-2 rounded-full hover:bg-sage-600 transition">
              Contactar
            </a>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <a href="https://wa.me/523221118596" target="_blank" className="bg-sage-500 text-white px-4 py-2 rounded-full text-sm">
              WhatsApp
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-sage-50 to-cream-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-sage-800 leading-tight mb-6">
              Psicoterapia Integral en Español
            </h1>
            <p className="text-lg text-gray-600 mb-4 max-w-lg">
              Ofrezco un espacio de acompañamiento psicológico integral para transformar, 
              comprenderte y volver a tu centro.
            </p>
            <p className="text-md text-sage-600 mb-8 max-w-lg font-medium">
              📍 Presencial en Puerto Vallarta y Bahía de Banderas<br/>
              🌐 En línea disponible en cualquier parte del mundo
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href="https://wa.me/523221118596?text=Hola%20Mariela,%20me%20gustaría%20agendar%20una%20sesión" target="_blank" className="bg-sage-500 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-sage-600 transition shadow-lg shadow-sage-200 flex items-center justify-center gap-2">
                💬 Agendar por WhatsApp
              </a>
              <a href="#servicios" className="border-2 border-sage-300 text-sage-700 px-8 py-3 rounded-full text-lg font-medium hover:bg-sage-50 transition">
                Ver servicios
              </a>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <img 
                src="/foto-psicologa.png" 
                alt="Psic. Mariela Plácito"
                className="w-72 h-72 md:w-96 md:h-96 object-cover rounded-full shadow-2xl"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <div className="w-72 h-72 md:w-96 md:h-96 bg-gradient-to-br from-sage-200 to-sage-300 rounded-full items-center justify-center shadow-2xl hidden">
                <span className="text-8xl">🌿</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="servicios" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-sage-800 mb-4">Servicios</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Diferentes modalidades de atención adaptadas a tu proceso de sanación
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {/* Psicoterapia Niños */}
            <a href="/agendar?servicio=1" className="bg-cream-50 rounded-2xl p-4 md:p-6 hover:shadow-xl transition block cursor-pointer">
              <div className="w-full aspect-square bg-sage-100 rounded-2xl flex items-center justify-center mb-4 p-4">
                <img src="/icons/ninos.png" alt="Niños" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-sm md:text-lg font-semibold text-sage-800 mb-2">Psicoterapia para Niños</h3>
              <p className="text-gray-600 text-xs md:text-sm mb-3">Espacio donde el niño puede expresar sus emociones de manera segura, fortalecer su autoestima y desarrollar herramientas para su estabilidad emocional.</p>
              <p className="text-sage-600 font-bold text-sm md:text-base">$800 MXN / sesión</p>
            </a>

            {/* Psicoterapia Adolescentes */}
            <a href="/agendar?servicio=2" className="bg-cream-50 rounded-2xl p-4 md:p-6 hover:shadow-xl transition block cursor-pointer">
              <div className="w-full aspect-square bg-sage-100 rounded-2xl flex items-center justify-center mb-4 p-4">
                <img src="/icons/adolescentes.png" alt="Adolescentes" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-sm md:text-lg font-semibold text-sage-800 mb-2">Psicoterapia para Adolescentes</h3>
              <p className="text-gray-600 text-xs md:text-sm mb-3">Acompañamiento emocional durante una etapa de cambios profundos, enfocado en identidad, autoestima, manejo de ansiedad y conflictos familiares.</p>
              <p className="text-sage-600 font-bold text-sm md:text-base">$800 MXN / sesión</p>
            </a>

            {/* Psicoterapia Adultos */}
            <a href="/agendar?servicio=3" className="bg-cream-50 rounded-2xl p-4 md:p-6 hover:shadow-xl transition block cursor-pointer">
              <div className="w-full aspect-square bg-sage-100 rounded-2xl flex items-center justify-center mb-4 p-4">
                <img src="/icons/adultos.png" alt="Adultos" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-sm md:text-lg font-semibold text-sage-800 mb-2">Psicoterapia para Adultos</h3>
              <p className="text-gray-600 text-xs md:text-sm mb-3">Proceso de autoconocimiento y sanación emocional que permite construir una vida más consciente, equilibrada y coherente con tus valores.</p>
              <p className="text-sage-600 font-bold text-sm md:text-base">$800 MXN / sesión</p>
            </a>

            {/* Meditaciones */}
            <a href="https://wa.me/523221118596?text=Hola%20Mariela,%20me%20interesan%20las%20Meditaciones%20Guiadas" target="_blank" className="bg-cream-50 rounded-2xl p-4 md:p-6 hover:shadow-xl transition block cursor-pointer">
              <div className="w-full aspect-square bg-sage-100 rounded-2xl flex items-center justify-center mb-4 p-4">
                <img src="/icons/meditaciones.png" alt="Meditación" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-sm md:text-lg font-semibold text-sage-800 mb-2">Meditaciones Guiadas</h3>
              <p className="text-gray-600 text-xs md:text-sm mb-3">Prácticas de conexión interior que ayudan a calmar la mente, regular el sistema nervioso y recuperar el equilibrio emocional a través de la respiración.</p>
              <p className="text-sage-600 font-bold text-sm md:text-base">Consultar precio</p>
            </a>

            {/* Talleres */}
            <a href="https://wa.me/523221118596?text=Hola%20Mariela,%20me%20interesan%20los%20Talleres%20Terapéuticos" target="_blank" className="bg-cream-50 rounded-2xl p-4 md:p-6 hover:shadow-xl transition block cursor-pointer">
              <div className="w-full aspect-square bg-sage-100 rounded-2xl flex items-center justify-center mb-4 p-4">
                <img src="/icons/talleres.png" alt="Talleres" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-sm md:text-lg font-semibold text-sage-800 mb-2">Talleres Terapéuticos</h3>
              <p className="text-gray-600 text-xs md:text-sm mb-3">Espacios grupales de crecimiento personal enfocados en inteligencia emocional, meditación, adicciones, codependencia y autocuidado.</p>
              <p className="text-sage-600 font-bold text-sm md:text-base">Consultar precio</p>
            </a>

            {/* Retiros */}
            <a href="https://wa.me/523221118596?text=Hola%20Mariela,%20me%20interesan%20los%20Retiros%20Holísticos" target="_blank" className="bg-cream-50 rounded-2xl p-4 md:p-6 hover:shadow-xl transition block cursor-pointer">
              <div className="w-full aspect-square bg-sage-100 rounded-2xl flex items-center justify-center mb-4 p-4">
                <img src="/icons/retiros.png" alt="Retiros" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-sm md:text-lg font-semibold text-sage-800 mb-2">Retiros Holísticos</h3>
              <p className="text-gray-600 text-xs md:text-sm mb-3">Experiencias de integración profunda donde la psicoterapia se une con prácticas conscientes para facilitar transformación e introspección.</p>
              <p className="text-sage-600 font-bold text-sm md:text-base">Consultar precio</p>
            </a>

            {/* Cacao */}
            <a href="https://wa.me/523221118596?text=Hola%20Mariela,%20me%20interesa%20el%20Cacao%20Ceremonial" target="_blank" className="bg-cream-50 rounded-2xl p-4 md:p-6 hover:shadow-xl transition block cursor-pointer">
              <div className="w-full aspect-square bg-sage-100 rounded-2xl flex items-center justify-center mb-4 p-4">
                <img src="/icons/cacao.png" alt="Cacao" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-sm md:text-lg font-semibold text-sage-800 mb-2">Cacao Ceremonial</h3>
              <p className="text-gray-600 text-xs md:text-sm mb-3">Acompañamiento terapéutico en espacios de apertura emocional, sensibilidad, introspección y conexión espiritual.</p>
              <p className="text-sage-600 font-bold text-sm md:text-base">Consultar precio</p>
            </a>

            {/* Círculos */}
            <a href="https://wa.me/523221118596?text=Hola%20Mariela,%20me%20interesan%20los%20Círculos%20de%20Palabra" target="_blank" className="bg-cream-50 rounded-2xl p-4 md:p-6 hover:shadow-xl transition block cursor-pointer">
              <div className="w-full aspect-square bg-sage-100 rounded-2xl flex items-center justify-center mb-4 p-4">
                <img src="/icons/circulos.png" alt="Círculos" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-sm md:text-lg font-semibold text-sage-800 mb-2">Círculos de Palabra</h3>
              <p className="text-gray-600 text-xs md:text-sm mb-3">Espacios de escucha y expresión emocional grupal que fomentan la contención, el respeto y la sanación colectiva.</p>
              <p className="text-sage-600 font-bold text-sm md:text-base">Consultar precio</p>
            </a>
          </div>

          <div className="text-center mt-12">
            <a href="https://wa.me/523221118596?text=Hola%20Mariela,%20me%20gustaría%20información%20sobre%20tus%20servicios" target="_blank" className="inline-block bg-sage-500 text-white px-8 py-3 rounded-full font-medium hover:bg-sage-600 transition">
              Solicitar información
            </a>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section id="beneficios" className="py-20 px-4 bg-cream-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-sage-800 mb-12">Beneficios del Acompañamiento</h2>
          
          <div className="grid md:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <p className="text-gray-700 font-medium">Mayor claridad emocional</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧠</span>
              </div>
              <p className="text-gray-700 font-medium">Regulación del sistema nervioso</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛠️</span>
              </div>
              <p className="text-gray-700 font-medium">Herramientas prácticas</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <p className="text-gray-700 font-medium">Acompañamiento humano</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <p className="text-gray-700 font-medium">Integración emocional y espiritual</p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="sobre-mi" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <img 
                src="/foto-psicologa.png" 
                alt="Psic. Mariela Plácito"
                className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-2xl shadow-xl"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-sage-300 to-sage-400 rounded-2xl items-center justify-center shadow-xl hidden">
                <span className="text-6xl">🌿</span>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-sage-800 mb-6">Sobre mí</h2>
            <p className="text-gray-600 mb-4">
              Soy Mariela Plácito, psicóloga de profesión pero sobre todo una acompañante de quienes 
              buscan sanar. Concibo la psicoterapia no solo como una técnica clínica, sino como un 
              encuentro consciente que permite mirar la historia personal con respeto, amor y claridad.
            </p>
            <p className="text-gray-600 mb-4">
              Mi trabajo se basa en la empatía, la calidez y el compromiso de caminar junto a cada persona 
              en su proceso de sanación. No ofrezco respuestas absolutas, sino un acompañamiento auténtico 
              para que cada quien encuentre sus propias respuestas.
            </p>
            <p className="text-gray-600 mb-6">
              Concibo la psicoterapia con una visión integral, reconociendo que mente, cuerpo y espíritu 
              forman una unidad. Cuando uno se repara, todo se armoniza.
            </p>
            <div className="bg-sage-50 rounded-xl p-4">
              <p className="text-sage-700 font-medium">🌿 Enfoque Humanista e Integral</p>
              <p className="text-gray-600 text-sm mt-1">Combinando psicoterapia con meditación, respiración consciente y prácticas de sanación.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-sage-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">¿Lista/o para dar el primer paso?</h2>
          <p className="text-sage-100 mb-8 text-lg">Comienza tu proceso de sanación hoy. Primera sesión de valoración.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/523221118596?text=Hola%20Mariela,%20me%20gustaría%20agendar%20una%20sesión%20de%20valoración" target="_blank" className="inline-flex items-center justify-center gap-2 bg-white text-sage-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-cream-100 transition shadow-xl">
              💬 Contactar por WhatsApp
            </a>
          </div>
          <p className="text-sage-200 mt-6">📞 322 111 85 96</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-sage-800 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-semibold mb-2">Psic. Mariela Plácito</p>
          <p className="text-sage-300 text-sm mb-4">Psicoterapia Integral en Español</p>
          <div className="flex gap-4 mb-3 justify-center md:justify-start">
              <a href="https://www.instagram.com/psic.marielapm" target="_blank" className="text-sage-300 hover:text-white text-2xl">📷</a>
              <a href="https://www.facebook.com/profile.php?id=61563161534190" target="_blank" className="text-sage-300 hover:text-white text-2xl">📘</a>
            </div>
          <p className="text-sage-400 text-sm">
            📍 Atención presencial: Puerto Vallarta y Bahía de Banderas<br/>
            🌐 Atención en línea: Cualquier parte del mundo
          </p>
          <p className="text-sage-500 text-xs mt-6">El acompañamiento terapéutico se realiza desde un enfoque ético, profesional y confidencial.</p>
        </div>
        {process.env.NEXT_PUBLIC_SHOW_FIRMA !== "false" && <p className="text-center text-sage-600 text-xs mt-4">hecho con ❤️ por Duendes 2026</p>}
      </footer>
    </main>
  )
}
