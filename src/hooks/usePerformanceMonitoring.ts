// Lightweight no-op performance monitoring hook to avoid invalid React hook usage issues
// This implementation intentionally avoids using React hooks to prevent "Invalid hook call" caused by duplicate React instances or cache mismatch.

export function usePerformanceMonitoring(): void {
  if (typeof window === "undefined") return;
  // Basic, safe logging in dev only
  if (import.meta.env?.DEV) {
    // Defer to next tick to avoid blocking render
    setTimeout(() => {
      try {
        const t = window.performance?.now?.();
        // eslint-disable-next-line no-console
        console.debug("usePerformanceMonitoring: init at", t);
      } catch {
        // no-op
      }
    }, 0);
  }
}

export default usePerformanceMonitoring;
