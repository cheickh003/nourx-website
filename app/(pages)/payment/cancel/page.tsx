import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { XCircle, Home, RotateCcw } from 'lucide-react';

const PaymentCancelPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500/10 to-background pt-24 sm:pt-32 pb-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex p-6 bg-red-100 rounded-full mb-6">
          <XCircle className="w-16 h-16 text-red-600" />
        </div>

        <div className="bg-card rounded-2xl shadow-lg border border-border p-8 sm:p-12 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Paiement annulé</h1>
          <p className="text-muted-foreground mb-8">Votre paiement a été annulé. Vous pouvez réessayer à tout moment.</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-nourx-black hover:bg-nourx-gray-800">
              <Link href="/" className="inline-flex items-center gap-2">
                <Home className="w-4 h-4" />
                Retour à l’accueil
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/payment" className="inline-flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                Réessayer le paiement
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelPage;

