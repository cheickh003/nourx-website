"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Clock, Shield, Home, RefreshCcw } from 'lucide-react';

type CinetPayStatus = {
  code?: string;
  message?: string;
  data?: any;
};

const PaymentConfirmationPage = () => {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get('transaction_id') || '';

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<CinetPayStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = async () => {
    if (!transactionId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/cinetpay-status?transaction_id=${encodeURIComponent(transactionId)}`, { cache: 'no-store' });
      const data = await res.json();
      setStatus(data);
    } catch (e) {
      setError('Impossible de vérifier le statut du paiement pour le moment.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionId]);

  const isSuccess = status?.code === '00';
  const isPending = status?.code === '201' || status?.message?.toLowerCase().includes('pending') || status?.message?.toLowerCase().includes('en attente');
  const isFailure = !loading && !isSuccess && !isPending;

  return (
    <div className="min-h-screen bg-gradient-to-br from-nourx-gray-50 to-white pt-24 sm:pt-32 pb-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-lg border border-nourx-gray-200 p-8 sm:p-12 mb-8">
          {loading ? (
            <>
              <div className="inline-flex p-6 bg-blue-100 rounded-full mb-6">
                <Clock className="w-16 h-16 text-blue-600 animate-pulse" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-nourx-black mb-4">Vérification du paiement...</h1>
              <p className="text-nourx-gray-600">Nous vérifions le statut de votre transaction.</p>
            </>
          ) : isSuccess ? (
            <>
              <div className="inline-flex p-6 bg-green-100 rounded-full mb-6">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-nourx-black mb-4">Paiement confirmé</h1>
              <p className="text-nourx-gray-600">Votre paiement a été validé avec succès.</p>
            </>
          ) : isPending ? (
            <>
              <div className="inline-flex p-6 bg-blue-100 rounded-full mb-6">
                <Clock className="w-16 h-16 text-blue-600" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-nourx-black mb-4">Paiement en cours</h1>
              <p className="text-nourx-gray-600">Le traitement peut prendre quelques minutes.</p>
            </>
          ) : (
            <>
              <div className="inline-flex p-6 bg-red-100 rounded-full mb-6">
                <XCircle className="w-16 h-16 text-red-600" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-nourx-black mb-4">Paiement non confirmé</h1>
              <p className="text-nourx-gray-600">{error || status?.message || 'Le paiement n’a pas pu être confirmé.'}</p>
            </>
          )}

          {/* Transaction info */}
          {transactionId && (
            <div className="mt-6 text-sm text-nourx-gray-600">
              <p>ID transaction:</p>
              <p className="font-mono text-nourx-gray-800">{transactionId}</p>
            </div>
          )}

          <div className="bg-nourx-gray-50 rounded-xl p-6 mt-8">
            <div className="flex items-center gap-2 justify-center text-sm text-nourx-gray-600">
              <Shield className="w-4 h-4" />
              <span>Transaction protégée par CinetPay</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Button asChild className="bg-nourx-black hover:bg-nourx-gray-800">
              <Link href="/" className="inline-flex items-center gap-2">
                <Home className="w-4 h-4" />
                Retour à l’accueil
              </Link>
            </Button>
            <Button variant="outline" onClick={fetchStatus} className="inline-flex items-center gap-2">
              <RefreshCcw className="w-4 h-4" />
              Actualiser le statut
            </Button>
          </div>
        </div>
        <p className="text-sm text-nourx-gray-500">
          En cas de problème, contactez notre équipe support via{' '}
          <a href="mailto:support@nourx.dev" className="text-nourx-blue hover:underline">support@nourx.dev</a>
        </p>
      </div>
    </div>
  );
};

export default PaymentConfirmationPage;

