import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.formData();
    const transactionId = (body.get('cpm_trans_id') || body.get('transaction_id')) as string;

    if (!transactionId) {
      return NextResponse.json({ status: 'error', message: 'Transaction ID not provided' }, { status: 400 });
    }

    const response = await fetch('https://api-checkout.cinetpay.com/v2/payment/check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            apikey: process.env.CINETPAY_APIKEY!,
            site_id: process.env.CINETPAY_SITE_ID!,
            transaction_id: transactionId
        })
    });

    const data = await response.json();

    console.log('CinetPay checkPayStatus response:', data);

    if (data.code === '00') {
      // Payment is successful
      // Here you can update your database, deliver the product, etc.
      console.log('Payment successful for transaction:', transactionId);
    } else {
      // Payment failed or is pending
      console.log('Payment not successful for transaction:', transactionId, 'Status:', data.message);
    }

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Error handling CinetPay notification:', error);
    return NextResponse.json({ status: 'error', message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
    // CinetPay pings the URL to check availability
    return NextResponse.json({ status: 'success' });
}
