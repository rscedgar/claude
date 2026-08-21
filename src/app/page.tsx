const styles = {
  root: "flex flex-1 flex-col items-center justify-center gap-8 px-6",
  card: "flex flex-col items-center gap-4 rounded-xl border border-border-subtle bg-surface-raised px-10 py-12 shadow-lg",
  title: "text-4xl font-bold tracking-tight text-white",
  accent: "text-congress-400",
  subtitle: "max-w-md text-center text-sm leading-6 text-ebony-300",
  swatches: "flex gap-3",
  swatchLabel: "text-xs font-medium text-ebony-300",
  badge:
    "rounded-full bg-congress-500/15 px-3 py-1 text-xs font-semibold text-congress-400 ring-1 ring-congress-500/40",
};

const palette = [
  { name: "congress-500", className: "bg-congress-500" },
  { name: "congress-700", className: "bg-congress-700" },
  { name: "ebony-800", className: "bg-ebony-800" },
  { name: "ebony-950", className: "bg-ebony-950" },
];

const BootstrapPage = () => {
  return (
    <div className={styles.root}>
      <main className={styles.card}>
        <span className={styles.badge}>Bootstrap OK — Issue #1</span>
        <h1 className={styles.title}>
          Task<span className={styles.accent}>Flow</span>
        </h1>
        <p className={styles.subtitle}>
          Proyecto inicializado con Next.js App Router, TypeScript, Tailwind v4
          y tokens de diseño dark-first (Congress Blue / Ebony Clay).
        </p>
        <div className={styles.swatches}>
          {palette.map((swatch) => (
            <div key={swatch.name} className="flex flex-col items-center gap-2">
              <div
                className={`${swatch.className} h-10 w-10 rounded-lg ring-1 ring-white/10`}
              />
              <span className={styles.swatchLabel}>{swatch.name}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BootstrapPage;
