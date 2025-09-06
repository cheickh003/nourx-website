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

    // Fixed production URLs for CinetPay redirects and notifications
    const baseUrl = 'https://nourx.dev';

    const description = service.name || 'Paiement de service';

    const payload = {
      apikey: process.env.CINETPAY_APIKEY!,
      site_id: process.env.CINETPAY_SITE_ID!,
      transaction_id,
      amount,
      currency: 'XOF',
      channels: 'ALL',
      description,
      return_url: `${baseUrl}/payment/confirmation?transaction_id=${transaction_id}`,
      cancel_url: `${baseUrl}/payment/cancel?transaction_id=${transaction_id}`,
      notify_url: `${baseUrl}/api/cinetpay-notification`,
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
