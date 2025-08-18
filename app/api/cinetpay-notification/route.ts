import { NextResponse } from 'next/server';
const CinetPay = require('cinetpay-nodejs');

export async function POST(req: Request) {
  try {
    const body = await req.formData();
    const transactionId = body.get('cpm_trans_id') as string;
    const siteId = body.get('cpm_site_id') as string;

    if (!transactionId) {
      return NextResponse.json({ status: 'error', message: 'Transaction ID not provided' }, { status: 400 });
    }

    const cp = new CinetPay(process.env.CINETPAY_APIKEY!, process.env.CINETPAY_SITE_ID!, '');

    const response = await cp.checkPayStatus(transactionId);

    console.log('CinetPay checkPayStatus response:', response);

    if (response.code === '00') {
      // Payment is successful
      // Here you can update your database, deliver the product, etc.
      console.log('Payment successful for transaction:', transactionId);
    } else {
      // Payment failed or is pending
      console.log('Payment not successful for transaction:', transactionId, 'Status:', response.message);
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
