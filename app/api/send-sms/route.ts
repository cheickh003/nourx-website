import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

const SMS_API_URL = process.env.SMS_API_URL || 'https://app.smspro.africa/api/http/sms/send'
const SMS_API_TOKEN = process.env.SMS_API_TOKEN || ''

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, message, name, email } = await request.json()

    if (!phoneNumber || !message) {
      return NextResponse.json(
        { error: 'Numéro de téléphone et message requis' },
        { status: 400 }
      )
    }

    // Format the phone number (remove spaces and ensure country code)
    let formattedPhone = phoneNumber.replace(/\s/g, '')
    
    // If the number doesn't start with a valid West African country code, default to Côte d'Ivoire
    const validCountryCodes = ['220', '221', '222', '223', '224', '225', '226', '227', '228', '229', '231', '232', '233', '234', '238', '245']
    const hasValidCountryCode = validCountryCodes.some(code => formattedPhone.startsWith(code))
    
    if (!hasValidCountryCode) {
      // Default to Côte d'Ivoire if no valid country code
      formattedPhone = '225' + formattedPhone
    }

    // Prepare SMS content
    const smsMessage = message || `Bonjour ${name || ''},\n\nMerci pour votre message sur nourx.dev. Nous avons bien reçu votre demande et nous vous répondrons dans les plus brefs délais.\n\nCordialement,\nL'équipe Nourx`

    // Send SMS via SMS Pro Africa API
    const response = await axios.post(
      SMS_API_URL,
      {
        api_token: SMS_API_TOKEN,
        recipient: formattedPhone,
        sender_id: 'Nourx',
        type: 'plain',
        message: smsMessage
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )

    if (response.data.status === 'success') {
      return NextResponse.json({
        success: true,
        message: 'SMS envoyé avec succès',
        data: response.data
      })
    } else {
      throw new Error(response.data.message || 'Erreur lors de l\'envoi du SMS')
    }

  } catch (error) {
    console.error('Erreur SMS:', error)
    
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { 
          error: 'Erreur lors de l\'envoi du SMS',
          details: error.response?.data || error.message
        },
        { status: error.response?.status || 500 }
      )
    }

    return NextResponse.json(
      { error: 'Erreur serveur lors de l\'envoi du SMS' },
      { status: 500 }
    )
  }
}