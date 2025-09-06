import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getServiceById } from '@/lib/services';
import { randomUUID } from 'crypto';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const json = await req.json();

    const schema = z.object({
      service_id: z.string().min(1),
      payment_reference: z.string().min(1),
      amount: z.number().positive().optional(),
      customer_name: z.string().min(1),
      customer_surname: z.string().min(1),
      customer_email: z.string().email(),
      customer_phone_number: z.string().min(1),
      customer_address: z.string().min(1),
      customer_city: z.string().min(1),
      customer_country: z.string().min(1),
      customer_state: z.string().min(1),
      customer_zip_code: z.string().min(1),
    });

    const input = schema.parse(json);

    const service = getServiceById(input.service_id);
    if (!service) {
      return NextResponse.json({ error: 'Invalid service' }, { status: 400 });
    }

    // Determine amount: fixed for known services, from input for custom
    let amount: number;
    if (service.id === 'custom') {
      if (!input.amount || input.amount <= 0) {
        return NextResponse.json({ error: 'Invalid amount for custom service' }, { status: 400 });
      }
      amount = input.amount;
    } else {
      amount = service.amount;
    }

    if (!process.env.CINETPAY_APIKEY || !process.env.CINETPAY_SITE_ID) {
      return NextResponse.json({ error: 'CinetPay configuration missing' }, { status: 500 });
    }

    // Generate robust transaction ID on server
    // CinetPay accepts string transaction identifiers; use a short UUID without dashes
    const transaction_id = randomUUID().replace(/-/g, '');

    // Build base URL for redirects/notifications
    const originHeader = req.headers.get('origin');
    const host = req.headers.get('host');
    const proto = req.headers.get('x-forwarded-proto') || 'http';
    const origin = originHeader || (host ? `${proto}://${host}` : (process.env.SITE_URL || 'http://localhost:3000'));

    const description = service.name || 'Paiement de service';

    const payload = {
      apikey: process.env.CINETPAY_APIKEY!,
      site_id: process.env.CINETPAY_SITE_ID!,
      transaction_id,
      amount,
      currency: 'XOF',
      channels: 'ALL',
      description,
      return_url: `${origin}/payment/confirmation?transaction_id=${transaction_id}`,
      cancel_url: `${origin}/payment/cancel?transaction_id=${transaction_id}`,
      notify_url: `${origin}/api/cinetpay-notification`,
      customer_name: input.customer_name,
      customer_surname: input.customer_surname,
      customer_email: input.customer_email,
      customer_phone_number: input.customer_phone_number,
      customer_address: input.customer_address,
      customer_city: input.customer_city,
      customer_country: input.customer_country,
      customer_state: input.customer_state,
      customer_zip_code: input.customer_zip_code,
    };

    const response = await fetch('https://api-checkout.cinetpay.com/v2/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.code === '201' && data.data && data.data.payment_url) {
      return NextResponse.json({ payment_url: data.data.payment_url, transaction_id });
    } else {
      console.error('CinetPay API Error:', data);
      return NextResponse.json(
        { error: 'Failed to create payment link', details: data.message || data },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error creating CinetPay checkout:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
