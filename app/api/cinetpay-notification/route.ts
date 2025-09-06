import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

    const isSuccess = data.code === '00';
    const statusMessage = data.message || (isSuccess ? 'Paiement confirmé' : 'Paiement non confirmé');
    const cpData = data.data || {};
    const amount = cpData.amount || cpData.cpm_amount || null;
    const currency = cpData.currency || cpData.cpm_currency || 'XOF';

    // Log status
    if (isSuccess) {
      console.log('Payment successful for transaction:', transactionId);
    } else {
      console.log('Payment not successful for transaction:', transactionId, 'Status:', data.message);
    }

    // Optional: send email notification to admins
    try {
      if (!process.env.NOURX_EMAIL_PASSWORD) {
        console.warn('Email not sent: NOURX_EMAIL_PASSWORD missing');
      } else {
        const transporter = nodemailer.createTransport({
          host: 'mail.spacemail.com',
          port: 465,
          secure: true,
          auth: {
            user: 'no-reply@nourx.dev',
            pass: process.env.NOURX_EMAIL_PASSWORD,
          },
        });

        const subject = isSuccess
          ? `✅ Paiement confirmé - Transaction ${transactionId}`
          : `⚠️ Paiement non confirmé - Transaction ${transactionId}`;

        const amountLine = amount ? `${Number(amount).toLocaleString()} ${currency}` : 'N/A';

        const htmlContent = `
          <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
            <div style="background-color: white; border-radius: 12px; padding: 24px;">
              <h2 style="margin-top:0;">${subject}</h2>
              <p><strong>ID Transaction:</strong> <code>${transactionId}</code></p>
              <p><strong>Montant:</strong> ${amountLine}</p>
              <p><strong>Statut:</strong> ${statusMessage} (code: ${data.code || '—'})</p>
            </div>
          </div>`;

        const textContent = `
${subject}
ID Transaction: ${transactionId}
Montant: ${amountLine}
Statut: ${statusMessage} (code: ${data.code || '—'})
`;

        const adminEmails = ['cheickh.keita@outlook.fr', 'cheickh@nourx.dev'];
        await Promise.all(
          adminEmails.map((email) =>
            transporter.sendMail({
              from: '"Nourx Notifications" <no-reply@nourx.dev>',
              to: email,
              subject,
              text: textContent,
              html: htmlContent,
            })
          )
        );
      }
    } catch (mailErr) {
      console.error('Error sending status email:', mailErr);
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
