import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch('https://api-checkout.cinetpay.com/v2/payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            apikey: process.env.CINETPAY_APIKEY!,
            site_id: process.env.CINETPAY_SITE_ID!,
            ...body
        })
    });

    const data = await response.json();

    if (data.code === '00' && data.data && data.data.payment_url) {
        return NextResponse.json({ payment_url: data.data.payment_url });
    } else {
        console.error('CinetPay API Error:', data);
        return NextResponse.json({ error: 'Failed to create payment link', details: data.message }, { status: 500 });
    }

  } catch (error) {
    console.error('Error creating CinetPay checkout:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
