export default function CGVPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-32 pb-12 px-4">
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Conditions Générales</h1>
          <p className="text-nourx-gray-600 text-lg">
            Les présentes conditions générales encadrent l’utilisation du site et les prestations proposées par Nourx.
          </p>
        </div>
      </section>

      {/* Identité du prestataire */}
      <section className="px-4 pb-6">
        <div className="container max-w-4xl mx-auto bg-nourx-gray-50 border border-nourx-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">1. Identité du prestataire</h2>
          <div className="text-nourx-gray-700 space-y-1">
            <p><span className="font-medium">Dénomination:</span> Nourx</p>
            <p><span className="font-medium">Forme:</span> SARLU</p>
            <p><span className="font-medium">RCCM:</span> CI-ABJ-03-2024-B13-06702</p>
            <p><span className="font-medium">Capital social:</span> 500 000 FCFA (cinq cent mille)</p>
            <p><span className="font-medium">Siège social:</span> Abidjan Cocody Riviera golf, cité Riviera Beach, non loin du nouveau siège d'Orange CI, Lot 63 Ilot 6.</p>
            <p><span className="font-medium">Directeur de la publication:</span> KEITA CHEICKH MOHAMED LAMINE NOUREDINE — Gérant</p>
            <p><span className="font-medium">Contact:</span> <a className="text-nourx-blue" href="mailto:contact@nourx.dev">contact@nourx.dev</a> · <a className="text-nourx-blue" href="tel:+2250720111108">+225 07 20 11 11 08</a></p>
          </div>
        </div>
      </section>

      {/* CGU/CGV */}
      <section className="pb-20 px-4">
        <div className="container max-w-4xl mx-auto space-y-10 text-nourx-gray-700">
          <div>
            <h2 className="text-2xl font-semibold mb-3">2. Objet et champ d’application</h2>
            <p>
              Les présentes Conditions Générales (CG) régissent: (i) l’utilisation du site web nourx.dev (CGU) et
              (ii) les prestations de services de Nourx (CGV). Toute commande implique l’adhésion sans réserve aux CG.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">3. Prestations</h2>
            <p>
              Conseil et stratégie digitale, développement web et mobile, ERP/CRM, IA, DevOps & Cloud, marketing digital,
              infogérance et formation. Le périmètre exact est défini dans les devis/commandes.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">4. Devis, commande et acceptation</h2>
            <p>
              Les prestations font l’objet d’un devis précisant la portée, les délais et le prix. La commande est ferme à
              réception de l’acceptation (signature électronique/manuscrite, bon pour accord, paiement d’acompte le cas échéant).
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">5. Prix et paiement</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Les prix sont exprimés en FCFA (XOF), hors taxes et frais, sauf mention contraire.</li>
              <li>Facturation selon devis (forfait/TJM), acompte éventuel, solde à livraison ou à l’échéance convenue.</li>
              <li>Retard de paiement: pénalités légales et indemnité de recouvrement applicables; suspension des services possible.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">6. Délais et livrables</h2>
            <p>
              Les délais sont indicatifs hors cas de force majeure et dépendent notamment de la fourniture par le Client
              des éléments nécessaires et de la validation des étapes clés.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">7. Obligations du Client</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fournir en temps utile les informations, accès et contenus requis; garantir la licéité des contenus fournis.</li>
              <li>Désigner un interlocuteur; valider les livrables dans des délais raisonnables.</li>
              <li>Respecter les conditions de licence des logiciels tiers fournis ou recommandés.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">8. Propriété intellectuelle</h2>
            <p>
              Sauf stipulation contraire, les développements spécifiques sont cédés ou concédés selon les termes du devis.
              Les outils, frameworks et briques préexistants de Nourx restent sa propriété. Le Client bénéficie d’un droit
              d’utilisation conforme à la destination convenue.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">9. Confidentialité</h2>
            <p>
              Les parties s’engagent à conserver confidentielles les informations non publiques échangées dans le cadre du
              projet, pendant la durée de la relation et 3 ans après son terme.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">10. Données personnelles</h2>
            <p>
              Le traitement des données personnelles est décrit dans notre
              {' '}<a className="text-nourx-blue" href="/politique-de-confidentialite">Politique de confidentialité</a>.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">11. Garanties et responsabilité</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Nourx met en œuvre les moyens conformes aux règles de l’art; obligation de moyens, sauf stipulation expresse.</li>
              <li>La responsabilité est limitée aux dommages directs, prouvés, à hauteur du montant payé au titre de la commande concernée.</li>
              <li>Exclusion: dommages indirects, pertes de données ou d’exploitation, cas de mauvaise utilisation par le Client.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">12. Support et maintenance</h2>
            <p>
              Les prestations de support/infogérance font l’objet d’un contrat séparé (SLA) précisant plages de support,
              délais de prise en charge et de rétablissement.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">13. Force majeure</h2>
            <p>
              La responsabilité des parties ne saurait être engagée en cas de survenance d’un événement imprévisible,
              irrésistible et extérieur empêchant l’exécution de leurs obligations.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">14. Résiliation</h2>
            <p>
              En cas de manquement grave non réparé après mise en demeure restée sans effet, chaque partie peut résilier
              la commande de plein droit, sans préjudice des sommes dues pour les prestations réalisées.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">15. Droit applicable et juridiction</h2>
            <p>
              Les présentes CG sont régies par le droit de la Côte d’Ivoire. Tout litige relève des juridictions compétentes d’Abidjan,
              sauf dispositions d’ordre public contraires.
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

