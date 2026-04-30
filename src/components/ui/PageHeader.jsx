import Container from './Container';

export default function PageHeader({ kicker, title, description, children }) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-slate-50 to-white dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <Container className="relative py-16 sm:py-20">
        {kicker && <span className="section-kicker">{kicker}</span>}
        <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">{description}</p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </Container>
    </section>
  );
}
