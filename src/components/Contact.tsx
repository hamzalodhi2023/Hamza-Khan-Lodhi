import { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Facebook, Instagram, Send, Check } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import Section from './Section';
import { profile } from '../data/cv';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const details = [
    { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: 'Phone', value: profile.phone, href: profile.phoneHref },
    { icon: MapPin, label: 'Location', value: profile.location, href: null },
    { icon: Github, label: 'GitHub', value: profile.githubHandle, href: profile.github },
  ];

  const socials = [
    { icon: Github, label: 'GitHub', href: profile.github, handle: `@${profile.githubHandle}` },
    { icon: Linkedin, label: 'LinkedIn', href: profile.linkedin, handle: profile.linkedinHandle },
    { icon: Facebook, label: 'Facebook', href: profile.facebook, handle: profile.facebookHandle },
    { icon: Instagram, label: 'Instagram', href: profile.instagram, handle: profile.instagramHandle },
  ];

  return (
    <Section id="contact" label="06. Contact" title="Let's build something together">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <p className="max-w-lg text-base leading-relaxed text-muted sm:text-[17px]">
            I&apos;m currently open to work and freelance opportunities. Whether you have a
            project in mind, a question, or just want to say hello — my inbox is always open.
          </p>

          <div className="mt-8 space-y-3">
            {details.map(({ icon: Icon, label, value, href }) => {
              const content = (
                <>
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-edge/70 bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                      {label}
                    </p>
                    <p className="truncate text-sm font-medium text-foreground transition-colors group-hover:text-accent">
                      {value}
                    </p>
                  </div>
                </>
              );

              return href ? (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-edge/70 bg-card/70 p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
                >
                  {content}
                </a>
              ) : (
                <div
                  key={label}
                  className="group flex items-center gap-4 rounded-2xl border border-edge/70 bg-card/70 p-4 backdrop-blur-md"
                >
                  {content}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA card */}
        <div className="relative overflow-hidden rounded-2xl border border-edge/70 bg-card/70 p-6 backdrop-blur-md sm:p-8">
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/15 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-accent2/15 blur-3xl" />

          <div className="relative">
            <h3 className="font-display text-2xl font-bold text-foreground">
              Ready to start?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Drop me a message and I&apos;ll get back to you as soon as possible.
            </p>

            <div className="mt-6 space-y-3">
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-[#04301b] shadow-lg shadow-[#25D366]/20 transition-all hover:-translate-y-0.5 hover:brightness-105 active:scale-95"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Chat on WhatsApp
              </a>

              <a
                href={`mailto:${profile.email}?subject=Let's%20work%20together`}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-background shadow-lg shadow-accent/20 transition-all hover:-translate-y-0.5 hover:brightness-110 active:scale-95"
              >
                <Send className="h-4 w-4" />
                Send an email
              </a>

              <button
                onClick={copyEmail}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-edge/70 bg-surface/60 px-6 py-3.5 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-accent" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4" />
                    Copy email
                  </>
                )}
              </button>
            </div>

            {/* A single row can't hold 4 cards in the narrow desktop column —
                the last one was pushed past the edge. 2×2 fits, and on small
                phones a single column keeps the handles fully readable. */}
            <div className="mt-6 grid grid-cols-1 gap-3 border-t border-edge/60 pt-6 sm:grid-cols-2">
              {socials.map(({ icon: Icon, label, href, handle }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-w-0 items-center gap-3 rounded-xl border border-edge/60 bg-surface/50 p-3 transition-all hover:border-accent/40 hover:text-accent"
                >
                  <Icon className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-accent" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-foreground">{label}</p>
                    <p className="truncate font-mono text-[10px] text-muted">{handle}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
