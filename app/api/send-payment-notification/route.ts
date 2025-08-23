import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const {
      service_name,
      amount,
      payment_reference,
      customer_name,
      customer_email,
      customer_phone,
      transaction_id
    } = await req.json();

    // Create transporter using the provided SMTP configuration
    const transporter = nodemailer.createTransport({
      host: 'mail.spacemail.com',
      port: 465,
      secure: true, // SSL
      auth: {
        user: 'no-reply@nourx.dev',
        pass: process.env.NOURX_EMAIL_PASSWORD || '.Malminek21'
      }
    });

    // Email content
    const htmlContent = `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
        <div style="background-color: white; border-radius: 12px; padding: 32px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #1e293b; font-size: 24px; font-weight: bold; margin: 0;">
              🔔 Nouvelle demande de paiement
            </h1>
            <p style="color: #64748b; margin: 8px 0 0 0;">
              Un client vient de procéder au paiement sur votre site
            </p>
          </div>

          <!-- Payment Info -->
          <div style="background-color: #f1f5f9; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
            <h2 style="color: #0f172a; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">
              📋 Détails du paiement
            </h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #475569; font-weight: 500; width: 40%;">Référence:</td>
                <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${payment_reference}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #475569; font-weight: 500;">Service:</td>
                <td style="padding: 8px 0; color: #1e293b;">${service_name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #475569; font-weight: 500;">Montant:</td>
                <td style="padding: 8px 0; color: #2563eb; font-weight: 700; font-size: 16px;">${amount.toLocaleString()} XOF</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #475569; font-weight: 500;">ID Transaction:</td>
                <td style="padding: 8px 0; color: #6b7280; font-family: monospace;">${transaction_id}</td>
              </tr>
            </table>
          </div>

          <!-- Customer Info -->
          <div style="background-color: #fefefe; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
            <h2 style="color: #0f172a; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">
              👤 Informations client
            </h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #475569; font-weight: 500; width: 30%;">Nom:</td>
                <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${customer_name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #475569; font-weight: 500;">Email:</td>
                <td style="padding: 8px 0; color: #2563eb;"><a href="mailto:${customer_email}" style="color: #2563eb; text-decoration: none;">${customer_email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #475569; font-weight: 500;">Téléphone:</td>
                <td style="padding: 8px 0; color: #1e293b;">${customer_phone}</td>
              </tr>
            </table>
          </div>

          <!-- Action Required -->
          <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
            <p style="margin: 0; color: #92400e; font-weight: 500;">
              ⚠️ <strong>Action requise:</strong> Vérifiez le statut du paiement dans votre tableau de bord CinetPay et confirmez la réception.
            </p>
          </div>

          <!-- Footer -->
          <div style="text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px;">
            <p style="color: #64748b; font-size: 14px; margin: 0;">
              Cette notification a été envoyée automatiquement depuis votre site web Nourx
            </p>
            <p style="color: #94a3b8; font-size: 12px; margin: 8px 0 0 0;">
              ${new Date().toLocaleString('fr-FR', { 
                timeZone: 'Africa/Abidjan',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })} (Heure d'Abidjan)
            </p>
          </div>
        </div>
      </div>
    `;

    const textContent = `
NOUVELLE DEMANDE DE PAIEMENT - NOURX

Détails du paiement:
- Référence: ${payment_reference}
- Service: ${service_name}
- Montant: ${amount.toLocaleString()} XOF
- ID Transaction: ${transaction_id}

Informations client:
- Nom: ${customer_name}
- Email: ${customer_email}
- Téléphone: ${customer_phone}

Action requise: Vérifiez le statut du paiement dans votre tableau de bord CinetPay.

Cette notification a été envoyée automatiquement le ${new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Abidjan' })}.
    `;

    // Send emails to both addresses
    const adminEmails = ['cheickh.keita@outlook.fr', 'cheickh@nourx.dev'];
    
    await Promise.all(adminEmails.map(email => 
      transporter.sendMail({
        from: '"Nourx Notifications" <no-reply@nourx.dev>',
        to: email,
        subject: `💳 Nouveau paiement - Réf: ${payment_reference} - ${amount.toLocaleString()} XOF`,
        text: textContent,
        html: htmlContent
      })
    ));

    return NextResponse.json({ 
      success: true, 
      message: 'Notification emails sent successfully' 
    });

  } catch (error) {
    console.error('Error sending payment notification:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send notification email',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}