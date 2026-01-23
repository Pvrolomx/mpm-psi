'use client'
import Link from 'next/link'
import { useState } from 'react'

const horarios = [
  '09:00', '10:00', '11:00', '12:00', '16:00', '17:00', '18:00', '19:00'
]

const tiposCita = [
  { id: 'primera', nombre: 'Primera consulta', duracion: '30 min', precio: 'Gratis' },
  { id: 'individual', nombre: 'Sesión individual', duracion: '50 min', precio: '$800 MXN' },
  { id: 'pareja', nombre: 'Terapia de pareja', duracion: '60 min', precio: '$1,200 MXN' },
]

export default function Agendar() {
  const [tipoCita, setTipoCita] = useState('primera')
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null)
  const [horaSeleccionada, setHoraSeleccionada] = useState(null)
  const [paso, setPaso] = useState(1)
  const [datos, setDatos] = useState({ nombre: '', email: '', telefono: '', notas: '' })
  const [confirmado, setConfirmado] = useState(false)

  const dias = []
  const hoy = new Date()
  for (let i = 1; i <= 14; i++) {
    const fecha = new Date(hoy)
    fecha.setDate(hoy.getDate() + i)
    if (fecha.getDay() !== 0) dias.push(fecha)
  }

  const formatearFecha = (fecha) => {
    return fecha.toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'short' })
  }

  const handleConfirmar = () => {
    if (datos.nombre && datos.email && datos.telefono) setConfirmado(true)
  }

  if (confirmado) {
    return (
      <main className="min-h-screen bg-cream-50">
        <nav className="bg-white border-b border-sage-100">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-semibold text-sage-700">🌿 Psicóloga</Link>
          </div>
        </nav>
        <div className="max-w-lg mx-auto px-4 py-20 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-2xl font-bold text-sage-800 mb-4">¡Cita agendada!</h1>
            <p className="text-gray-600 mb-6">Te enviamos confirmación a <strong>{datos.email}</strong></p>
            <div className="bg-sage-50 rounded-xl p-4 text-left mb-6">
              <p className="text-sm text-sage-700"><strong>Tipo:</strong> {tiposCita.find(t => t.id === tipoCita)?.nombre}</p>
              <p className="text-sm text-sage-700"><strong>Fecha:</strong> {fechaSeleccionada && formatearFecha(fechaSeleccionada)}</p>
              <p className="text-sm text-sage-700"><strong>Hora:</strong> {horaSeleccionada}</p>
            </div>
            <Link href="/" className="inline-block bg-sage-500 text-white px-6 py-3 rounded-full hover:bg-sage-600">Volver al inicio</Link>
          </div>
        </div>
        <footer className="py-8 text-center text-sage-400 text-sm"><p>hecho con ❤️ por Duendes 2026</p></footer>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-cream-50">
      <nav className="bg-white border-b border-sage-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold text-sage-700">🌿 Psicóloga</Link>
          <Link href="/" className="text-sage-600 hover:text-sage-800">← Volver</Link>
        </div>
      </nav>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-sage-800 mb-4">Agenda tu cita</h1>
          <p className="text-gray-600">Selecciona tipo, fecha y horario</p>
        </div>
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((p) => (
              <div key={p} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${paso >= p ? 'bg-sage-500 text-white' : 'bg-sage-100 text-sage-400'}`}>{p}</div>
                {p < 3 && <div className={`w-12 h-1 ${paso > p ? 'bg-sage-500' : 'bg-sage-100'}`} />}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {paso === 1 && (
            <div>
              <h2 className="text-xl font-semibold text-sage-700 mb-6">1. Tipo de consulta</h2>
              <div className="grid gap-4">
                {tiposCita.map((tipo) => (
                  <button key={tipo.id} onClick={() => setTipoCita(tipo.id)} className={`p-4 rounded-xl border-2 text-left transition ${tipoCita === tipo.id ? 'border-sage-500 bg-sage-50' : 'border-sage-100 hover:border-sage-200'}`}>
                    <div className="flex justify-between items-start">
                      <div><h3 className="font-semibold text-sage-800">{tipo.nombre}</h3><p className="text-sm text-gray-500">{tipo.duracion}</p></div>
                      <span className={`text-sm font-semibold ${tipo.precio === 'Gratis' ? 'text-green-600' : 'text-sage-600'}`}>{tipo.precio}</span>
                    </div>
                  </button>
                ))}
              </div>
              <button onClick={() => setPaso(2)} className="w-full mt-6 bg-sage-500 text-white py-3 rounded-full font-medium hover:bg-sage-600">Continuar</button>
            </div>
          )}
          {paso === 2 && (
            <div>
              <h2 className="text-xl font-semibold text-sage-700 mb-6">2. Fecha y hora</h2>
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-3">Selecciona un día:</p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {dias.map((dia, i) => (
                    <button key={i} onClick={() => setFechaSeleccionada(dia)} className={`flex-shrink-0 px-4 py-3 rounded-xl border-2 text-center ${fechaSeleccionada?.toDateString() === dia.toDateString() ? 'border-sage-500 bg-sage-50' : 'border-sage-100 hover:border-sage-200'}`}>
                      <p className="text-xs text-gray-500">{dia.toLocaleDateString('es-MX', { weekday: 'short' })}</p>
                      <p className="text-lg font-semibold text-sage-700">{dia.getDate()}</p>
                      <p className="text-xs text-gray-500">{dia.toLocaleDateString('es-MX', { month: 'short' })}</p>
                    </button>
                  ))}
                </div>
              </div>
              {fechaSeleccionada && (
                <div>
                  <p className="text-sm text-gray-500 mb-3">Horarios disponibles:</p>
                  <div className="grid grid-cols-4 gap-2">
                    {horarios.map((hora) => (
                      <button key={hora} onClick={() => setHoraSeleccionada(hora)} className={`py-3 rounded-lg border-2 text-center ${horaSeleccionada === hora ? 'border-sage-500 bg-sage-50 text-sage-700' : 'border-sage-100 hover:border-sage-200 text-gray-600'}`}>{hora}</button>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex gap-4 mt-6">
                <button onClick={() => setPaso(1)} className="flex-1 border-2 border-sage-200 text-sage-700 py-3 rounded-full font-medium hover:bg-sage-50">Atrás</button>
                <button onClick={() => setPaso(3)} disabled={!fechaSeleccionada || !horaSeleccionada} className="flex-1 bg-sage-500 text-white py-3 rounded-full font-medium hover:bg-sage-600 disabled:opacity-50">Continuar</button>
              </div>
            </div>
          )}
          {paso === 3 && (
            <div>
              <h2 className="text-xl font-semibold text-sage-700 mb-6">3. Tus datos</h2>
              <div className="space-y-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label><input type="text" value={datos.nombre} onChange={(e) => setDatos({...datos, nombre: e.target.value})} className="w-full px-4 py-3 border border-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-500" placeholder="Tu nombre" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Email *</label><input type="email" value={datos.email} onChange={(e) => setDatos({...datos, email: e.target.value})} className="w-full px-4 py-3 border border-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-500" placeholder="tu@email.com" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label><input type="tel" value={datos.telefono} onChange={(e) => setDatos({...datos, telefono: e.target.value})} className="w-full px-4 py-3 border border-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-500" placeholder="+52 33 1234 5678" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Notas (opcional)</label><textarea value={datos.notas} onChange={(e) => setDatos({...datos, notas: e.target.value})} className="w-full px-4 py-3 border border-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-500" rows={3} placeholder="Motivo de consulta..." /></div>
              </div>
              <div className="bg-sage-50 rounded-xl p-4 mt-6">
                <h3 className="font-semibold text-sage-700 mb-2">Resumen:</h3>
                <p className="text-sm text-sage-600">📋 {tiposCita.find(t => t.id === tipoCita)?.nombre}</p>
                <p className="text-sm text-sage-600">📅 {fechaSeleccionada && formatearFecha(fechaSeleccionada)}</p>
                <p className="text-sm text-sage-600">🕐 {horaSeleccionada}</p>
                <p className="text-sm text-sage-600 font-semibold mt-2">💰 {tiposCita.find(t => t.id === tipoCita)?.precio}</p>
              </div>
              <div className="flex gap-4 mt-6">
                <button onClick={() => setPaso(2)} className="flex-1 border-2 border-sage-200 text-sage-700 py-3 rounded-full font-medium hover:bg-sage-50">Atrás</button>
                <button onClick={handleConfirmar} disabled={!datos.nombre || !datos.email || !datos.telefono} className="flex-1 bg-sage-500 text-white py-3 rounded-full font-medium hover:bg-sage-600 disabled:opacity-50">Confirmar</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <footer className="py-8 text-center text-sage-400 text-sm"><p>hecho con ❤️ por Duendes 2026</p></footer>
    </main>
  )
}
