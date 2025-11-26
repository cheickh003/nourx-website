// Shared utility for SMS sending (server) and phone normalization (client/server)

const SMS_ENDPOINT = 'https://app.smspro.africa/api/v3/sms/send'

export type SendSmsParams = {
	recipient: string
	message: string
	senderId?: string
}

export type SendSmsResult = {
	ok: boolean
	status?: number
	error?: string
	data?: unknown
}

function getEnv(name: string): string | undefined {
	const v = process.env[name]
	if (!v) return undefined
	return v.trim().replace(/^["']|["']$/g, '')
}

function getSmsEnabled(): boolean {
	const raw = getEnv('SMS_ENABLED')
	if (raw) {
		return /^true$/i.test(raw)
	}
	// Par défaut: actif en production uniquement
	return process.env.NODE_ENV === 'production'
}

function getSenderId(defaultSender = 'Nourx'): string {
	return getEnv('SMS_SENDER_ID') || defaultSender
}

function getToken(): string | undefined {
	return getEnv('SMSPRO_API_TOKEN')
}

export function normalizeCIV(msisdn: string): string | null {
	if (!msisdn) return null
	// Supprimer tout sauf chiffres
	const digitsOnly = msisdn.replace(/\D+/g, '')
	if (!digitsOnly) return null

	// Retirer préfixe 00
	let n = digitsOnly.replace(/^00/, '')

	// Cas 225XXXXXXXXXX (13 chiffres)
	if (/^225\d{10}$/.test(n)) return n
	// Cas local 10 chiffres → préfixer 225
	if (/^\d{10}$/.test(n)) return `225${n}`

	return null
}

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function sendSms(params: SendSmsParams): Promise<SendSmsResult> {
	try {
		if (!getSmsEnabled()) {
			return { ok: false, error: 'SMS disabled by configuration' }
		}

		const token = getToken()
		if (!token) {
			return { ok: false, error: 'SMS token not configured' }
		}

		const senderId = params.senderId?.slice(0, 11) || getSenderId()
		const payload = {
			recipient: params.recipient,
			sender_id: senderId,
			type: 'plain',
			message: params.message,
		}

		const controller = new AbortController()
		const timeout = setTimeout(() => controller.abort(), 10_000)

		let res = await fetch(SMS_ENDPOINT, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify(payload),
			signal: controller.signal,
			cache: 'no-store',
		})
		clearTimeout(timeout)

		// Retry simple si 5xx
		if (res.status >= 500 && res.status <= 599) {
			await sleep(300)
			const controller2 = new AbortController()
			const timeout2 = setTimeout(() => controller2.abort(), 10_000)
			res = await fetch(SMS_ENDPOINT, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify(payload),
				signal: controller2.signal,
				cache: 'no-store',
			})
			clearTimeout(timeout2)
		}

		const contentType = res.headers.get('content-type') || ''
		const isJson = contentType.includes('application/json')
		const body = isJson ? await res.json().catch(() => undefined) : await res.text().catch(() => undefined)

		if (!res.ok) {
			const msg =
				typeof body === 'object' && body && (body as Record<string, unknown>).message
					? String((body as Record<string, unknown>).message)
					: `SMS request failed (${res.status})`
			return {
				ok: false,
				status: res.status,
				error: msg,
				data: body,
			}
		}

		return { ok: true, status: res.status, data: body }
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Unknown error'
		return { ok: false, error: `SMS error: ${message}` }
	}
}


