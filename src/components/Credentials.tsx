import { GraduationCap, Award, ExternalLink, BookOpen } from 'lucide-react';
import Section from './Section';
import { education, certificates, interests } from '../data/cv';

export default function Credentials() {
  return (
    <Section id="credentials" label="05. Credentials" title="Education, courses & certifications">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Education */}
        <div>
          <h3 className="flex items-center gap-2 font-mono text-sm font-semibold uppercase tracking-wider text-accent">
            <GraduationCap className="h-4 w-4" />
            Education
          </h3>
          <div className="mt-4 space-y-4">
            {education.map((e) => (
              <div
                key={e.degree}
                className="rounded-2xl border border-edge/70 bg-card/70 p-5 backdrop-blur-md transition-all duration-300 hover:border-accent/40"
              >
                <p className="font-display text-base font-semibold text-foreground">{e.degree}</p>
                <p className="mt-1 text-sm text-muted">{e.institution}</p>
              </div>
            ))}
          </div>

          {/* Interests */}
          <h3 className="mt-10 flex items-center gap-2 font-mono text-sm font-semibold uppercase tracking-wider text-accent2">
            <BookOpen className="h-4 w-4" />
            Technical interests
          </h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {interests.map((i) => (
              <div
                key={i.title}
                className="rounded-xl border border-edge/60 bg-surface/50 p-4 backdrop-blur-md transition-all duration-300 hover:border-accent2/40"
              >
                <p className="font-display text-sm font-semibold text-foreground">{i.title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">{i.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certificates */}
        <div>
          <h3 className="flex items-center gap-2 font-mono text-sm font-semibold uppercase tracking-wider text-accent">
            <Award className="h-4 w-4" />
            Certifications & courses
          </h3>
          <ul className="mt-4 space-y-2.5">
            {certificates.map((c) => {
              const inner = (
                <>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
                      {c.title}
                    </p>
                    <p className="mt-0.5 font-mono text-[11px] text-muted">
                      {c.issuer}
                      {c.detail ? ` — ${c.detail}` : ''}
                    </p>
                  </div>
                  {c.url && (
                    <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted transition-colors group-hover:text-accent" />
                  )}
                </>
              );

              return (
                <li key={c.title}>
                  {c.url ? (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-xl border border-edge/60 bg-card/60 p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md hover:shadow-accent/5"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="group flex items-center gap-3 rounded-xl border border-edge/60 bg-card/60 p-4 backdrop-blur-md">
                      {inner}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
