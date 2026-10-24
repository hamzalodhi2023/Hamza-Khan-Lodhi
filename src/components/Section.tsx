import type { ReactNode } from 'react';
import { useReveal } from '../lib/useReveal';

type Props = {
  id: string;
  label: string;
  title: string;
  children: ReactNode;
  className?: string;
};

export default function Section({ id, label, title, children, className = '' }: Props) {
  const { ref, visible } = useReveal<HTMLElement>();
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      ref={ref}
      aria-labelledby={headingId}
      className={`mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20 ${className}`}
    >
      <div
        className={`transition-all duration-700 ease-out ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
          {label}
        </p>
        <h2
          id={headingId}
          className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl"
        >
          {title}
        </h2>
        <div className="section-line mt-4" aria-hidden="true" />
        <div className="mt-8 sm:mt-10">{children}</div>
      </div>
    </section>
  );
}
