const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL

async function fetchAPI(path) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/${path}`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) {
      console.error(`Strapi fetch failed for ${path}:`, res.status)
      return null
    }
    return res.json()
  } catch (err) {
    console.error(`Strapi fetch error for ${path}:`, err.message)
    return null
  }
}

export async function getSkills() {
  const json = await fetchAPI('skills')
  if (!json || !json.data) return []
  return json.data.map((item) => ({
    id: item.id,
    category: item.category,
    items: item.name.split(',').map((n) => n.trim()).filter(Boolean),
  }))
}

export async function getExperience() {
  const json = await fetchAPI('experiences')
  if (!json || !json.data) return []
  return json.data.map((item) => ({
    id: item.id,
    role: item.role,
    org: item.organization,
    period: item.period,
    points: item.points ? item.points.split('\n').filter(Boolean) : [],
  }))
}

export async function getProjects() {
  const json = await fetchAPI('projects?populate=*')
  if (!json || !json.data) return []
  return json.data.map((item) => ({
    id: item.id,
    title: item.title,
    image: item.image?.url ? `${STRAPI_URL}${item.image.url}` : null,
    tech: item.tech ? item.tech.split(',').map((t) => t.trim()) : [],
    points: item.points ? item.points.split('\n').filter(Boolean) : [],
    github: item.githubUrl,
    live: item.liveUrl,
  }))
}

export async function getEducation() {
  const json = await fetchAPI('educations')
  if (!json || !json.data) return []
  return json.data.map((item) => ({
    id: item.id,
    degree: item.degree,
    org: item.organization,
    period: item.period,
    detail: item.detail,
  }))
}

export async function getCertifications() {
  const json = await fetchAPI('certifications')
  if (!json || !json.data) return []
  return json.data.map((item) => ({
    id: item.id,
    title: item.title,
    org: item.Issuer,
    period: item.Date_of_issue,
  }))
}

export async function getAbout() {
  const json = await fetchAPI('about?populate=*')
  if (!json || !json.data) return null
  const a = json.data
  return {
    headline: a.headline,
    bio: a.bio,
    basedIn: a.basedIn,
    focus: a.focus,
    education: a.education,
    languages: a.languages,
    photo: a.photo?.url ? `${STRAPI_URL}${a.photo.url}` : null,
  }
}

export async function getContact() {
  const json = await fetchAPI('contact')
  if (!json || !json.data) return null
  const c = json.data
  return {
    email: c.email,
    phone: c.phone,
    linkedinUrl: c.linkedinUrl,
    githubUrl: c.githubUrl,
    availabilityNote: c.availabilityNote,
  }
}

// export async function submitContactMessage(data) {
//   try {
//     const res = await fetch(`${STRAPI_URL}/api/contact-submissions`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ data }),
//     })
//     if (!res.ok) {
//       const errJson = await res.json().catch(() => null)
//       console.error('Contact submission failed:', res.status, errJson)
//       return { success: false }
//     }
//     return { success: true }
//   } catch (err) {
//     console.error('Contact submission error:', err.message)
//     return { success: false }
//   }
// }
export async function submitContactMessage(data) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/contact-submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    })
    const text = await res.text()
    console.log('Strapi response status:', res.status)
    console.log('Strapi response body:', text)
    if (!res.ok) return { success: false }
    return { success: true }
  } catch (err) {
    console.error('Contact submission error:', err.message)
    return { success: false }
  }
}