import Section from './Section';
import { skillGroups, marqueeSkills } from '../data/cv';

export default function Skills() {
  return (
    <Section id="skills" label="02. Skills" title="The stack I work with">
      {/* Marquee strip */}
      <div className="relative mb-10 overflow-hidden rounded-2xl border border-edge/70 bg-surface/50 py-4 backdrop-blur-md">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
        <div className="flex w-max animate-marquee gap-8 pr-8">
          {[...marqueeSkills, ...marqueeSkills].map((s, i) => (
            <span key={i} className="flex shrink-0 items-center gap-2 font-mono text-sm text-muted">
              <span className="h-1 w-1 rounded-full bg-accent" />
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <div
            key={group.category}
            className="group rounded-2xl border border-edge/70 bg-card/70 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-semibold text-foreground">
                {group.category}
              </h3>
              <span className="font-mono text-xs text-muted">
                {String(group.skills.length).padStart(2, '0')}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-lg border border-edge/60 bg-surface/60 px-2.5 py-1 text-xs font-medium text-muted transition-colors group-hover:border-accent/25 group-hover:text-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
