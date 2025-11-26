export default function PolitiqueCookiesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-32 pb-12 px-4">
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Politique des cookies</h1>
          <p className="text-nourx-gray-600 text-lg">
            Cette politique décrit les cookies utilisés sur le site nourx.dev, leur finalité,
            et vos choix de paramétrage.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 px-4">
        <div className="container max-w-4xl mx-auto space-y-10 text-nourx-gray-700">
          <div>
            <h2 className="text-2xl font-semibold mb-3">1. Qu’est-ce qu’un cookie ?</h2>
            <p>
              Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, smartphone, tablette)
              lors de la consultation d’un site web. Il permet au site de reconnaître votre terminal, de mémoriser
              certaines informations et d’améliorer l’expérience utilisateur.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">2. Types de cookies utilisés</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="font-medium">Cookies strictement nécessaires</span>: indispensables au
                fonctionnement du site (sécurité, équilibrage de charge, sauvegarde de vos choix essentiels).
                Ils ne nécessitent pas de consentement.
              </li>
              <li>
                <span className="font-medium">Cookies de performance et de mesure d’audience</span>:
                permettent de mesurer l’utilisation du site (pages visitées, parcours, erreurs) de manière
                agrégée afin d’améliorer nos services. Nous privilégions des solutions respectueuses de la vie
                privée et sans suivi nominatif.
              </li>
              <li>
                <span className="font-medium">Cookies de fonctionnalité</span>: mémorisent vos préférences
                (ex: langue). Ils améliorent le confort d’utilisation.
              </li>
              <li>
                <span className="font-medium">Cookies publicitaires</span>: non utilisés par défaut sur ce site.
                Si nous devions en utiliser, votre consentement serait recueilli au préalable et cette politique
                serait mise à jour.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">3. Durée de conservation</h2>
            <p>
              La durée de vie des cookies varie selon leur finalité. Les cookies strictement nécessaires sont
              généralement de courte durée (session). Les cookies de mesure d’audience peuvent être conservés
              quelques mois au maximum, selon la configuration. Les durées exactes sont adaptées au principe de
              minimisation.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">4. Consentement</h2>
            <p>
              Lorsqu’il est requis par la réglementation, votre consentement est collecté via un mécanisme
              d’acceptation/refus clair. Vous pouvez à tout moment retirer votre consentement en modifiant vos
              préférences cookies.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">5. Paramétrer vos cookies</h2>
            <div className="space-y-2">
              <p>Vous pouvez gérer les cookies de plusieurs façons:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Depuis les réglages de votre navigateur (blocage/suppression des cookies).</li>
                <li>Via un bandeau ou un centre de préférences cookies lorsque disponible.</li>
              </ul>
              <p className="text-sm text-nourx-gray-500">
                Note: bloquer certains cookies strictement nécessaires peut dégrader le fonctionnement du site.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">6. Cookies tiers</h2>
            <p>
              Certains services intégrés (ex: solutions d’emailing ou d’envoi SMS, widgets) peuvent déposer des
              cookies pour leur propre fonctionnement. Nous limitons ces intégrations et privilégions des services
              respectueux de la vie privée. Si des cookies tiers sont activés, ils seront listés et soumis à votre
              consentement lorsque requis.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">7. Mise à jour</h2>
            <p>
              Cette politique peut être mise à jour pour refléter des évolutions techniques, légales ou
              organisationnelles. La date de mise à jour figure ci-dessous.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">8. Contact</h2>
            <p>
              Pour toute question sur les cookies: <a className="text-nourx-blue" href="mailto:contact@nourx.dev">contact@nourx.dev</a>
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

