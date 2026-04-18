import { Search } from 'lucide-react';
import { academicYears, departments } from '../../data/siteConfig';

export default function CourseFilters({ q, setQ, year, setYear, dept, setDept, access, setAccess }) {
  return (
    <div className="card-padded flex flex-col gap-3 lg:flex-row lg:items-center">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="input pl-9"
          placeholder="Search course title, code or instructor…"
        />
      </div>
      <select value={year} onChange={(e) => setYear(e.target.value)} className="input !w-full lg:!w-48">
        <option value="">All years</option>
        {academicYears.map((y) => (
          <option key={y.id} value={y.id}>
            {y.label}
          </option>
        ))}
      </select>
      <select value={dept} onChange={(e) => setDept(e.target.value)} className="input !w-full lg:!w-56">
        <option value="">All departments</option>
        {departments.map((d) => (
          <option key={d.id} value={d.id}>
            {d.label}
          </option>
        ))}
      </select>
      {setAccess && (
        <select value={access} onChange={(e) => setAccess(e.target.value)} className="input !w-full lg:!w-40">
          <option value="">All access</option>
          <option value="free">Free</option>
          <option value="premium">Premium</option>
        </select>
      )}
    </div>
  );
}
