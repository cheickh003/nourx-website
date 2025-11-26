import nodemailer from 'nodemailer'
import type { Transporter } from 'nodemailer'
import type SMTPTransport from 'nodemailer/lib/smtp-transport'

// Get configuration at runtime
function getEmailConfig() {
  const host = process.env.EMAIL_HOST || 'mail.spacemail.com'
  const port = parseInt(process.env.EMAIL_PORT || '465')
  const user = (process.env.EMAIL_USER || 'no-reply@nourx.dev').trim()
  const pass = (process.env.EMAIL_PASS || process.env.NOURX_EMAIL_PASSWORD || '').trim()

  // Logs disabled for production

  return { host, port, user, pass }
}

// Create transporter lazily
let cachedTransporter: Transporter<SMTPTransport.SentMessageInfo> | null = null

export function getTransporter() {
  if (cachedTransporter) return cachedTransporter
  
  const config = getEmailConfig()
  cachedTransporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  })

  return cachedTransporter
}

// Get email sender address
export function getEmailSender(): string {
  const config = getEmailConfig()
  return config.user
}

// Get FROM header with display name
export function getEmailFrom(): string {
  const rawFrom = (process.env.EMAIL_FROM || '').trim()
  const sender = getEmailSender()
  
  // If EMAIL_FROM contains @, use it as is
  if (rawFrom && /@/.test(rawFrom)) {
    return rawFrom
  }
  
  // If EMAIL_FROM is just a display name, format it
  if (rawFrom) {
    return `"${rawFrom}" <${sender}>`
  }
  
  // Default
  return `"Nourx" <${sender}>`
}

// Get admin emails
export function getAdminEmails(): string[] {
  const rawEmails = (process.env.ADMIN_EMAILS || '').trim()
  const defaultEmails = 'cheickh@nourx.dev,cheickh.keita@outlook.fr'
  
  const emails = (rawEmails || defaultEmails)
    .split(',')
    .map(e => e.trim().replace(/^['"]|['"]$/g, ''))
    .filter(e => e.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e))
  
  // Logs disabled for production
  
  return emails
}

// Verify transporter configuration
export async function verifyEmailConnection() {
  try {
    await getTransporter().verify()
    return true
  } catch (error) {
    console.error('Email transporter verification failed:', error)
    return false
  }
}
