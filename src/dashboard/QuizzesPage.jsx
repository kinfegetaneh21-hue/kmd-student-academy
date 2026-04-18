import { FileCheck2, Sparkles } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function QuizzesPage() {
  const { courses } = useData();
  const quizzes = courses.flatMap((c) =>
    c.modules.flatMap((m) =>
      m.lessons.filter((l) => l.quiz).map((l) => ({ quiz: l.quiz, course: c, lesson: l }))
    )
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">Quizzes & Exams</h1>
        <p className="text-sm text-slate-500">Test yourself and build exam confidence.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quizzes.slice(0, 12).map(({ quiz, course, lesson }) => (
          <div key={`${course.id}-${quiz.id}`} className="card-padded flex flex-col">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-300">
                <FileCheck2 className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">{quiz.title}</div>
                <div className="text-xs text-slate-500">{course.title} · {lesson.title}</div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
              <span>{quiz.questions} questions · 15 min</span>
              <span className="chip-brand">Attempts: 0</span>
            </div>
            <button className="btn-primary mt-4">
              <Sparkles className="h-4 w-4" /> Start quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
