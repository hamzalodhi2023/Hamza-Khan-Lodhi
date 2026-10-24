import { Building2, MapPin, ExternalLink, Lightbulb } from 'lucide-react';
import Section from './Section';
import { experiences } from '../data/cv';

export default function Experience() {
  return (
    <Section id="experience" label="03. Experience" title="Where I've been working">
      <div className="relative space-y-8">
        {/* Timeline line */}
        <div className="absolute left-[15px] top-2 hidden h-full w-px bg-gradient-to-b from-accent/50 via-edge to-transparent sm:block" />

        {experiences.map((exp) => (
          <div key={exp.role} className="relative sm:pl-12">
            {/* Timeline dot */}
            <div className="absolute left-[9px] top-1.5 hidden h-3 w-3 rounded-full border-2 border-accent bg-background sm:block">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent/50" />
            </div>

            <div className="group rounded-2xl border border-edge/70 bg-card/70 p-6 backdrop-blur-md transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground sm:text-xl">
                    {exp.role}
                  </h3>
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:underline"
                  >
                    <Building2 className="h-3.5 w-3.5" />
                    {exp.company}
                    <ExternalLink className="h-3 w-3 opacity-60" />
                  </a>
                </div>

                <div className="flex flex-col items-start gap-1.5 sm:items-end">
                  {exp.current && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                      Current
                    </span>
                  )}
                  <span className="font-mono text-xs text-muted">{exp.period}</span>
                  <span className="flex items-center gap-1 font-mono text-xs text-muted">
                    <MapPin className="h-3 w-3" />
                    {exp.location}
                  </span>
                </div>
              </div>

              <ul className="mt-5 space-y-3">
                {exp.points.map((p, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              {exp.learnings && exp.learnings.length > 0 && (
                <div className="mt-5 rounded-xl border border-edge/60 bg-surface/50 p-4">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-accent2" />
                    <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-accent2">
                      Key learnings
                    </h4>
                  </div>
                  <ul className="mt-3 space-y-2">
                    {exp.learnings.map((l, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent2/60" />
                        <span>{l}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
