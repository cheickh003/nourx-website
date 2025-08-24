export default function PolitiqueConfidentialitePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-32 pb-12 px-4">
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Politique de confidentialité</h1>
          <p className="text-nourx-gray-600 text-lg">
            Cette politique explique quelles données nous collectons, comment nous les utilisons,
            et quels sont vos droits.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 px-4">
        <div className="container max-w-4xl mx-auto space-y-10 text-nourx-gray-700">
          <div>
            <h2 className="text-2xl font-semibold mb-3">1. Responsable du traitement</h2>
            <p>
              <span className="font-medium">Nourx</span>, Cocody Riviera Golf, Cité Riviera Beach, Abidjan, Côte d&apos;Ivoire.
              Contact: <a className="text-nourx-blue" href="mailto:contact@nourx.dev">contact@nourx.dev</a> · Tél: <a className="text-nourx-blue" href="tel:+2250720111108">+225 07 20 11 11 08</a>.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">2. Données collectées</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Données d&apos;identité et de contact: nom, prénom, email, téléphone.</li>
              <li>Données professionnelles transmises via formulaires (objet, message, société).</li>
              <li>Données techniques et d&apos;usage du site (adresse IP, navigateur, pages consultées),
                limitées au strict nécessaire au fonctionnement et à la sécurité.</li>
              <li>Cookies et traceurs: voir notre <a className="text-nourx-blue" href="/politique-cookies">Politique des cookies</a>.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">3. Finalités</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Répondre à vos demandes de contact et vous recontacter.</li>
              <li>Établir des offres, exécuter nos prestations et assurer le support.</li>
              <li>Assurer la sécurité du site (prévention fraude/abus) et mesurer l&apos;usage de manière agrégée.</li>
              <li>Respecter nos obligations légales et réglementaires.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">4. Bases légales</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Votre <span className="font-medium">consentement</span> (ex: envoi volontaire d&apos;un formulaire).</li>
              <li><span className="font-medium">Exécution d&apos;un contrat</span> ou de mesures précontractuelles (devis, projet).</li>
              <li><span className="font-medium">Intérêt légitime</span> (sécurité, amélioration du service, prospection modérée B2B).</li>
              <li><span className="font-medium">Obligation légale</span> (comptabilité, conservation de certaines pièces).</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">5. Durées de conservation</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Prospects/contacts: jusqu&apos;à 3 ans après le dernier échange.</li>
              <li>Clients et documents contractuels: durée légale applicable (généralement 5 à 10 ans selon la nature).</li>
              <li>Logs techniques de sécurité: quelques mois maximum, sauf incident.</li>
              <li>Cookies: voir durées dans la <a className="text-nourx-blue" href="/politique-cookies">Politique des cookies</a>.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">6. Destinataires et transferts</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Équipe Nourx (accès limité au besoin) et prestataires techniques habilités (hébergement, email/SMS).
                Ces prestataires sont soumis à des engagements de confidentialité et de sécurité.</li>
              <li>Aucun transfert non autorisé à des tiers à des fins commerciales.</li>
              <li>Des transferts hors du pays peuvent exister (ex: envoi d&apos;emails via fournisseur international);
                dans ce cas, nous veillons à des garanties appropriées.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">7. Vos droits</h2>
            <p className="mb-2">Vous disposez des droits suivants, sous réserve des conditions légales applicables:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Accès, rectification, effacement de vos données.</li>
              <li>Limitation ou opposition au traitement; retrait du consentement lorsque applicable.</li>
              <li>Portabilité (pour les données fournies par vous, lorsque légalement applicable).</li>
            </ul>
            <p className="mt-2">
              Pour exercer vos droits: <a className="text-nourx-blue" href="mailto:contact@nourx.dev">contact@nourx.dev</a>.
              Nous pouvons vous demander une preuve d&apos;identité. Réponse sous un délai raisonnable.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">8. Sécurité</h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles adaptées (contrôle d&apos;accès,
              chiffrement en transit, sauvegardes, journalisation, principe du moindre privilège) pour protéger
              vos données contre la perte, l&apos;accès non autorisé et la divulgation.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">9. Cookies</h2>
            <p>
              Pour les cookies et technologies similaires, référez-vous à notre
              {' '}<a className="text-nourx-blue" href="/politique-cookies">Politique des cookies</a>.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">10. Mineurs</h2>
            <p>
              Nos services s&apos;adressent principalement à des professionnels. Si vous êtes un mineur, merci de ne
              soumettre des informations qu&apos;avec l&apos;accord d&apos;un représentant légal.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">11. Modifications</h2>
            <p>
              Nous pouvons mettre à jour la présente politique pour refléter des évolutions légales, techniques
              ou opérationnelles. La date de mise à jour figurera ci-dessous.
            </p>
          </div>

          <div className="pt-6 border-t border-nourx-gray-200">
            <p className="text-sm text-nourx-gray-500">Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}</p>
          </div>
        </div>
      </section>
    </main>
  )
}

