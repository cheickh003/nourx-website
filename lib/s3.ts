import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

// Configuration AWS S3
const AWS_REGION = (process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || 'eu-west-3').trim()
const AWS_S3_BUCKET = (process.env.AWS_S3_BUCKET || process.env.R2_BUCKET || 'nourx-candidatures').trim()

function normalizeEnv(value: string | undefined): string {
  return (value || '').trim().replace(/^"|"$/g, '').replace(/^'|'$/g, '')
}

let cachedClient: S3Client | null = null

function getS3Client(): S3Client {
  if (cachedClient) return cachedClient
  const accessKeyId = normalizeEnv(process.env.AWS_ACCESS_KEY_ID || process.env.R2_ACCESS_KEY_ID)
  const secretAccessKey = normalizeEnv(process.env.AWS_SECRET_ACCESS_KEY || process.env.R2_SECRET_ACCESS_KEY)

  if (!accessKeyId || !secretAccessKey) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[S3] Variables manquantes', {
        hasAccessKeyId: Boolean(accessKeyId),
        hasSecretAccessKey: Boolean(secretAccessKey),
      })
    }
    throw new Error('AWS S3 non configuré: définissez AWS_ACCESS_KEY_ID et AWS_SECRET_ACCESS_KEY')
  }

  cachedClient = new S3Client({
    region: AWS_REGION,
    credentials: { accessKeyId, secretAccessKey },
  })

  // Logs disabled for production

  return cachedClient
}

export async function uploadToS3(
  key: string,
  body: Buffer,
  contentType: string
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: AWS_S3_BUCKET,
    Key: key,
    Body: body,
    ContentType: contentType,
  })

  await getS3Client().send(command)
  return key
}

export async function getPresignedDownloadUrl(
  key: string,
  expiresIn: number = 7 * 24 * 60 * 60 // 7 jours
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: AWS_S3_BUCKET,
    Key: key,
  })

  const url = await getSignedUrl(getS3Client(), command, { expiresIn })
  return url
}

export function sanitizeFilename(originalName: string): string {
  return originalName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .toLowerCase()
}


