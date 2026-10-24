import { useEffect, useRef } from 'react';

/**
 * Custom cursor: a precise inner dot plus a trailing ring that eases behind it.
 * The ring grows and fills when hovering an interactive element.
 *
 * Only enabled for real pointers (mouse/trackpad). Touch devices keep the
 * native behaviour, and the effect is skipped entirely for reduced motion.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Hide the native cursor only while the custom one is active.
    document.documentElement.classList.add('has-custom-cursor');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;
    let hovering = false;
    let visible = false;

    const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]';

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }

      // Toggle the expanded state from the target under the pointer.
      const target = e.target as Element | null;
      const isInteractive = !!target?.closest?.(INTERACTIVE);
      if (isInteractive !== hovering) {
        hovering = isInteractive;
        ring.dataset.hover = isInteractive ? 'true' : 'false';
        dot.dataset.hover = isInteractive ? 'true' : 'false';
      }
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const render = () => {
      // Dot tracks tightly, ring trails with easing.
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

      raf = requestAnimationFrame(render);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('blur', onLeave);
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('blur', onLeave);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <div className="cursor-root" aria-hidden="true">
      <div ref={ringRef} className="cursor-ring" data-hover="false" />
      <div ref={dotRef} className="cursor-dot" data-hover="false" />
    </div>
  );
}
