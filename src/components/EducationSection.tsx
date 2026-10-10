import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-24 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">
            <GraduationCap className="w-4 h-4" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Education & Foundation
          </h2>
          <p className="mt-3 text-zinc-400 text-base">
            Grounded in rigorous Computer Science engineering fundamentals coupled with 
            advanced graduate analytics and data systems studies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PORTFOLIO_DATA.education.map((edu, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8 hover:border-zinc-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-3">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {edu.duration}
                  </span>
                  <span className="flex items-center gap-1.5 text-zinc-400">
                    <MapPin className="w-3.5 h-3.5" />
                    {edu.location}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight">
                  {edu.degree}
                </h3>
                <div className="text-sm font-medium text-emerald-300 font-mono mt-1">
                  {edu.institution}
                </div>

                <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
                  {edu.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  Accredited Program
                </span>
                <span className="text-zinc-500">Curriculum Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
