export type Service = {
  id: string;
  name: string;
  amount: number; // 0 means custom amount
  description: string;
};

export const SERVICES: Service[] = [
  {
    id: 'website-management',
    name: 'Frais de gestion mensuel site internet',
    amount: 150000,
    description: 'Maintenance et gestion mensuelle de votre site web',
  },
  {
    id: 'google-maps-api',
    name: 'Frais ajout Google Maps API',
    amount: 250000,
    description: 'Intégration et configuration de Google Maps sur votre site',
  },
  {
    id: 'custom',
    name: 'Montant personnalisé',
    amount: 0,
    description: 'Saisissez un montant personnalisé',
  },
];

export function getServiceById(id: string) {
  return SERVICES.find((s) => s.id === id);
}

export function isValidService(id: string) {
  return SERVICES.some((s) => s.id === id);
}

