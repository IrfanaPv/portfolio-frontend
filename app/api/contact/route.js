import { createClient } from '@sanity/client'
import { randomUUID } from 'crypto'

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

export async function POST(request) {
  try {
    const { name, email, message } = await request.json()
    if (!name || !email || !message) {
      return Response.json({ success: false }, { status: 400 })
    }
    await writeClient.create({
      _id: `drafts.${randomUUID()}`,
      _type: 'contactSubmission',
      name: String(name).slice(0, 200),
      email: String(email).slice(0, 200),
      message: String(message).slice(0, 5000),
    })
    return Response.json({ success: true })
  } catch (err) {
    console.error('Contact submission error:', err.message)
    return Response.json({ success: false }, { status: 500 })
  }
}