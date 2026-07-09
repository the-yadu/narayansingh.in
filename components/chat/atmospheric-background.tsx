"use client";

export function AtmosphericBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-[-12rem] h-[26rem] w-[42rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,transparent_0%,hsl(var(--background))_78%)]" />
    </div>
  );
}
