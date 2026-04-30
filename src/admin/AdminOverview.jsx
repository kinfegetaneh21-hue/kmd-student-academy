import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import {
  Users,
  BookOpen,
  PlayCircle,
  FileText,
  Youtube,
  Crown,
  Megaphone,
  Upload,
  FileUp,
  Settings,
  ArrowRight,
  Search,
  GraduationCap,
} from 'lucide-react';
import { useData } from '../context/DataContext';

function StatCard({ icon: Icon, label, value, hint, color }) {
  return (
    <div className="card-padded">
      <div className="flex items-center justify-between">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          {hint}
        </span>
      </div>
      <div className="mt-4 font-display text-2xl font-extrabold text-slate-900 dark:text-white">
        {value}
      </div>
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</div>
    </div>
  );
}

export default function AdminOverview() {
  const { courses, videos, files, announcements } = useData();

  const freshmanCourses = useMemo(
    () => courses.filter((c) => c.year === 'freshman'),
    [courses]
  );
  const premiumCourses = useMemo(
    () => courses.filter((c) => c.year !== 'freshman'),
    [courses]
  );

  // counts of admin-uploaded materials per course
  const materialsByCourse = useMemo(() => {
    const m = new Map();
    for (const c of courses) m.set(c.id, { videos: 0, files: 0 });
    for (const v of videos) {
      if (v.courseId && m.has(v.courseId)) m.get(v.courseId).videos += 1;
    }
    for (const f of files) {
      if (f.courseId && m.has(f.courseId)) m.get(f.courseId).files += 1;
    }
    return m;
  }, [courses, videos, files]);

  const recentVideos = useMemo(() => videos.slice(0, 5), [videos]);
  const recentFiles = useMemo(() => files.slice(0, 5), [files]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">
            Admin console
          </h1>
          <p className="text-sm text-slate-500">
            Upload videos and files for any course in one place.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/admin/upload-videos" className="btn-primary">
            <Upload className="h-4 w-4" /> Upload video
          </Link>
          <Link to="/admin/upload-files" className="btn-secondary">
            <FileUp className="h-4 w-4" /> Upload file
          </Link>
          <Link to="/admin/settings" className="btn-ghost">
            <Settings className="h-4 w-4" /> Settings
          </Link>
        </div>
      </div>

      {/* Stat row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={GraduationCap}
          label="Freshman courses (free)"
          value={freshmanCourses.length}
          hint="Free"
          color="text-emerald-600 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-300"
        />
        <StatCard
          icon={Crown}
          label="Premium courses"
          value={premiumCourses.length}
          hint="Paid"
          color="text-accent-600 bg-accent-50 dark:bg-accent-950 dark:text-accent-300"
        />
        <StatCard
          icon={PlayCircle}
          label="Uploaded videos"
          value={videos.length}
          hint="Live"
          color="text-rose-600 bg-rose-50 dark:bg-rose-950 dark:text-rose-300"
        />
        <StatCard
          icon={FileText}
          label="Uploaded files"
          value={files.length}
          hint="Live"
          color="text-violet-600 bg-violet-50 dark:bg-violet-950 dark:text-violet-300"
        />
      </div>

      {/* Quick upload tiles */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Link
          to="/admin/upload-videos"
          className="card-padded group flex flex-col gap-3 transition hover:-translate-y-0.5 hover:shadow-glow"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-300">
            <Upload className="h-5 w-5" />
          </div>
          <div>
            <div className="font-display text-lg font-bold text-slate-900 dark:text-white">
              Upload video lesson
            </div>
            <p className="text-sm text-slate-500">
              Pick any of {courses.length} courses, paste a YouTube ID, set free or premium.
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:gap-2">
            Open uploader <ArrowRight className="h-4 w-4 transition" />
          </span>
        </Link>

        <Link
          to="/admin/upload-files"
          className="card-padded group flex flex-col gap-3 transition hover:-translate-y-0.5 hover:shadow-glow"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-300">
            <FileUp className="h-5 w-5" />
          </div>
          <div>
            <div className="font-display text-lg font-bold text-slate-900 dark:text-white">
              Upload course file
            </div>
            <p className="text-sm text-slate-500">
              PDFs, slides, worksheets — auto-attached to the course you choose.
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:gap-2">
            Open files panel <ArrowRight className="h-4 w-4 transition" />
          </span>
        </Link>

        <Link
          to="/admin/youtube"
          className="card-padded group flex flex-col gap-3 transition hover:-translate-y-0.5 hover:shadow-glow"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-300">
            <Youtube className="h-5 w-5" />
          </div>
          <div>
            <div className="font-display text-lg font-bold text-slate-900 dark:text-white">
              Manage YouTube library
            </div>
            <p className="text-sm text-slate-500">
              Curate the public YouTube lesson library and featured rail.
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:gap-2">
            Open library <ArrowRight className="h-4 w-4 transition" />
          </span>
        </Link>
      </div>

      {/* Freshman courses with material counts */}
      <div className="card-padded">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              Freshman courses · upload area
            </h3>
            <p className="text-sm text-slate-500">
              All 19 freshman common courses. Click upload on any row to add a video or file directly to that course.
            </p>
          </div>
          <Link to="/admin/courses" className="btn-ghost text-xs">
            <BookOpen className="h-4 w-4" /> Manage courses
          </Link>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-3 py-2">Course</th>
                <th className="px-3 py-2">Videos</th>
                <th className="px-3 py-2">Files</th>
                <th className="px-3 py-2 text-right">Upload</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {freshmanCourses.map((c) => {
                const counts = materialsByCourse.get(c.id) || { videos: 0, files: 0 };
                return (
                  <tr key={c.id} className="text-slate-700 dark:text-slate-200">
                    <td className="px-3 py-3">
                      <Link
                        to={`/courses/${c.id}`}
                        className="font-semibold text-slate-900 hover:text-brand-600 dark:text-white"
                      >
                        {c.title}
                      </Link>
                      <div className="text-xs text-slate-500">{c.code} · Freshman · Free</div>
                    </td>
                    <td className="px-3 py-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-1 text-xs font-semibold text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                        <PlayCircle className="h-3 w-3" /> {counts.videos}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                        <FileText className="h-3 w-3" /> {counts.files}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/admin/upload-videos?courseId=${encodeURIComponent(c.id)}`}
                          className="btn-secondary !px-3 !py-1.5 text-xs"
                        >
                          <Upload className="h-3.5 w-3.5" /> Video
                        </Link>
                        <Link
                          to={`/admin/upload-files?courseId=${encodeURIComponent(c.id)}`}
                          className="btn-secondary !px-3 !py-1.5 text-xs"
                        >
                          <FileUp className="h-3.5 w-3.5" /> File
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent uploads */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card-padded">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              Recent video uploads
            </h3>
            <Link to="/admin/upload-videos" className="btn-ghost text-xs">
              <Upload className="h-4 w-4" /> Add video
            </Link>
          </div>
          {recentVideos.length === 0 ? (
            <div className="mt-6 rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-700">
              No videos yet. Upload your first lesson.
            </div>
          ) : (
            <ul className="mt-4 divide-y divide-slate-200 text-sm dark:divide-slate-800">
              {recentVideos.map((v) => (
                <li key={v.id} className="flex items-center gap-3 py-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-300">
                    <PlayCircle className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-semibold text-slate-900 dark:text-white">
                      {v.title}
                    </div>
                    <div className="truncate text-xs text-slate-500">
                      {v.courseTitle || 'Unassigned'} · {v.access || 'free'}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card-padded">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              Recent file uploads
            </h3>
            <Link to="/admin/upload-files" className="btn-ghost text-xs">
              <FileUp className="h-4 w-4" /> Add file
            </Link>
          </div>
          {recentFiles.length === 0 ? (
            <div className="mt-6 rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-700">
              No files yet. Upload PDFs, slides or worksheets.
            </div>
          ) : (
            <ul className="mt-4 divide-y divide-slate-200 text-sm dark:divide-slate-800">
              {recentFiles.map((f) => (
                <li key={f.id} className="flex items-center gap-3 py-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-300">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-semibold text-slate-900 dark:text-white">
                      {f.title}
                    </div>
                    <div className="truncate text-xs text-slate-500">
                      {f.courseTitle || 'Unassigned'} · {f.size || ''} {f.type ? `· ${f.type}` : ''}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Secondary stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Users}
          label="Students"
          value="24,812"
          hint="+320 wk"
          color="text-brand-600 bg-brand-50 dark:bg-brand-950 dark:text-brand-300"
        />
        <StatCard
          icon={Megaphone}
          label="Announcements"
          value={announcements.length}
          hint="Recent"
          color="text-cyan-600 bg-cyan-50 dark:bg-cyan-950 dark:text-cyan-300"
        />
        <StatCard
          icon={Search}
          label="Searchable items"
          value={courses.length + videos.length + files.length}
          hint="Indexed"
          color="text-amber-600 bg-amber-50 dark:bg-amber-950 dark:text-amber-300"
        />
        <StatCard
          icon={Settings}
          label="System"
          value="Healthy"
          hint="OK"
          color="text-slate-700 bg-slate-100 dark:bg-slate-800 dark:text-slate-200"
        />
      </div>
    </div>
  );
}
