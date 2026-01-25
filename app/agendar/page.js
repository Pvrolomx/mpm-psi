'use client'

import { useState } from 'react'
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isBefore, startOfDay } from 'date-fns'
import { es } from 'date-fns/locale'
import Link from 'next/link'

const servicios = [
  { id: '1', nombre: 'Psicoterapia para Niños', precio: 800, duracion: 50 },
  { id: '2', nombre: 'Psicoterapia para Adolescentes', precio: 800, duracion: 50 },
  { id: '3', nombre: 'Psicoterapia para Adultos', precio: 800, duracion: 50 },
]

// Horarios: 09:00-14:00 y 16:00-18:00
const horariosDisponibles = ['09:00', '10:00', '11:00', '12:00', '13:00', '16:00', '17:00', '18:00']

export default function AgendarPage() {
  const [servicioId, setServicioId] = useState('')
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '' })
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)

  const servicio = servicios.find(s => s.id === servicioId)

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  })

  // Obtener el primer día del mes para el offset
  const firstDayOfMonth = startOfMonth(currentMonth).getDay()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!servicio || !selectedDate || !selectedTime) return

    setLoading(true)
    try {
      const res = await fetch('/api/citas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          servicio_id: servicioId,
          servicio_nombre: servicio.nombre,
          fecha: format(selectedDate, 'yyyy-MM-dd'),
          hora: selectedTime,
          monto: servicio.precio,
          ...formData,
        }),
      })
      const data = await res.json()
      if (data.init_point) {
        window.location.href = data.init_point
      } else if (data.error) {
        alert('Error: ' + data.error)
      }
    } catch (error) {
      console.error(error)
      alert('Error al procesar. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  // Función para verificar si es día laboral (Lun-Vie)
  const isWorkday = (date) => {
    const day = date.getDay()
    return day >= 1 && day <= 5 // Lunes = 1, Viernes = 5
  }

  return (
    <main className="min-h-screen bg-cream-50">
      {/* Header */}
      <header className="bg-sage-600 text-white py-4 px-4">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-lg font-semibold">
            ← Psic. Mariela Plácito
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-sage-700 mb-2 text-center">
          Agendar Cita
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Selecciona el servicio, fecha y hora de tu preferencia
        </p>

        {/* Paso 1: Servicio */}
        {step === 1 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-sage-700 mb-4">1. Selecciona el servicio</h2>
            <div className="grid gap-3">
              {servicios.map((s) => (
                <button
                  key={s.id}
                  onClick={() => { setServicioId(s.id); setStep(2) }}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    servicioId === s.id
                      ? 'border-sage-500 bg-sage-50'
                      : 'border-gray-200 bg-white hover:border-sage-300'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sage-800">{s.nombre}</span>
                    <span className="text-sage-600 font-bold">${s.precio} MXN</span>
                  </div>
                  <span className="text-sm text-gray-500">{s.duracion} minutos</span>
                </button>
              ))}
            </div>
            
            <p className="text-center text-gray-500 text-sm mt-6">
              ¿Buscas otro servicio?{' '}
              <a 
                href="https://wa.me/523221118596?text=Hola%20Mariela,%20me%20gustaría%20información%20sobre%20otros%20servicios"
                target="_blank"
                className="text-sage-600 underline"
              >
                Contáctame por WhatsApp
              </a>
            </p>
          </section>
        )}

        {/* Paso 2: Fecha */}
        {step === 2 && servicio && (
          <section className="mb-8">
            <button onClick={() => setStep(1)} className="text-sage-600 mb-4 hover:underline">
              ← Cambiar servicio
            </button>
            <div className="mb-4 p-3 bg-sage-50 rounded-xl border border-sage-200">
              <strong className="text-sage-700">{servicio.nombre}</strong>
              <span className="text-sage-600 ml-2">${servicio.precio} MXN</span>
            </div>
            <h2 className="text-xl font-semibold text-sage-700 mb-4">2. Selecciona la fecha</h2>
            
            {/* Calendar */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={() => setCurrentMonth(addDays(startOfMonth(currentMonth), -1))}
                  className="p-2 hover:bg-sage-50 rounded-lg text-sage-600"
                >
                  ← Anterior
                </button>
                <span className="font-semibold text-sage-800 capitalize">
                  {format(currentMonth, 'MMMM yyyy', { locale: es })}
                </span>
                <button
                  onClick={() => setCurrentMonth(addDays(endOfMonth(currentMonth), 1))}
                  className="p-2 hover:bg-sage-50 rounded-lg text-sage-600"
                >
                  Siguiente →
                </button>
              </div>
              
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'].map(d => (
                  <div key={d} className="p-2 text-gray-500 font-medium">{d}</div>
                ))}
                
                {/* Espacios vacíos para alinear el primer día */}
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={`empty-${i}`} className="p-2"></div>
                ))}
                
                {days.map((day, i) => {
                  const isPast = isBefore(day, startOfDay(new Date()))
                  const isSelected = selectedDate && format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
                  const isWeekend = !isWorkday(day) // Sábado y Domingo
                  const disabled = isPast || isWeekend || !isSameMonth(day, currentMonth)
                  
                  return (
                    <button
                      key={i}
                      disabled={disabled}
                      onClick={() => { setSelectedDate(day); setStep(3) }}
                      className={`p-2 rounded-lg transition-all ${
                        disabled
                          ? 'text-gray-300 cursor-not-allowed'
                          : isSelected
                          ? 'bg-sage-500 text-white font-bold'
                          : isToday(day)
                          ? 'bg-sage-100 text-sage-700 font-bold'
                          : 'hover:bg-sage-50 text-sage-800'
                      }`}
                    >
                      {format(day, 'd')}
                    </button>
                  )
                })}
              </div>
              
              <p className="text-center text-gray-400 text-xs mt-4">
                Disponible de lunes a viernes
              </p>
            </div>
          </section>
        )}

        {/* Paso 3: Hora */}
        {step === 3 && selectedDate && (
          <section className="mb-8">
            <button onClick={() => setStep(2)} className="text-sage-600 mb-4 hover:underline">
              ← Cambiar fecha
            </button>
            <div className="mb-4 p-3 bg-sage-50 rounded-xl border border-sage-200">
              <strong className="text-sage-700">{servicio?.nombre}</strong>
              <br/>
              <span className="text-sage-600 capitalize">
                {format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-sage-700 mb-4">3. Selecciona la hora</h2>
            
            <div className="mb-2 text-sm text-gray-500">Mañana (9:00 - 14:00)</div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {horariosDisponibles.filter(h => parseInt(h) < 15).map((hora) => (
                <button
                  key={hora}
                  onClick={() => { setSelectedTime(hora); setStep(4) }}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    selectedTime === hora
                      ? 'border-sage-500 bg-sage-500 text-white'
                      : 'border-gray-200 bg-white hover:border-sage-300'
                  }`}
                >
                  {hora}
                </button>
              ))}
            </div>
            
            <div className="mb-2 text-sm text-gray-500">Tarde (16:00 - 18:00)</div>
            <div className="grid grid-cols-3 gap-2">
              {horariosDisponibles.filter(h => parseInt(h) >= 15).map((hora) => (
                <button
                  key={hora}
                  onClick={() => { setSelectedTime(hora); setStep(4) }}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    selectedTime === hora
                      ? 'border-sage-500 bg-sage-500 text-white'
                      : 'border-gray-200 bg-white hover:border-sage-300'
                  }`}
                >
                  {hora}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Paso 4: Datos */}
        {step === 4 && selectedTime && (
          <section>
            <button onClick={() => setStep(3)} className="text-sage-600 mb-4 hover:underline">
              ← Cambiar hora
            </button>
            <div className="mb-4 p-3 bg-sage-50 rounded-xl border border-sage-200">
              <strong className="text-sage-700">{servicio?.nombre}</strong>
              <br/>
              <span className="text-sage-600 capitalize">
                {format(selectedDate, "EEEE d 'de' MMMM", { locale: es })} a las {selectedTime}
              </span>
              <br/>
              <span className="text-sage-500 font-bold">${servicio?.precio} MXN</span>
            </div>
            <h2 className="text-xl font-semibold text-sage-700 mb-4">4. Tus datos</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nombre completo"
                required
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="w-full p-3 rounded-xl border border-gray-300 focus:border-sage-500 focus:ring-1 focus:ring-sage-500 outline-none"
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 rounded-xl border border-gray-300 focus:border-sage-500 focus:ring-1 focus:ring-sage-500 outline-none"
              />
              <input
                type="tel"
                placeholder="Teléfono (WhatsApp)"
                required
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                className="w-full p-3 rounded-xl border border-gray-300 focus:border-sage-500 focus:ring-1 focus:ring-sage-500 outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-sage-500 text-white py-4 rounded-xl font-semibold hover:bg-sage-600 transition disabled:opacity-50"
              >
                {loading ? 'Procesando...' : `Pagar $${servicio?.precio} MXN`}
              </button>
              <p className="text-center text-gray-400 text-xs">
                Serás redirigido a Mercado Pago para completar el pago
              </p>
            </form>
          </section>
        )}
      </div>
    </main>
  )
}
