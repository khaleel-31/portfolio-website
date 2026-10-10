import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { InteractivePlayground } from './components/InteractivePlayground';
import { SkillsSection } from './components/SkillsSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const handleOpenResume = () => {
    setIsResumeOpen(true);
  };

  const handleCloseResume = () => {
    setIsResumeOpen(false);
  };

  const handleExploreSandbox = () => {
    const el = document.getElementById('architecture');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Sticky Navigation */}
      <Navbar onOpenResume={handleOpenResume} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero 
          onOpenResume={handleOpenResume} 
          onExploreSandbox={handleExploreSandbox} 
        />
        <ProjectsSection />
        <InteractivePlayground />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenResume={handleOpenResume} />

      {/* Printable / Interactive Resume Viewer Modal */}
      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={handleCloseResume} 
      />
    </div>
  );
}
