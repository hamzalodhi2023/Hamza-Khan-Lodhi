import { useEffect, useRef, useState } from 'react';

/**
 * Full-screen preloader shown while the app boots.
 *
 * It tracks real readiness signals (DOM + fonts + the hero image) with a
 * progress bar, holds briefly at 100%, then fades out. A hard timeout makes
 * sure it can never trap the visitor on a slow connection.
 */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const doneRef = useRef(false);
  const progressRef = useRef(0);

  useEffect(() => {
    let raf = 0;

    // Simulated progress that approaches (but never reaches) 100 while loading.
    const tick = () => {
      progressRef.current += (96 - progressRef.current) * 0.035;
      setProgress(Math.round(progressRef.current));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      cancelAnimationFrame(raf);

      setProgress(100);
      // Hold for a beat so the completed bar registers, then fade out.
      window.setTimeout(() => setLeaving(true), 320);
      window.setTimeout(() => onDone(), 950);
    };

    // Wait for the hero portrait so the reveal never pops in.
    const imageReady = new Promise<void>((resolve) => {
      const img = document.querySelector<HTMLImageElement>('img[fetchpriority="high"], img[src*="hamza"]');
      if (!img) return resolve();
      if (img.complete) return resolve();
      img.addEventListener('load', () => resolve(), { once: true });
      img.addEventListener('error', () => resolve(), { once: true });
    });

    const fontsReady =
      typeof document !== 'undefined' && 'fonts' in document
        ? (document as Document & { fonts: FontFaceSet }).fonts.ready.catch(() => undefined)
        : Promise.resolve();

    const ready = Promise.allSettled([imageReady, fontsReady]).then(() => undefined);

    if (document.readyState === 'complete') {
      ready.then(finish);
    } else {
      window.addEventListener('load', () => ready.then(finish), { once: true });
    }

    // Safety net — never block the site for more than 4 seconds.
    const failsafe = window.setTimeout(finish, 4000);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(failsafe);
      window.removeEventListener('load', finish);
    };
  }, [onDone]);

  return (
    <div
      className={`preloader ${leaving ? 'preloader--leaving' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="preloader__grid" aria-hidden="true" />

      <div className="preloader__inner">
        <div className="preloader__logo">
          <span className="preloader__bracket">&lt;</span>
          <span className="preloader__mark">HL</span>
          <span className="preloader__bracket">/&gt;</span>
        </div>

        <p className="preloader__name">Hamza Khan Lodhi</p>
        <p className="preloader__role">Software Engineer</p>

        <div className="preloader__bar" aria-hidden="true">
          <div className="preloader__fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="preloader__meta" aria-hidden="true">
          <span className="preloader__percent">
            {String(progress).padStart(3, '0')}%
          </span>
          <span className="preloader__status">
            {progress >= 100 ? 'ready' : 'initializing'}
          </span>
        </div>
      </div>
    </div>
  );
}
