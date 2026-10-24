import { Brain, Users, SearchCode } from 'lucide-react';
import Section from './Section';
import { about } from '../data/cv';

const icons = [Brain, Users, SearchCode];

export default function About() {
  return (
    <Section id="about" label="01. About me" title="Building software that people actually use">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-5">
          {about.paragraphs.map((p, i) => (
            <p key={i} className="text-base leading-relaxed text-muted sm:text-[17px]">
              {p}
            </p>
          ))}

          <div className="flex flex-wrap gap-2 pt-3">
            {['React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'MySQL', 'Odoo'].map((t) => (
              <span
                key={t}
                className="rounded-full border border-edge/70 bg-surface/60 px-3 py-1 font-mono text-xs text-muted transition-colors hover:border-accent/50 hover:text-accent"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {about.competencies.map((c, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={c.title}
                className="group rounded-2xl border border-edge/70 bg-card/70 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-edge/70 bg-accent/10 text-accent transition-colors group-hover:bg-accent/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {c.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{c.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
