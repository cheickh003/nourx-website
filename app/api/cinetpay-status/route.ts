import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const transaction_id = searchParams.get('transaction_id') || searchParams.get('id');

    if (!transaction_id) {
      return NextResponse.json({ error: 'transaction_id is required' }, { status: 400 });
    }

    if (!process.env.CINETPAY_APIKEY || !process.env.CINETPAY_SITE_ID) {
      return NextResponse.json({ error: 'CinetPay configuration missing' }, { status: 500 });
    }

    const response = await fetch('https://api-checkout.cinetpay.com/v2/payment/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apikey: process.env.CINETPAY_APIKEY!,
        site_id: process.env.CINETPAY_SITE_ID!,
        transaction_id,
      })
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error checking CinetPay status:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

