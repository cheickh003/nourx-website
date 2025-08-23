import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle, Home, Clock, Shield } from 'lucide-react';

const PaymentSuccessPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white pt-24 sm:pt-32 pb-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="inline-flex p-6 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
        </div>
        
        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-nourx-gray-200 p-8 sm:p-12 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-nourx-black mb-6">
            Paiement en cours de traitement
          </h1>
          
          <p className="text-lg sm:text-xl text-nourx-gray-600 mb-8 leading-relaxed">
            Votre paiement a été initié avec succès et est actuellement en cours de traitement.
          </p>
          
          {/* Status Cards */}
          <div className="grid gap-4 sm:gap-6 mb-8">
            <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-green-800">Paiement initié</p>
                <p className="text-sm text-green-600">Votre demande a été transmise avec succès</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-blue-800">En cours de traitement</p>
                <p className="text-sm text-blue-600">Vous recevrez une confirmation bientôt</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-nourx-gray-50 rounded-xl border border-nourx-gray-100">
              <div className="p-2 bg-nourx-gray-100 rounded-lg">
                <Shield className="w-5 h-5 text-nourx-gray-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-nourx-gray-800">Sécurisé</p>
                <p className="text-sm text-nourx-gray-600">Transaction protégée par CinetPay</p>
              </div>
            </div>
          </div>
          
          {/* Important Notice */}
          <div className="bg-nourx-gray-50 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-nourx-black mb-2">Que se passe-t-il ensuite ?</h3>
            <ul className="text-sm text-nourx-gray-600 space-y-2 text-left">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-nourx-blue rounded-full mt-2 flex-shrink-0"></span>
                Vous recevrez un email de confirmation
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-nourx-blue rounded-full mt-2 flex-shrink-0"></span>
                Le traitement peut prendre quelques minutes
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-nourx-blue rounded-full mt-2 flex-shrink-0"></span>
                Vous pouvez fermer cette page en toute sécurité
              </li>
            </ul>
          </div>
          
          {/* Action Button */}
          <Button asChild className="w-full sm:w-auto bg-nourx-black hover:bg-nourx-gray-800 transition-all duration-300 hover:scale-105">
            <Link href="/" className="inline-flex items-center gap-2 px-8 py-3">
              <Home className="w-4 h-4" />
              Retour à l'accueil
            </Link>
          </Button>
        </div>
        
        {/* Footer Note */}
        <p className="text-sm text-nourx-gray-500">
          En cas de problème, contactez notre équipe support via{' '}
          <a href="mailto:support@nourx.dev" className="text-nourx-blue hover:underline">
            support@nourx.dev
          </a>
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
