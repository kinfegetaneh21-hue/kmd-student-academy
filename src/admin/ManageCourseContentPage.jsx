import { useMemo, useState } from 'react';
import { BookOpen, FileText, FolderPlus, Play, Plus, Upload, Youtube } from 'lucide-react';
import { useData } from '../context/DataContext';
import Badge from '../components/ui/Badge';

function formatSize(bytes) {
  if (!bytes && bytes !== 0) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function extOf(name = '') {
  const i = name.lastIndexOf('.');
  return i >= 0 ? name.slice(i + 1).toLowerCase() : 'file';
}

async function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ManageCourseContentPage() {
  const { courses, addModule, addLesson, addLessonFile, updateLesson } = useData();
  const [courseId, setCourseId] = useState(courses[0]?.id ?? '');
  const course = useMemo(() => courses.find((c) => c.id === courseId), [courses, courseId]);
  const modules = course?.modules ?? [];

  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [lessonDraft, setLessonDraft] = useState({ moduleId: '', title: '', youtubeId: '', duration: '12:40' });
  const [fileDraft, setFileDraft] = useState({ moduleId: '', lessonId: '' });
  const [toast, setToast] = useState('');

  const flash = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2200);
  };

  const submitModule = (e) => {
    e.preventDefault();
    if (!course || !newModuleTitle.trim()) return;
    addModule(course.id, { title: newModuleTitle.trim() });
    setNewModuleTitle('');
    flash('Module added');
  };

  const submitLesson = (e) => {
    e.preventDefault();
    if (!course || !lessonDraft.moduleId || !lessonDraft.title.trim()) return;
    addLesson(course.id, lessonDraft.moduleId, {
      title: lessonDraft.title.trim(),
      youtubeId: lessonDraft.youtubeId.trim() || null,
      duration: lessonDraft.duration || '12:40',
    });
    setLessonDraft({ moduleId: lessonDraft.moduleId, title: '', youtubeId: '', duration: '12:40' });
    flash('Lesson added');
  };

  const submitFile = async (e) => {
    e.preventDefault();
    const { moduleId, lessonId } = fileDraft;
    const input = e.currentTarget.elements.file;
    const file = input?.files?.[0];
    if (!course || !moduleId || !lessonId || !file) return;
    const dataUrl = await fileToDataUrl(file);
    addLessonFile(course.id, moduleId, lessonId, {
      title: file.name,
      type: extOf(file.name),
      size: formatSize(file.size),
      dataUrl,
    });
    input.value = '';
    flash(`Uploaded ${file.name}`);
  };

  const setLessonVideoUrl = (moduleId, lessonId, videoUrl) => {
    updateLesson(course.id, moduleId, lessonId, { videoUrl, youtubeId: null });
  };

  const setLessonYoutubeId = (moduleId, lessonId, youtubeId) => {
    updateLesson(course.id, moduleId, lessonId, { youtubeId, videoUrl: null });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">Course content</h1>
        <p className="text-sm text-slate-500">
          Pick a course, add modules, add lessons, and upload videos (YouTube or direct URL) + files (PDFs, slides).
        </p>
      </div>

      <div className="card-padded">
        <label className="block">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Course</span>
          <select className="input mt-1" value={courseId} onChange={(e) => setCourseId(e.target.value)}>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.year === 'freshman' ? '🟢 FREE · ' : '🟡 PREMIUM · '}
                {c.title} ({c.code})
              </option>
            ))}
          </select>
        </label>
        {course && (
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
            <Badge variant={course.access === 'free' ? 'success' : 'accent'}>{course.access}</Badge>
            <span>{course.level}</span>
            <span>·</span>
            <span>{modules.length} modules</span>
            <span>·</span>
            <span>{modules.reduce((n, m) => n + (m.lessons?.length ?? 0), 0)} lessons</span>
          </div>
        )}
      </div>

      {toast && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
          {toast}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <form onSubmit={submitModule} className="card-padded space-y-3">
          <div className="flex items-center gap-2">
            <FolderPlus className="h-4 w-4 text-brand-500" />
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">New module</h3>
          </div>
          <input
            required
            className="input"
            placeholder="e.g. Module 1: Listening & Speaking"
            value={newModuleTitle}
            onChange={(e) => setNewModuleTitle(e.target.value)}
          />
          <button className="btn-primary w-full" type="submit">
            <Plus className="h-4 w-4" /> Add module
          </button>
        </form>

        <form onSubmit={submitLesson} className="card-padded space-y-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-brand-500" />
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">New lesson</h3>
          </div>
          <select
            required
            className="input"
            value={lessonDraft.moduleId}
            onChange={(e) => setLessonDraft({ ...lessonDraft, moduleId: e.target.value })}
          >
            <option value="">Select module…</option>
            {modules.map((m) => (
              <option key={m.id} value={m.id}>{m.title}</option>
            ))}
          </select>
          <input
            required
            className="input"
            placeholder="Lesson title"
            value={lessonDraft.title}
            onChange={(e) => setLessonDraft({ ...lessonDraft, title: e.target.value })}
          />
          <input
            className="input"
            placeholder="YouTube ID (optional, e.g. dQw4w9WgXcQ)"
            value={lessonDraft.youtubeId}
            onChange={(e) => setLessonDraft({ ...lessonDraft, youtubeId: e.target.value })}
          />
          <input
            className="input"
            placeholder="Duration (e.g. 12:40)"
            value={lessonDraft.duration}
            onChange={(e) => setLessonDraft({ ...lessonDraft, duration: e.target.value })}
          />
          <button className="btn-primary w-full" type="submit">
            <Plus className="h-4 w-4" /> Add lesson
          </button>
        </form>

        <form onSubmit={submitFile} className="card-padded space-y-3">
          <div className="flex items-center gap-2">
            <Upload className="h-4 w-4 text-brand-500" />
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">Upload file to lesson</h3>
          </div>
          <select
            required
            className="input"
            value={fileDraft.moduleId}
            onChange={(e) => setFileDraft({ moduleId: e.target.value, lessonId: '' })}
          >
            <option value="">Select module…</option>
            {modules.map((m) => (
              <option key={m.id} value={m.id}>{m.title}</option>
            ))}
          </select>
          <select
            required
            className="input"
            value={fileDraft.lessonId}
            onChange={(e) => setFileDraft({ ...fileDraft, lessonId: e.target.value })}
            disabled={!fileDraft.moduleId}
          >
            <option value="">Select lesson…</option>
            {(modules.find((m) => m.id === fileDraft.moduleId)?.lessons ?? []).map((l) => (
              <option key={l.id} value={l.id}>{l.title}</option>
            ))}
          </select>
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 px-4 py-6 text-sm text-slate-500 dark:border-slate-700">
            <Upload className="h-4 w-4" /> Choose file to upload
            <input required name="file" type="file" className="hidden" />
          </label>
          <button className="btn-primary w-full" type="submit">
            <Plus className="h-4 w-4" /> Upload file
          </button>
          <p className="text-xs text-slate-500">
            Files are saved in your browser. For videos larger than a few MB, use the YouTube ID or URL fields instead.
          </p>
        </form>
      </div>

      <div className="card-padded !p-0 overflow-hidden">
        <div className="border-b border-slate-200 p-4 dark:border-slate-800">
          <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
            {course?.title ?? 'Course content'}
          </h3>
        </div>
        {modules.length === 0 ? (
          <p className="p-6 text-sm text-slate-500">No modules yet. Add one above to get started.</p>
        ) : (
          <ul className="divide-y divide-slate-200 dark:divide-slate-800">
            {modules.map((m) => (
              <li key={m.id} className="p-4">
                <div className="mb-3 font-display text-sm font-bold text-slate-900 dark:text-white">{m.title}</div>
                <ul className="space-y-3">
                  {(m.lessons ?? []).map((l) => (
                    <li key={l.id} className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                      <div className="flex flex-wrap items-center gap-2">
                        <Play className="h-4 w-4 text-brand-500" />
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">{l.title}</span>
                        <span className="text-xs text-slate-500">· {l.duration}</span>
                        {l.youtubeId && (
                          <Badge variant="accent">
                            <Youtube className="mr-1 h-3 w-3" /> YouTube
                          </Badge>
                        )}
                        {l.videoUrl && <Badge variant="success">Video URL</Badge>}
                      </div>
                      <div className="mt-2 grid gap-2 sm:grid-cols-2">
                        <input
                          className="input text-xs"
                          placeholder="YouTube ID"
                          defaultValue={l.youtubeId ?? ''}
                          onBlur={(e) => e.target.value !== (l.youtubeId ?? '') && setLessonYoutubeId(m.id, l.id, e.target.value.trim() || null)}
                        />
                        <input
                          className="input text-xs"
                          placeholder="Direct video URL (mp4/webm)"
                          defaultValue={l.videoUrl ?? ''}
                          onBlur={(e) => e.target.value !== (l.videoUrl ?? '') && setLessonVideoUrl(m.id, l.id, e.target.value.trim() || null)}
                        />
                      </div>
                      {(l.files?.length ?? 0) > 0 && (
                        <ul className="mt-3 space-y-1.5">
                          {l.files.map((f) => (
                            <li key={f.id} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                              <FileText className="h-3.5 w-3.5 text-accent-500" />
                              {f.dataUrl ? (
                                <a
                                  className="font-semibold hover:underline"
                                  href={f.dataUrl}
                                  download={f.title}
                                >
                                  {f.title}
                                </a>
                              ) : (
                                <span className="font-semibold">{f.title}</span>
                              )}
                              <span className="text-slate-400">· {f.size} · {String(f.type).toUpperCase()}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
