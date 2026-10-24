import { useEffect, useRef, useState } from 'react';
import { Menu, X, Sun, Moon, Code2 } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { navLinks, profile } from '../data/cv';
import { useActiveSection } from '../lib/useReveal';

type Props = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

const ids = navLinks.map((l) => l.href.slice(1));

export default function Navbar({ theme, toggleTheme }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const active = useActiveSection(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      role="banner"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-edge/60 bg-background/85 backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <a href="#top" className="group flex items-center gap-2 font-mono text-sm font-bold">
          <Code2 className="h-5 w-5 text-accent transition-transform duration-300 group-hover:rotate-12" />
          <span className="text-foreground">
            {profile.name.split(' ')[0].toLowerCase()}
            <span className="text-accent">.</span>
          </span>
        </a>

        {/* Desktop nav — starts at lg so links + buttons never overflow */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-accent' : 'text-muted hover:text-foreground'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-px bg-accent transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="grid h-10 w-10 place-items-center rounded-xl border border-edge/70 bg-surface/60 text-muted transition-all hover:border-accent/50 hover:text-accent active:scale-95"
          >
            {theme === 'dark' ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
          </button>

          <a
            href={profile.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="grid h-10 w-10 place-items-center rounded-xl border border-edge/70 bg-surface/60 text-muted transition-all hover:border-[#25D366]/60 hover:text-[#25D366] active:scale-95"
          >
            <WhatsAppIcon className="h-[18px] w-[18px]" />
          </a>

          <a
            href="#contact"
            className="hidden rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-background transition-transform hover:brightness-110 active:scale-95 md:block"
          >
            Hire me
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-xl border border-edge/70 bg-surface/60 text-muted transition-all hover:text-foreground active:scale-95 lg:hidden"
          >
            {open ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu — height set from real content so nothing gets clipped */}
      <div
        ref={menuRef}
        style={{ maxHeight: open ? menuRef.current?.scrollHeight : 0 }}
        className={`overflow-hidden border-t border-edge/50 bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <ul className="px-5 py-4">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium transition-colors ${
                    isActive ? 'bg-accent/10 text-accent' : 'text-muted hover:text-foreground'
                  }`}
                >
                  {link.label}
                  <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-accent' : 'bg-transparent'}`} />
                </a>
              </li>
            );
          })}
          <li className="mt-2">
            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-[#04301b] transition-transform hover:brightness-105 active:scale-95"
            >
              <WhatsAppIcon className="h-[18px] w-[18px]" />
              WhatsApp me
            </a>
          </li>
          <li className="mt-2">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-xl bg-accent px-4 py-3 text-center text-sm font-semibold text-background"
            >
              Hire me
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
