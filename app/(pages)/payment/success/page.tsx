import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const PaymentSuccessPage = () => {
  return (
    <div className="container mx-auto py-10 text-center">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-4 text-lg">Thank you for your payment.</p>
      <Button asChild className="mt-8">
        <Link href="/payment">Make another payment</Link>
      </Button>
    </div>
  );
};

export default PaymentSuccessPage;
