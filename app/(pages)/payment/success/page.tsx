import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const PaymentSuccessPage = () => {
  return (
    <div className="container mx-auto py-10 text-center pt-24 sm:pt-32 pb-16">
      <h1 className="text-3xl font-bold">Traitement du paiement</h1>
      <p className="mt-4 text-lg">Votre paiement est en cours de traitement. Vous recevrez une confirmation bientôt.</p>
      <p className="mt-2 text-sm text-gray-500">Vous pouvez fermer cette page en toute sécurité.</p>
      <Button asChild className="mt-8">
        <Link href="/">Retour à l'accueil</Link>
      </Button>
    </div>
  );
};

export default PaymentSuccessPage;
