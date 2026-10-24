import { useEffect, useState } from 'react';
import { ArrowUp, Heart, Github, Linkedin, Facebook, Instagram, Mail } from 'lucide-react';
import { profile } from '../data/cv';

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <footer
      role="contentinfo"
      className="relative border-t border-edge/60 bg-surface/40 backdrop-blur-md"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div>
            <p className="font-display text-lg font-bold text-foreground">
              Hamza Khan Lodhi<span className="text-accent">.</span>
            </p>
            <p className="mt-1 font-mono text-xs text-muted">
              Built with React, Three.js &amp; Tailwind CSS
            </p>
          </div>

          <div className="flex items-center gap-2">
            {[
              { icon: Github, href: profile.github, label: 'GitHub' },
              { icon: Linkedin, href: profile.linkedin, label: 'LinkedIn' },
              { icon: Facebook, href: profile.facebook, label: 'Facebook' },
              { icon: Instagram, href: profile.instagram, label: 'Instagram' },
              { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-xl border border-edge/70 bg-surface/60 text-muted transition-all hover:border-accent/50 hover:text-accent active:scale-95"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-edge/60 pt-6 sm:flex-row">
          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 font-mono text-xs text-muted">
            Made with <Heart className="h-3 w-3 fill-accent text-accent" /> in Karachi
          </p>
        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className={`fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center rounded-full border border-edge/70 bg-surface/80 text-muted shadow-lg backdrop-blur-md transition-all duration-300 hover:border-accent/50 hover:text-accent active:scale-95 ${
          showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
}
