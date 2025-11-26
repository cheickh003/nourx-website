import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { XCircle, Home, RotateCcw } from 'lucide-react';

const PaymentCancelPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white pt-24 sm:pt-32 pb-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex p-6 bg-red-100 rounded-full mb-6">
          <XCircle className="w-16 h-16 text-red-600" />
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-nourx-gray-200 p-8 sm:p-12 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-nourx-black mb-4">Paiement annulé</h1>
          <p className="text-nourx-gray-600 mb-8">Votre paiement a été annulé. Vous pouvez réessayer à tout moment.</p>

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

