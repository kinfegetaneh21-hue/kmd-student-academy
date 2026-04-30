export default function SectionHeading({ kicker, title, description, align = 'left' }) {
  const center = align === 'center';
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {kicker && <span className="section-kicker">{kicker}</span>}
      <h2 className="mt-3 section-title">{title}</h2>
      {description && (
        <p className="mt-3 text-base text-slate-600 dark:text-slate-400">{description}</p>
      )}
    </div>
  );
}
