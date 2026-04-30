import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Clock,
  Users,
  Star,
  PlayCircle,
  CheckCircle2,
  Lock,
  Download,
  FileText,
  BookOpen,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import Container from '../components/ui/Container';
import Badge from '../components/ui/Badge';
import LockOverlay from '../components/ui/LockOverlay';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { youtubeThumb } from '../data/youtube';
import { lessonsOfCourse } from '../data/courses';

export default function CourseDetailPage() {
  const { id } = useParams();
  const { courses, videos, files, enroll, markLessonWatched } = useData();
  const { user, isAuthenticated, isPremium } = useAuth();
  const course = courses.find((c) => c.id === id);
  const [activeLesson, setActiveLesson] = useState(null);
  const [openModule, setOpenModule] = useState({});

  useEffect(() => {
    setActiveLesson(null);
    setOpenModule({});
  }, [id]);

  const lessons = useMemo(() => (course ? lessonsOfCourse(course) : []), [course]);
  const current = activeLesson || lessons[0];
  const adminVideos = useMemo(
    () => (course ? videos.filter((v) => v.courseId === course.id) : []),
    [videos, course]
  );
  const adminFiles = useMemo(
    () => (course ? files.filter((f) => f.courseId === course.id) : []),
    [files, course]
  );

  if (!course) {
    return (
      <Container className="py-24 text-center">
        <h1 className="section-title">Course not found</h1>
        <p className="mt-3 text-slate-600">The course you\u2019re looking for doesn\u2019t exist.</p>
        <Link to="/courses" className="btn-primary mt-6">Back to courses</Link>
      </Container>
    );
  }

  const locked = course.access === 'premium' && !isPremium;

  const toggleModule = (mid) => setOpenModule((m) => ({ ...m, [mid]: !m[mid] }));

  const play = (l) => {
    if (locked || !l) return;
    setActiveLesson(l);
    if (user) markLessonWatched(user.id, course.id, l.id);
  };

  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-slate-900 via-slate-900 to-brand-900 text-white dark:border-slate-800">
        <div className="absolute inset-0 bg-hero-radial opacity-60" />
        <Container className="relative grid gap-10 py-14 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={course.access === 'free' ? 'success' : 'accent'}>
                {course.access === 'premium' && <Lock className="h-3 w-3" />}
                {course.access === 'free' ? 'Free' : 'Premium'}
              </Badge>
              <Badge variant="brand">{course.level}</Badge>
              <Badge variant="slate">{course.code}</Badge>
            </div>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              {course.title}
            </h1>
            <p className="mt-3 max-w-2xl text-white/80">{course.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-white/80">
              <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {course.hours} hours</span>
              <span className="inline-flex items-center gap-1.5"><PlayCircle className="h-4 w-4" /> {lessons.length} lessons</span>
              <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4" /> {course.students.toLocaleString()} students</span>
              <span className="inline-flex items-center gap-1.5 text-amber-400"><Star className="h-4 w-4 fill-current" /> {course.rating}</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {locked ? (
                <Link to="/pricing" className="btn-accent">
                  <Sparkles className="h-4 w-4" /> Upgrade to unlock
                </Link>
              ) : (
                <button
                  onClick={() => {
                    if (!isAuthenticated || !lessons[0]) return;
                    enroll(user.id, course.id);
                    play(lessons[0]);
                  }}
                  disabled={lessons.length === 0}
                  className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <PlayCircle className="h-4 w-4" />{' '}
                  {lessons.length === 0 ? 'No lessons yet' : 'Start learning'}
                </button>
              )}
              <Link to="/courses" className="btn-secondary !bg-white/10 !text-white !ring-white/20 hover:!bg-white/20">
                Back to catalog
              </Link>
            </div>
          </div>
          <div className="relative lg:col-span-5">
            <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
              <div className="relative aspect-video">
                {current?.youtubeId && !locked ? (
                  <iframe
                    title={current.title}
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${current.youtubeId}?rel=0`}
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover" />
                )}
                {locked && <LockOverlay />}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container className="grid gap-10 py-14 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <h2 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">What you\u2019ll learn</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {course.outcomes.map((o) => (
              <li key={o} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" /> {o}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 font-display text-2xl font-extrabold text-slate-900 dark:text-white">Course content</h2>
          <div className="mt-4 space-y-3">
            {course.modules.map((m) => {
              const open = openModule[m.id];
              return (
                <div key={m.id} className="card overflow-hidden">
                  <button
                    onClick={() => toggleModule(m.id)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300">
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white">{m.title}</div>
                        <div className="text-xs text-slate-500">{m.lessons.length} lessons</div>
                      </div>
                    </div>
                    <ChevronDown className={`h-5 w-5 text-slate-400 transition ${open ? 'rotate-180' : ''}`} />
                  </button>
                  {open && (
                    <ul className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/60">
                      {m.lessons.map((l) => (
                        <li key={l.id}>
                          <button
                            onClick={() => play(l)}
                            className="flex w-full items-center gap-3 border-b border-slate-200 px-5 py-3 text-left transition last:border-b-0 hover:bg-white dark:border-slate-800 dark:hover:bg-slate-900"
                          >
                            <img src={youtubeThumb(l.youtubeId)} alt="" className="h-10 w-16 rounded-md object-cover" />
                            <div className="min-w-0 flex-1">
                              <div className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">{l.title}</div>
                              <div className="text-xs text-slate-500">{l.duration} · {l.notes.length} notes · {l.files.length} files</div>
                            </div>
                            {locked ? (
                              <Lock className="h-4 w-4 text-slate-400" />
                            ) : (
                              <PlayCircle className="h-5 w-5 text-brand-500" />
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>

          {(adminVideos.length > 0 || adminFiles.length > 0) && (
            <div className="mt-10">
              <h2 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">
                Added by your instructors
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Extra videos and files uploaded by admin for this course.
              </p>

              {adminVideos.length > 0 && (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {adminVideos.map((v) => (
                    <button
                      key={v.id}
                      onClick={() =>
                        !locked &&
                        play({
                          id: v.id,
                          title: v.title,
                          youtubeId: v.youtubeId,
                          duration: v.duration || '—',
                          notes: [],
                          files: [],
                        })
                      }
                      className="card overflow-hidden text-left transition hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      <div className="relative aspect-video">
                        <img
                          src={`https://img.youtube.com/vi/${v.youtubeId}/mqdefault.jpg`}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/30">
                          <PlayCircle className="h-10 w-10 text-white" />
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-2">
                          <Badge variant={v.access === 'free' ? 'success' : 'accent'}>{v.access}</Badge>
                          {v.tag && <Badge variant="slate">{v.tag}</Badge>}
                        </div>
                        <div className="mt-2 truncate font-semibold text-slate-900 dark:text-white">{v.title}</div>
                        {v.description && (
                          <div className="mt-1 line-clamp-2 text-xs text-slate-500">{v.description}</div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {adminFiles.length > 0 && (
                <ul className="mt-4 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-950">
                  {adminFiles.map((f) => (
                    <li key={f.id} className="flex items-center gap-4 p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-50 text-accent-600 dark:bg-accent-950 dark:text-accent-300">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-semibold text-slate-900 dark:text-white">{f.title}</div>
                        <div className="text-xs text-slate-500">
                          {f.size} · {(f.type || 'pdf').toUpperCase()}
                        </div>
                      </div>
                      <Badge variant={f.access === 'free' ? 'success' : 'accent'}>{f.access}</Badge>
                      <button className="btn-ghost !px-2 !py-1 text-xs">
                        <Download className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <aside className="space-y-4 lg:col-span-4">
          <div className="card-padded">
            <div className="flex items-center gap-3">
              <img
                src={`https://i.pravatar.cc/60?u=${encodeURIComponent(course.instructor)}`}
                alt={course.instructor}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">{course.instructor}</div>
                <div className="text-xs text-slate-500">Senior lecturer · Ethiopia</div>
              </div>
            </div>
          </div>
          <div className="card-padded">
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">Materials</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {current?.notes?.map((n) => (
                <li key={n.id} className="flex items-center justify-between gap-3">
                  <span className="flex min-w-0 items-center gap-2 text-slate-700 dark:text-slate-200">
                    <FileText className="h-4 w-4 text-brand-500" />
                    <span className="truncate">{n.title}</span>
                  </span>
                  <button className="btn-ghost !px-2 !py-1 text-xs">
                    <Download className="h-3.5 w-3.5" /> {n.size}
                  </button>
                </li>
              ))}
              {current?.files?.map((n) => (
                <li key={n.id} className="flex items-center justify-between gap-3">
                  <span className="flex min-w-0 items-center gap-2 text-slate-700 dark:text-slate-200">
                    <FileText className="h-4 w-4 text-accent-500" />
                    <span className="truncate">{n.title}</span>
                  </span>
                  <button className="btn-ghost !px-2 !py-1 text-xs">
                    <Download className="h-3.5 w-3.5" /> {n.size}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {locked && (
            <div className="card-padded bg-gradient-to-br from-brand-600 to-accent-500 text-white">
              <h3 className="font-display text-base font-bold">Unlock this course</h3>
              <p className="mt-1 text-sm text-white/85">Premium starts at just 299 ETB / month.</p>
              <Link to="/pricing" className="btn mt-4 w-full bg-white text-brand-700 hover:bg-slate-100">
                See plans
              </Link>
            </div>
          )}
        </aside>
      </Container>
    </>
  );
}
