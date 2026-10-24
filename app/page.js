import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/ui/Footer";
import { getAbout, getSkills, getExperience, getProjects, getEducation,getCertifications, getContact } from '@/lib/sanity'
export const revalidate = 60
export default async function Home() {
   const [about, skills, experience, projects, education, certifications, contact] = await Promise.all([
    getAbout(),
    getSkills(),
    getExperience(),
    getProjects(),
    getEducation(),
    getCertifications(),
    getContact(),
  ])

  return (
    <main>
      <Hero />
      <div className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-[#5eead4]/25 to-transparent" />
      <About data={about} />
      <div className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-[#5eead4]/25 to-transparent" />
      <Skills data={skills} />
      <div className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-[#5eead4]/25 to-transparent" />
      <Experience data={ experience } />
      <div className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-[#5eead4]/25 to-transparent" />
      <Projects data={ projects } />
      <div className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-[#5eead4]/25 to-transparent" />
      <Education education={education} certifications={certifications} languages={about?.languages} />
      <div className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-[#5eead4]/25 to-transparent" />
      <Contact contact={contact} />
      <Footer />
    </main>
  );
}