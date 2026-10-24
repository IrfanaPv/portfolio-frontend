import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
})

async function query(groq) {
  try {
    return await client.fetch(groq)
  } catch (err) {
    console.error('Sanity fetch error:', err.message)
    return null
  }
}

function toList(value, separator = '\n') {
  if (Array.isArray(value)) return value.filter(Boolean)
  if (typeof value === 'string') {
    return value.split(separator).map((v) => v.trim()).filter(Boolean)
  }
  return []
}

export async function getSkills() {
  const data = await query(`*[_type == "skill"] | order(order asc){_id, category, items}`)
  return (data || []).map((s) => ({
    id: s._id,
    category: s.category,
    items: toList(s.items, ','),
  }))
}

export async function getExperience() {
  const data = await query(
    `*[_type == "experience"] | order(order asc){_id, role, organization, period, points}`
  )
  return (data || []).map((e) => ({
    id: e._id,
    role: e.role,
    org: e.organization,
    period: e.period,
    points: toList(e.points),
  }))
}

export async function getProjects() {
  const data = await query(
    `*[_type == "project"] | order(order asc){_id, title, "image": image.asset->url, tech, points, githubUrl, liveUrl}`
  )
  return (data || []).map((p) => ({
    id: p._id,
    title: p.title,
    image: p.image || null,
    tech: toList(p.tech, ','),
    points: toList(p.points),
    github: p.githubUrl,
    live: p.liveUrl,
  }))
}

export async function getEducation() {
  const data = await query(
    `*[_type == "education"] | order(order asc){_id, degree, organization, period, detail}`
  )
  return (data || []).map((e) => ({
    id: e._id,
    degree: e.degree,
    org: e.organization,
    period: e.period,
    detail: e.detail,
  }))
}

export async function getCertifications() {
  const data = await query(
    `*[_type == "certification"] | order(order asc){_id, title, issuer, dateOfIssue}`
  )
  return (data || []).map((c) => ({
    id: c._id,
    title: c.title,
    org: c.issuer,
    period: c.dateOfIssue,
  }))
}

export async function getAbout() {
  const a = await query(
    `*[_type == "about"][0]{headline, bio, basedIn, focus, education, languages, "photo": photo.asset->url, "cv": cv.asset->url}`
  )
  if (!a) return null
  return { ...a, photo: a.photo || null, cv: a.cv || null }
}

export async function getContact() {
  const c = await query(
    `*[_type == "contact"][0]{email, phone, linkedinUrl, githubUrl, availabilityNote}`
  )
  return c || null
}

export async function submitContactMessage(data) {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return { success: res.ok }
  } catch (err) {
    console.error('Contact submission error:', err.message)
    return { success: false }
  }
}