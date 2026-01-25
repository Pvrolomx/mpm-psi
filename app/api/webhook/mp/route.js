import { NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export async function POST(request) {
  try {
    const body = await request.json()
    console.log('Webhook MP recibido:', JSON.stringify(body))

    if (body.type === 'payment' && body.data?.id) {
      const paymentId = body.data.id
      
      // Obtener info del pago desde MP
      const mpRes = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
          },
        }
      )
      const payment = await mpRes.json()

      if (payment.status === 'approved') {
        const citaId = payment.external_reference
        console.log(`✅ Pago aprobado para cita: ${citaId}`)

        // Actualizar cita si hay Supabase
        if (isSupabaseConfigured()) {
          await supabase
            .from('citas')
            .update({
              estado: 'pagado',
              mp_payment_id: paymentId.toString(),
              paid_at: new Date().toISOString(),
            })
            .eq('id', citaId)
        }

        // TODO: Enviar emails con Resend
        // - Email a cliente confirmando cita
        // - Email a Mariela notificando nueva cita
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 })
  }
}
