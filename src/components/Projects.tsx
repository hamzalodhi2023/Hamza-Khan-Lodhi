import { Github, ExternalLink, Sparkles } from 'lucide-react';
import Section from './Section';
import { projects } from '../data/cv';

export default function Projects() {
  // Single project → keep it centred instead of leaving half the row empty.
  const isSingle = projects.length === 1;

  return (
    <Section id="projects" label="04. Projects" title="Things I've built">
      <div
        className={
          isSingle
            ? 'mx-auto w-full max-w-3xl'
            : 'grid gap-6 lg:grid-cols-2'
        }
      >
        {projects.map((project) => (
          <article
            key={project.name}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-edge/70 bg-card/70 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/10"
          >
            {/* Decorative header bar */}
            <div className="flex items-center gap-2 border-b border-edge/60 bg-surface/50 px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-accent2/50" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted/40" />
              <span className="ml-auto font-mono text-[11px] text-muted">
                {project.name.toLowerCase().replace(/\s+/g, '-')}.tsx
              </span>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-xl font-bold text-foreground">
                  {project.name}
                </h3>
                <span className="flex shrink-0 items-center gap-1 rounded-full border border-edge/60 bg-surface/60 px-2.5 py-1 text-[11px] font-medium text-muted">
                  {project.featured && <Sparkles className="h-3 w-3 text-accent" />}
                  {project.status}
                </span>
              </div>

              <p className="mt-1 font-mono text-xs text-accent">{project.tagline}</p>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-edge/60 bg-surface/60 px-2 py-0.5 font-mono text-[11px] text-muted transition-colors group-hover:border-accent/25 group-hover:text-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3 border-t border-edge/60 pt-5">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-xs font-semibold text-background transition-all hover:brightness-110 active:scale-95"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Live demo
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-edge/70 bg-surface/60 px-3.5 py-2 text-xs font-semibold text-foreground transition-all hover:border-accent/50 hover:text-accent active:scale-95"
                  >
                    <Github className="h-3.5 w-3.5" />
                    Repository
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
