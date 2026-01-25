import { MercadoPagoConfig, Preference } from 'mercadopago'

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || 'TEST-ACCESS-TOKEN',
})

export const preference = new Preference(client)

export async function crearPreferencia(cita) {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://psicmarielapm.com'
  
  const pref = await preference.create({
    body: {
      items: [
        {
          id: cita.id,
          title: `Cita: ${cita.servicio_nombre}`,
          unit_price: cita.monto,
          quantity: 1,
          currency_id: 'MXN',
        },
      ],
      payer: {
        email: cita.cliente_email,
      },
      back_urls: {
        success: `${baseUrl}/confirmado?cita=${cita.id}`,
        failure: `${baseUrl}/agendar?error=pago`,
        pending: `${baseUrl}/confirmado?cita=${cita.id}&pending=1`,
      },
      notification_url: `${baseUrl}/api/webhook/mp`,
      external_reference: cita.id,
      auto_return: 'approved',
    },
  })
  return pref
}
