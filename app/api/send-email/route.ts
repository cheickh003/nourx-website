import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createHmac } from 'crypto'

// Lazy initialization to avoid build-time errors
let resendInstance: Resend | null = null

function getResend(): Resend {
  if (!resendInstance) {
    resendInstance = new Resend(process.env.RESEND_API_KEY)
  }
  return resendInstance
}

// Email template function
function generateEmailTemplate(data: {
  name: string
  email: string
  subject: string
  message: string
  phoneNumber?: string
}) {
  const htmlTemplate = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouveau message - Nourx</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f5f5f5;
      color: #333333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background-color: #000000;
      padding: 40px 20px;
      text-align: center;
    }
    .logo {
      color: #ffffff;
      font-size: 28px;
      font-weight: bold;
      text-decoration: none;
    }
    .content {
      padding: 40px 30px;
    }
    .message-box {
      background-color: #f8f9fa;
      border-left: 4px solid #0066FF;
      padding: 20px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .info-row {
      margin: 10px 0;
      padding: 10px 0;
      border-bottom: 1px solid #e0e0e0;
    }
    .info-label {
      font-weight: 600;
      color: #666666;
      display: inline-block;
      width: 120px;
    }
    .info-value {
      color: #333333;
    }
    .footer {
      background-color: #f8f9fa;
      padding: 30px;
      text-align: center;
      color: #666666;
      font-size: 14px;
    }
    .button {
      display: inline-block;
      padding: 12px 30px;
      background-color: #0066FF;
      color: #ffffff;
      text-decoration: none;
      border-radius: 4px;
      margin: 20px 0;
    }
    .social-links {
      margin: 20px 0;
    }
    .social-links a {
      margin: 0 10px;
      color: #666666;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <a href="https://nourx.dev" class="logo">NOURX</a>
    </div>

    <div class="content">
      <h1 style="color: #000000; margin-bottom: 30px;">Nouveau message reçu</h1>

      <p style="font-size: 16px; line-height: 1.6; color: #666666;">
        Vous avez reçu un nouveau message via le formulaire de contact du site web.
      </p>

      <div class="info-row">
        <span class="info-label">Nom :</span>
        <span class="info-value">${data.name}</span>
      </div>

      <div class="info-row">
        <span class="info-label">Email :</span>
        <span class="info-value"><a href="mailto:${data.email}" style="color: #0066FF;">${data.email}</a></span>
      </div>

      ${data.phoneNumber ? `
      <div class="info-row">
        <span class="info-label">Téléphone :</span>
        <span class="info-value"><a href="tel:${data.phoneNumber}" style="color: #0066FF;">${data.phoneNumber}</a></span>
      </div>
      ` : ''}

      <div class="info-row">
        <span class="info-label">Objet :</span>
        <span class="info-value">${data.subject}</span>
      </div>

      <div class="message-box">
        <h3 style="margin-top: 0; color: #333333;">Message :</h3>
        <p style="white-space: pre-wrap; line-height: 1.6;">${data.message}</p>
      </div>

      <div style="text-align: center; margin-top: 40px;">
        <a href="mailto:${data.email}?subject=Re: ${data.subject}" class="button">
          Répondre au message
        </a>
      </div>
    </div>

    <div class="footer">
      <p style="margin: 10px 0;">
        <strong>Nourx - Votre partenaire digital de A à Z</strong>
      </p>
      <p style="margin: 10px 0;">
        Cocody Riviera Golf Cité Riviera Beach, Abidjan, Côte d'Ivoire<br>
        <a href="tel:+2250720111108" style="color: #666666;">+225 07 20 11 11 08</a> |
        <a href="mailto:contact@nourx.dev" style="color: #666666;">contact@nourx.dev</a>
      </p>

      <div class="social-links">
        <a href="#">LinkedIn</a>
        <a href="#">Twitter</a>
        <a href="#">GitHub</a>
      </div>

      <p style="font-size: 12px; margin-top: 20px; color: #999999;">
        © ${new Date().getFullYear()} Nourx. Tous droits réservés.
      </p>
    </div>
  </div>
</body>
</html>
  `

  const textTemplate = `
Nouveau message reçu sur nourx.dev

Nom: ${data.name}
Email: ${data.email}
${data.phoneNumber ? `Téléphone: ${data.phoneNumber}` : ''}
Objet: ${data.subject}

Message:
${data.message}

---
Nourx - Votre partenaire digital de A à Z
Cocody-Riviera Golf, Abidjan, Côte d'Ivoire
+225 07 20 11 11 08 | contact@nourx.dev
  `

  return { html: htmlTemplate, text: textTemplate }
}

function generateUserConfirmationHtml(name: string) {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmation - Nourx</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

    body {
      margin: 0;
      padding: 0;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #f5f5f5;
      color: #333333;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }

    .header {
      background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
      padding: 60px 20px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .header::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(0,102,255,0.1) 0%, transparent 70%);
      animation: pulse 10s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 0.5; }
      50% { transform: scale(1.1); opacity: 0.8; }
    }

    .logo {
      color: #ffffff;
      font-size: 36px;
      font-weight: 700;
      text-decoration: none;
      letter-spacing: -1px;
      position: relative;
      z-index: 1;
    }

    .hero-icon {
      width: 80px;
      height: 80px;
      margin: 30px auto 20px;
      background: linear-gradient(135deg, #0066FF 0%, #004DCC 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 10px 30px rgba(0,102,255,0.3);
      position: relative;
      z-index: 1;
    }

    .content {
      padding: 50px 40px;
      background-color: #ffffff;
    }

    .greeting {
      font-size: 24px;
      font-weight: 600;
      color: #000000;
      margin-bottom: 20px;
    }

    .message {
      font-size: 16px;
      line-height: 1.8;
      color: #555555;
      margin-bottom: 30px;
    }

    .info-box {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border-radius: 12px;
      padding: 30px;
      margin: 30px 0;
      border-left: 4px solid #0066FF;
    }

    .info-title {
      font-size: 18px;
      font-weight: 600;
      color: #000000;
      margin-bottom: 20px;
    }

    .contact-grid {
      display: table;
      width: 100%;
      margin: 20px 0;
    }

    .contact-item {
      display: table-row;
    }

    .contact-icon {
      display: table-cell;
      width: 40px;
      padding: 10px 0;
      vertical-align: top;
    }

    .contact-details {
      display: table-cell;
      padding: 10px 0;
      vertical-align: top;
    }

    .contact-label {
      font-weight: 600;
      color: #333333;
      margin-bottom: 5px;
    }

    .contact-value {
      color: #0066FF;
      text-decoration: none;
    }

    .cta-section {
      text-align: center;
      margin: 40px 0;
    }

    .cta-button {
      display: inline-block;
      padding: 16px 40px;
      background: linear-gradient(135deg, #0066FF 0%, #004DCC 100%);
      color: #ffffff;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      box-shadow: 0 4px 15px rgba(0,102,255,0.3);
      transition: all 0.3s ease;
    }

    .cta-button:hover {
      box-shadow: 0 6px 20px rgba(0,102,255,0.4);
    }

    .timeline {
      margin: 40px 0;
      padding: 30px;
      background-color: #fafafa;
      border-radius: 12px;
    }

    .timeline-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 20px;
    }

    .timeline-dot {
      width: 12px;
      height: 12px;
      background-color: #0066FF;
      border-radius: 50%;
      margin-right: 20px;
      margin-top: 5px;
      position: relative;
    }

    .timeline-dot::after {
      content: '';
      position: absolute;
      left: 5px;
      top: 12px;
      width: 2px;
      height: 30px;
      background-color: #e0e0e0;
    }

    .timeline-item:last-child .timeline-dot::after {
      display: none;
    }

    .timeline-content {
      flex: 1;
    }

    .timeline-title {
      font-weight: 600;
      color: #333333;
      margin-bottom: 5px;
    }

    .timeline-desc {
      color: #666666;
      font-size: 14px;
    }

    .footer {
      background-color: #fafafa;
      padding: 40px;
      text-align: center;
      border-top: 1px solid #e0e0e0;
    }

    .social-links {
      margin: 20px 0;
    }

    .social-link {
      display: inline-block;
      width: 40px;
      height: 40px;
      background-color: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 50%;
      margin: 0 8px;
      text-decoration: none;
      line-height: 40px;
      color: #666666;
      transition: all 0.3s ease;
    }

    .social-link:hover {
      background-color: #0066FF;
      color: #ffffff;
      border-color: #0066FF;
    }

    .footer-text {
      color: #999999;
      font-size: 14px;
      margin: 10px 0;
    }

    .footer-links {
      margin: 20px 0;
    }

    .footer-links a {
      color: #666666;
      text-decoration: none;
      margin: 0 15px;
      font-size: 14px;
    }

    @media only screen and (max-width: 600px) {
      .content {
        padding: 30px 20px;
      }

      .greeting {
        font-size: 20px;
      }

      .cta-button {
        display: block;
        width: 100%;
        box-sizing: border-box;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <a href="https://nourx.dev" class="logo">NOURX</a>
      <div class="hero-icon">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" stroke="white" stroke-width="2"/>
          <path d="M16 12L10 12M10 12L12.5 14.5M10 12L12.5 9.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>

    <div class="content">
      <h1 class="greeting">Bonjour ${name} 👋</h1>

      <p class="message">
        Nous avons bien reçu votre message et nous vous remercions de votre confiance.
        Notre équipe d'experts examine actuellement votre demande avec la plus grande attention.
      </p>

      <div class="timeline">
        <h3 class="info-title">Prochaines étapes</h3>

        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="timeline-title">Message reçu ✓</div>
            <div class="timeline-desc">Votre demande a été enregistrée</div>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-dot" style="background-color: #FFA500;"></div>
          <div class="timeline-content">
            <div class="timeline-title">En cours d'analyse</div>
            <div class="timeline-desc">Notre équipe étudie votre projet</div>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-dot" style="background-color: #e0e0e0;"></div>
          <div class="timeline-content">
            <div class="timeline-title">Réponse sous 24h</div>
            <div class="timeline-desc">Nous vous contacterons rapidement</div>
          </div>
        </div>
      </div>

      <div class="info-box">
        <h3 class="info-title">Contactez-nous directement</h3>

        <div class="contact-grid">
          <div class="contact-item">
            <div class="contact-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 5.5C3 14.0604 9.93959 21 18.5 21C18.8862 21 19.2691 20.9859 19.6483 20.9581C20.0834 20.9262 20.3009 20.9103 20.499 20.7963C20.663 20.7019 20.8185 20.5345 20.9007 20.364C21 20.1582 21 19.9181 21 19.438V16.6207C21 16.2169 21 16.015 20.9335 15.842C20.8749 15.6891 20.7795 15.553 20.6559 15.4456C20.516 15.324 20.3262 15.255 19.9468 15.117L16.74 13.9509C16.2985 13.7904 16.0777 13.7101 15.8683 13.7237C15.6836 13.7357 15.5059 13.7988 15.3549 13.9058C15.1837 14.0271 15.0629 14.2285 14.8212 14.6314L14 16C11.3501 14.7999 9.2019 12.6489 8 10L9.36863 9.17882C9.77145 8.93713 9.97286 8.81628 10.0942 8.64506C10.2012 8.49408 10.2643 8.31637 10.2763 8.1317C10.2899 7.92227 10.2096 7.70153 10.0491 7.26005L8.88299 4.05321C8.745 3.67376 8.67601 3.48403 8.55442 3.3441C8.44701 3.22049 8.31089 3.12515 8.15802 3.06645C7.98496 3 7.78308 3 7.37932 3H4.56201C4.08188 3 3.84181 3 3.63598 3.09925C3.4655 3.18146 3.29814 3.33701 3.2037 3.50103C3.08968 3.69907 3.07375 3.91662 3.04189 4.35173C3.01413 4.73086 3 5.11378 3 5.5Z" stroke="#0066FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="contact-details">
              <div class="contact-label">Téléphone</div>
              <a href="tel:+2250720111108" class="contact-value">+225 07 20 11 11 08</a>
            </div>
          </div>

          <div class="contact-item">
            <div class="contact-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M7.5 12L9.5 14L16.5 7M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#25D366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="contact-details">
              <div class="contact-label">WhatsApp</div>
              <a href="https://wa.me/2250720111108" class="contact-value">+225 07 20 11 11 08</a>
            </div>
          </div>

          <div class="contact-item">
            <div class="contact-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="#0066FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="contact-details">
              <div class="contact-label">Email</div>
              <a href="mailto:contact@nourx.dev" class="contact-value">contact@nourx.dev</a>
            </div>
          </div>
        </div>
      </div>

      <div class="cta-section">
        <p style="color: #666666; margin-bottom: 20px;">En attendant notre réponse, découvrez nos services</p>
        <a href="https://nourx.dev/services" class="cta-button">Découvrir nos services</a>
      </div>
    </div>

    <div class="footer">
      <div class="social-links">
        <a href="#" class="social-link">in</a>
        <a href="#" class="social-link">tw</a>
        <a href="#" class="social-link">gh</a>
      </div>

      <div class="footer-links">
        <a href="https://nourx.dev">Site web</a>
        <a href="https://nourx.dev/about">À propos</a>
        <a href="https://nourx.dev/contact">Contact</a>
      </div>

      <p class="footer-text">
        © ${new Date().getFullYear()} Nourx. Tous droits réservés.
      </p>

      <p class="footer-text">
        Cocody Riviera Golf Cité Riviera Beach, Abidjan, Côte d'Ivoire
      </p>
    </div>
  </div>
</body>
</html>
  `
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { name, email, subject, message, phoneNumber } = data

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      )
    }

    // Generate email templates
    const { html, text } = generateEmailTemplate(data)
    const userConfirmationHtml = generateUserConfirmationHtml(name)

    // Send email to admin
    const resend = getResend()
    const fromEmail = process.env.EMAIL_FROM?.trim() || 'Nourx Website <no-reply@nourx.dev>'
    const toEmail = process.env.EMAIL_TO?.trim() || 'cheickh@nourx.dev'

    // Validate from email format
    const validFrom = fromEmail.includes('@') ? fromEmail : 'Nourx Website <no-reply@nourx.dev>'

    const adminEmailResult = await resend.emails.send({
      from: validFrom,
      to: [toEmail],
      subject: `[Contact Web] ${subject}`,
      html: html,
      text: text,
      replyTo: email
    })

    if (adminEmailResult.error) {
      console.error('Erreur email admin:', adminEmailResult.error)
      throw new Error(adminEmailResult.error.message)
    }

    // Send confirmation email to user
    const userEmailResult = await resend.emails.send({
      from: 'Nourx <no-reply@nourx.dev>',
      to: [email],
      subject: 'Confirmation de réception - Nourx',
      html: userConfirmationHtml,
      text: `Bonjour ${name},\n\nNous avons bien reçu votre message et nous vous remercions de votre intérêt pour Nourx.\n\nNotre équipe examinera votre demande et vous répondra dans les 24 heures ouvrables.\n\nCordialement,\nL'équipe Nourx`
    })

    if (userEmailResult.error) {
      console.error('Erreur email confirmation:', userEmailResult.error)
      // Ne pas bloquer si l'email de confirmation échoue
    }

    // Sync to admin dashboard
    try {
      const adminApiUrl = process.env.ADMIN_API_URL
      const ingestSecret = process.env.ADMIN_INGEST_SECRET

      if (adminApiUrl && ingestSecret) {
        const contactPayload = {
          fullName: name,
          email: email,
          phone: phoneNumber || undefined,
          subject: subject,
          message: message,
          source: 'nourx.dev',
        }

        const payloadString = JSON.stringify(contactPayload)
        const signature = createHmac('sha256', ingestSecret)
          .update(payloadString)
          .digest('hex')

        await fetch(`${adminApiUrl}/api/contact/ingest`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-nourx-signature': signature,
          },
          body: payloadString,
        })
      }
    } catch (webhookError) {
      console.error('Erreur webhook contact:', webhookError)
      // Don't fail the request if webhook fails
    }

    return NextResponse.json({
      success: true,
      message: 'Emails envoyés avec succès'
    })

  } catch (error) {
    console.error('Erreur email:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi de l\'email' },
      { status: 500 }
    )
  }
}
