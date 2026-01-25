import { NextResponse } from 'next/server'
import { crearPreferencia } from '@/lib/mercadopago'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export async function POST(request) {
  try {
    const body = await request.json()
    const { servicio_id, servicio_nombre, fecha, hora, monto, nombre, email, telefono } = body

    let citaId = `cita_${Date.now()}`

    // Si Supabase está configurado, guardar la cita
    if (isSupabaseConfigured()) {
      const { data: cita, error } = await supabase
        .from('citas')
        .insert({
          servicio_id,
          fecha,
          hora,
          cliente_nombre: nombre,
          cliente_email: email,
          cliente_telefono: telefono,
          monto,
          estado: 'pendiente',
        })
        .select()
        .single()

      if (!error && cita) {
        citaId = cita.id
      }
    }

    // Crear preferencia de pago en Mercado Pago
    const pref = await crearPreferencia({
      id: citaId,
      servicio_nombre,
      monto,
      cliente_email: email,
    })

    // Si hay Supabase, actualizar con preference_id
    if (isSupabaseConfigured()) {
      await supabase
        .from('citas')
        .update({ mp_preference_id: pref.id })
        .eq('id', citaId)
    }

    return NextResponse.json({ 
      cita_id: citaId, 
      init_point: pref.init_point 
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Error al procesar la cita: ' + error.message },
      { status: 500 }
    )
  }
}
