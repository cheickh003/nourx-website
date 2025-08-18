import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const PaymentSuccessPage = () => {
  return (
    <div className="container mx-auto py-10 text-center pt-24 sm:pt-32 pb-16">
      <h1 className="text-3xl font-bold text-green-600">Paiement réussi !</h1>
      <p className="mt-4 text-lg">Merci pour votre paiement.</p>
      <Button asChild className="mt-8">
        <Link href="/payment">Faire un autre paiement</Link>
      </Button>
    </div>
  );
};

export default PaymentSuccessPage;
