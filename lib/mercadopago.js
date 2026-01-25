export async function crearPreferencia(cita) {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://psicmarielapm.com'
  const accessToken = process.env.MP_ACCESS_TOKEN
  
  if (!accessToken) {
    throw new Error('MP_ACCESS_TOKEN no configurado')
  }
  
  const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
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
    }),
  })
  
  if (!response.ok) {
    const error = await response.text()
    throw new Error(`MP Error: ${error}`)
  }
  
  return response.json()
}
