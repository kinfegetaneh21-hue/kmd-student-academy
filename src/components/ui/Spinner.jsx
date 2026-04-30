export default function Spinner({ size = 20 }) {
  return (
    <span
      className="inline-block animate-spin rounded-full border-2 border-slate-200 border-t-brand-600 align-middle"
      style={{ width: size, height: size }}
      aria-label="Loading"
    />
  );
}
