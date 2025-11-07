import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nourx.dev'
const LOGO_URL = `${SITE_URL}/logo-nourx.png`

interface AdminEmailData {
  jobTitle: string
  fullName: string
  email: string
  phone: string
  education: string
  experience: string
  availability: string
  location: string
  motivation: string
  uploadedFiles: Array<{ name: string; url: string }>
}

interface CandidateEmailData {
  fullName: string
  jobTitle: string
  availability: string
}

export function generateAdminEmail(data: AdminEmailData): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>Nouvelle candidature - ${data.jobTitle}</title>
  <style>
    @media (prefers-color-scheme: dark) {
      .bg-light { background-color: #1a1a1a !important; }
      .text-dark { color: #ffffff !important; }
      .text-muted { color: #b0b0b0 !important; }
      .border-light { border-color: #333333 !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8f9fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          <!-- Header -->
          <tr>
            <td style="background-color: #ffffff; padding: 30px; text-align: center; border-bottom: 1px solid #e9ecef;">
              <img src="${LOGO_URL}" alt="Nourx" style="height: 32px; width: auto;" />
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <div style="display: inline-block; background-color: #0066FF; color: white; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-bottom: 20px;">
                NOUVELLE CANDIDATURE
              </div>
              
              <h1 style="margin: 0 0 8px 0; font-size: 24px; font-weight: 600; color: #000000;">
                ${data.jobTitle}
              </h1>
              
              <p style="margin: 0 0 30px 0; color: #6c757d; font-size: 14px;">
                Candidature reçue le ${format(new Date(), 'PPP à HH:mm', { locale: fr })}
              </p>
              
              <!-- Candidate Info -->
              <div style="background-color: #f8f9fa; border-left: 3px solid #0066FF; padding: 20px; border-radius: 4px; margin-bottom: 30px;">
                <h2 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #000000;">
                  Informations du candidat
                </h2>
                
                <table width="100%" cellpadding="8" cellspacing="0">
                  <tr>
                    <td style="font-weight: 600; color: #6c757d; font-size: 14px; width: 140px;">Nom complet</td>
                    <td style="color: #212529; font-size: 14px;">${data.fullName}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: 600; color: #6c757d; font-size: 14px;">Email</td>
                    <td style="color: #212529; font-size: 14px;">
                      <a href="mailto:${data.email}" style="color: #0066FF; text-decoration: none;">${data.email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-weight: 600; color: #6c757d; font-size: 14px;">Téléphone</td>
                    <td style="color: #212529; font-size: 14px;">
                      <a href="tel:${data.phone}" style="color: #0066FF; text-decoration: none;">${data.phone}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-weight: 600; color: #6c757d; font-size: 14px;">Niveau d'études</td>
                    <td style="color: #212529; font-size: 14px;">${data.education}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: 600; color: #6c757d; font-size: 14px;">Expérience</td>
                    <td style="color: #212529; font-size: 14px;">${data.experience}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: 600; color: #6c757d; font-size: 14px;">Disponibilité</td>
                    <td style="color: #212529; font-size: 14px;">${data.availability}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: 600; color: #6c757d; font-size: 14px;">Localisation</td>
                    <td style="color: #212529; font-size: 14px;">${data.location}</td>
                  </tr>
                </table>
              </div>
              
              <!-- Motivation -->
              <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600; color: #000000;">
                Lettre de motivation
              </h3>
              <div style="background-color: #ffffff; border: 1px solid #dee2e6; padding: 20px; border-radius: 4px; margin-bottom: 30px; white-space: pre-wrap; line-height: 1.6; color: #212529; font-size: 14px;">
${data.motivation}
              </div>
              
              <!-- Documents -->
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 4px;">
                <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #000000;">
                  Documents joints
                </h3>
                <p style="margin: 0 0 16px 0; color: #6c757d; font-size: 13px;">
                  Liens de téléchargement valides pendant 7 jours
                </p>
                ${data.uploadedFiles.map(file => `
                <a href="${file.url}" style="display: block; padding: 12px 16px; background-color: white; border: 1px solid #dee2e6; border-radius: 4px; margin-bottom: 8px; text-decoration: none; color: #0066FF; font-weight: 500; font-size: 14px;">
                  📄 ${file.name}
                </a>
                `).join('')}
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #dee2e6;">
              <p style="margin: 0 0 8px 0; font-weight: 600; color: #212529; font-size: 14px;">
                Nourx - Votre partenaire digital de A à Z
              </p>
              <p style="margin: 0 0 16px 0; color: #6c757d; font-size: 13px;">
                Cocody Riviera Golf Cité Riviera Beach, Abidjan, Côte d'Ivoire
              </p>
              <p style="margin: 0; color: #6c757d; font-size: 13px;">
                <a href="tel:+2250720111108" style="color: #6c757d; text-decoration: none;">+225 07 20 11 11 08</a> 
                <span style="color: #dee2e6; margin: 0 8px;">|</span> 
                <a href="mailto:contact@nourx.dev" style="color: #6c757d; text-decoration: none;">contact@nourx.dev</a>
              </p>
              <p style="margin: 20px 0 0 0; color: #adb5bd; font-size: 12px;">
                © ${new Date().getFullYear()} Nourx. Tous droits réservés.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

export function generateCandidateEmail(data: CandidateEmailData): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>Candidature reçue - Nourx</title>
  <style>
    @media (prefers-color-scheme: dark) {
      .bg-light { background-color: #1a1a1a !important; }
      .text-dark { color: #ffffff !important; }
      .text-muted { color: #b0b0b0 !important; }
      .border-light { border-color: #333333 !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8f9fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          <!-- Header -->
          <tr>
            <td style="background-color: #ffffff; padding: 50px 40px; text-align: center; border-bottom: 1px solid #e9ecef;">
              <img src="${LOGO_URL}" alt="Nourx" style="height: 32px; width: auto;" />
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h1 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 600; color: #000000;">
                Bonjour ${data.fullName},
              </h1>
              
              <p style="margin: 0 0 24px 0; color: #212529; font-size: 15px; line-height: 1.6;">
                Nous avons bien reçu votre candidature pour le poste de <strong>${data.jobTitle}</strong> et nous vous remercions de votre intérêt pour Nourx.
              </p>
              
              <!-- Info Box -->
              <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-left: 3px solid #0066FF; padding: 20px; border-radius: 4px; margin-bottom: 30px;">
                <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600; color: #000000;">
                  Récapitulatif de votre candidature
                </h3>
                <p style="margin: 4px 0; color: #6c757d; font-size: 14px;">
                  <strong>Poste :</strong> ${data.jobTitle}
                </p>
                <p style="margin: 4px 0; color: #6c757d; font-size: 14px;">
                  <strong>Date de soumission :</strong> ${format(new Date(), 'PPP à HH:mm', { locale: fr })}
                </p>
                <p style="margin: 4px 0; color: #6c757d; font-size: 14px;">
                  <strong>Disponibilité :</strong> ${data.availability}
                </p>
              </div>
              
              <!-- Timeline -->
              <div style="background-color: #f8f9fa; padding: 24px; border-radius: 4px; margin-bottom: 30px;">
                <h3 style="margin: 0 0 20px 0; font-size: 16px; font-weight: 600; color: #000000;">
                  Prochaines étapes
                </h3>
                
                <div style="display: flex; margin-bottom: 16px;">
                  <div style="width: 12px; height: 12px; background-color: #0066FF; border-radius: 50%; margin-right: 16px; margin-top: 4px; flex-shrink: 0;"></div>
                  <div>
                    <div style="font-weight: 600; color: #212529; font-size: 14px; margin-bottom: 4px;">
                      Candidature reçue ✓
                    </div>
                    <div style="color: #6c757d; font-size: 13px;">
                      Votre dossier a été enregistré
                    </div>
                  </div>
                </div>
                
                <div style="display: flex; margin-bottom: 16px;">
                  <div style="width: 12px; height: 12px; background-color: #FFA500; border-radius: 50%; margin-right: 16px; margin-top: 4px; flex-shrink: 0;"></div>
                  <div>
                    <div style="font-weight: 600; color: #212529; font-size: 14px; margin-bottom: 4px;">
                      Étude du profil
                    </div>
                    <div style="color: #6c757d; font-size: 13px;">
                      Notre équipe examine votre candidature
                    </div>
                  </div>
                </div>
                
                <div style="display: flex;">
                  <div style="width: 12px; height: 12px; background-color: #dee2e6; border-radius: 50%; margin-right: 16px; margin-top: 4px; flex-shrink: 0;"></div>
                  <div>
                    <div style="font-weight: 600; color: #212529; font-size: 14px; margin-bottom: 4px;">
                      Réponse sous 2 semaines
                    </div>
                    <div style="color: #6c757d; font-size: 13px;">
                      Nous vous contacterons pour la suite
                    </div>
                  </div>
                </div>
              </div>
              
              <p style="margin: 0 0 24px 0; color: #212529; font-size: 15px; line-height: 1.6;">
                Si votre profil correspond à nos attentes, nous vous contacterons par email ou téléphone pour planifier un entretien.
              </p>
              
              <p style="margin: 0; color: #6c757d; font-size: 14px;">
                Pour toute question, n'hésitez pas à nous contacter à 
                <a href="mailto:contact@nourx.dev" style="color: #0066FF; text-decoration: none;">contact@nourx.dev</a> 
                ou au 
                <a href="tel:+2250720111108" style="color: #0066FF; text-decoration: none;">+225 07 20 11 11 08</a>.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #dee2e6;">
              <p style="margin: 0 0 8px 0; font-weight: 600; color: #212529; font-size: 14px;">
                Nourx - Votre partenaire digital de A à Z
              </p>
              <p style="margin: 0 0 16px 0; color: #6c757d; font-size: 13px;">
                Cocody Riviera Golf Cité Riviera Beach, Abidjan, Côte d'Ivoire
              </p>
              <p style="margin: 0; color: #6c757d; font-size: 13px;">
                <a href="tel:+2250720111108" style="color: #6c757d; text-decoration: none;">+225 07 20 11 11 08</a> 
                <span style="color: #dee2e6; margin: 0 8px;">|</span> 
                <a href="mailto:contact@nourx.dev" style="color: #6c757d; text-decoration: none;">contact@nourx.dev</a>
              </p>
              <p style="margin: 20px 0 0 0; color: #adb5bd; font-size: 12px;">
                © ${new Date().getFullYear()} Nourx. Tous droits réservés.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

