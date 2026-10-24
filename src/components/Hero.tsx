import { useEffect, useState } from 'react';
import { ArrowDown, Github, Linkedin, Facebook, Instagram, Mail, MapPin, Download } from 'lucide-react';
import { profile } from '../data/cv';

const ROLES = ['Full Stack Developer', 'React Engineer', 'Node.js Developer', 'Software Engineer'];

function useTypewriter(words: string[], speed = 90, pause = 1400) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex % words.length];

    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }

    if (deleting && text === '') {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
      return;
    }

    const t = setTimeout(
      () => {
        setText(
          deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)
        );
      },
      deleting ? speed / 2 : speed
    );
    return () => clearTimeout(t);
  }, [text, deleting, wordIndex, words, speed, pause]);

  return text;
}

export default function Hero() {
  const typed = useTypewriter(ROLES);

  const socials = [
    { href: profile.github, icon: Github, label: 'GitHub' },
    { href: profile.linkedin, icon: Linkedin, label: 'LinkedIn' },
    { href: profile.facebook, icon: Facebook, label: 'Facebook' },
    { href: profile.instagram, icon: Instagram, label: 'Instagram' },
    { href: `mailto:${profile.email}`, icon: Mail, label: 'Email' },
  ];

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Text */}
        <div className="order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-edge/70 bg-surface/60 px-3 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-accent" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-xs text-muted">{profile.availability}</span>
          </div>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Hi, I&apos;m{' '}
            <span className="text-gradient">Hamza</span>
            <br />
            Khan Lodhi
          </h1>

          <p className="mt-5 font-mono text-lg text-muted sm:text-xl">
            <span className="text-accent">&gt;</span> {typed}
            <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] animate-pulse bg-accent align-middle" />
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            I build modern, responsive web applications with{' '}
            <span className="text-foreground">React</span>,{' '}
            <span className="text-foreground">Next.js</span> and{' '}
            <span className="text-foreground">Node.js</span> — focused on clean, maintainable
            code and great user experiences.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-background shadow-lg shadow-accent/20 transition-all hover:-translate-y-0.5 hover:brightness-110 active:scale-95"
            >
              Get in touch
            </a>
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-edge/70 bg-surface/60 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent active:scale-95"
            >
              <Download className="h-4 w-4" />
              Download CV
            </a>

            <div className="flex items-center gap-2">
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-xl border border-edge/70 bg-surface/60 text-muted backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent active:scale-95"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <p className="mt-8 flex items-center gap-2 font-mono text-xs text-muted">
            <MapPin className="h-3.5 w-3.5 text-accent" />
            {profile.location}
          </p>
        </div>

        {/* Photo */}
        <div className="order-1 flex justify-center lg:order-2">
          <div className="relative">
            {/* Glow ring */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-accent/30 via-accent2/20 to-transparent blur-2xl" />
            <div className="relative h-56 w-56 overflow-hidden rounded-full border border-edge/70 bg-surface/50 backdrop-blur-md sm:h-72 sm:w-72 md:h-80 md:w-80">
              <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />
              <img
                src={profile.photo}
                alt={`Portrait of ${profile.name}, Software Engineer based in ${profile.location}`}
                width={800}
                height={800}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="relative h-full w-full object-cover object-top"
              />
              <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-accent/25" />
            </div>

            {/* Floating badges */}
            <div className="absolute -left-6 top-6 animate-float rounded-xl border border-edge/70 bg-surface/80 px-3 py-2 backdrop-blur-md sm:-left-10">
              <p className="font-mono text-[11px] font-semibold text-accent">{'<React />'}</p>
            </div>
            <div
              className="absolute -right-4 bottom-10 animate-float rounded-xl border border-edge/70 bg-surface/80 px-3 py-2 backdrop-blur-md sm:-right-8"
              style={{ animationDelay: '1.5s' }}
            >
              <p className="font-mono text-[11px] font-semibold text-accent2">{'{ Node.js }'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-muted transition-colors hover:text-accent sm:block"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}
