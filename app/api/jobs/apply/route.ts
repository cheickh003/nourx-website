import { NextRequest, NextResponse } from 'next/server'
import { getTransporter, getEmailFrom, getAdminEmails } from '@/lib/email'
import { uploadToS3, getPresignedDownloadUrl, sanitizeFilename } from '@/lib/s3'
import { generateAdminEmail, generateCandidateEmail } from '@/lib/emailTemplates'

export const runtime = 'nodejs'

const MAX_FILE_SIZE = 8 * 1024 * 1024 // 8MB
const ACCEPTED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Extract form fields
    const jobId = formData.get('jobId') as string
    const jobTitle = formData.get('jobTitle') as string
    const fullName = formData.get('fullName') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const education = formData.get('education') as string
    const experience = formData.get('experience') as string
    const location = formData.get('location') as string
    const motivation = formData.get('motivation') as string

    // Extract files
    const cvFile = formData.get('cv') as File | null
    const coverLetterFile = formData.get('coverLetter') as File | null
    const otherFile = formData.get('other') as File | null

    // Validation
    if (!jobId || !jobTitle || !fullName || !email || !phone || !education || !experience || !location || !motivation) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      )
    }

    if (!cvFile) {
      return NextResponse.json(
        { error: 'Le CV est obligatoire' },
        { status: 400 }
      )
    }

    // Validate files
    const filesToValidate = [
      { file: cvFile, name: 'CV' },
      ...(coverLetterFile ? [{ file: coverLetterFile, name: 'Lettre de motivation' }] : []),
      ...(otherFile ? [{ file: otherFile, name: 'Autre document' }] : [])
    ]

    for (const { file, name } of filesToValidate) {
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `${name}: La taille maximale est de 8 Mo` },
          { status: 400 }
        )
      }
      if (!ACCEPTED_MIME_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: `${name}: Seuls les fichiers PDF, DOC et DOCX sont acceptés` },
          { status: 400 }
        )
      }
    }

    // Upload files to R2
    const timestamp = Date.now()
    const uploadedFiles: { name: string; url: string }[] = []

    const cvBuffer = Buffer.from(await cvFile.arrayBuffer())
    const cvKey = `jobs/${jobId}/${timestamp}-${sanitizeFilename(cvFile.name)}`
    await uploadToS3(cvKey, cvBuffer, cvFile.type)
    const cvUrl = await getPresignedDownloadUrl(cvKey)
    uploadedFiles.push({ name: 'CV', url: cvUrl })

    if (coverLetterFile) {
      const clBuffer = Buffer.from(await coverLetterFile.arrayBuffer())
      const clKey = `jobs/${jobId}/${timestamp}-${sanitizeFilename(coverLetterFile.name)}`
      await uploadToS3(clKey, clBuffer, coverLetterFile.type)
      const clUrl = await getPresignedDownloadUrl(clKey)
      uploadedFiles.push({ name: 'Lettre de motivation', url: clUrl })
    }

    if (otherFile) {
      const otherBuffer = Buffer.from(await otherFile.arrayBuffer())
      const otherKey = `jobs/${jobId}/${timestamp}-${sanitizeFilename(otherFile.name)}`
      await uploadToS3(otherKey, otherBuffer, otherFile.type)
      const otherUrl = await getPresignedDownloadUrl(otherKey)
      uploadedFiles.push({ name: 'Autre document', url: otherUrl })
    }

    // Generate email templates
    const adminHtml = generateAdminEmail({
      jobTitle,
      fullName,
      email,
      phone,
      education,
      experience,
      availability: 'Immédiate',
      location,
      motivation,
      uploadedFiles
    })

    const candidateHtml = generateCandidateEmail({
      fullName,
      jobTitle,
      availability: 'Immédiate'
    })

    // Get email configuration
    const transporter = getTransporter()
    const emailFrom = getEmailFrom()
    const adminEmails = getAdminEmails()

    // Helper: small email check
    const isValidEmail = (addr: string | undefined | null) =>
      typeof addr === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(addr.trim())

    // Send emails to admins
    if (adminEmails.length > 0) {
      try {
        await transporter.sendMail({
          from: emailFrom,
          to: adminEmails.join(', '),
          subject: `Nouvelle candidature: ${jobTitle} - ${fullName} (${email})`,
          html: adminHtml,
        })
      } catch (e) {
        console.error('Admin email failed:', e)
      }
    }

    // Send confirmation to candidate
    if (isValidEmail(email)) {
      try {
        await transporter.sendMail({
          from: emailFrom,
          to: email.trim(),
          subject: `Candidature reçue - ${jobTitle} - Nourx`,
          html: candidateHtml,
        })
      } catch (e) {
        console.error('Candidate email failed:', e)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Candidature envoyée avec succès'
    })

  } catch (error) {
    console.error('Application submission error:', error)
    return NextResponse.json(
      { 
        error: 'Erreur lors de l\'envoi de la candidature',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    )
  }
}

