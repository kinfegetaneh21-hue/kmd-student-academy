import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { courses as seedCourses } from '../data/courses.js';
import { featuredVideos as seedVideos } from '../data/youtube.js';
import { announcements as seedAnnouncements } from '../data/announcements.js';
import { plans as seedPlans } from '../data/plans.js';

/**
 * Runtime content store. The admin pages mutate this via the exposed
 * methods. Persisted to localStorage so refreshes keep state.
 */

const DataContext = createContext(null);
const KEY = 'kmd-data-v2';

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function DataProvider({ children }) {
  const initial = load();
  const [courses, setCourses] = useState(initial?.courses || seedCourses);
  const [videos, setVideos] = useState(initial?.videos || seedVideos);
  const [files, setFiles] = useState(initial?.files || []);
  const [announcements, setAnnouncements] = useState(initial?.announcements || seedAnnouncements);
  const [plans, setPlans] = useState(initial?.plans || seedPlans);
  const [enrollments, setEnrollments] = useState(initial?.enrollments || {});
  const [progress, setProgress] = useState(initial?.progress || {});

  useEffect(() => {
    localStorage.setItem(
      KEY,
      JSON.stringify({ courses, videos, files, announcements, plans, enrollments, progress })
    );
  }, [courses, videos, files, announcements, plans, enrollments, progress]);

  // ---- Courses ----
  const addCourse = useCallback((c) => setCourses((list) => [c, ...list]), []);
  const updateCourse = useCallback((course) => {
    setCourses((list) => list.map((c) => (c.id === course.id ? { ...c, ...course } : c)));
  }, []);
  const removeCourse = useCallback(
    (id) => setCourses((list) => list.filter((c) => c.id !== id)),
    []
  );

  // Deep-mutation helpers for course → module → lesson → files/notes.
  const addModule = useCallback((courseId, moduleData) => {
    const mod = { id: `mod-${Date.now()}`, lessons: [], ...moduleData };
    setCourses((list) =>
      list.map((c) => (c.id === courseId ? { ...c, modules: [...(c.modules || []), mod] } : c))
    );
  }, []);

  const addLesson = useCallback((courseId, moduleId, lessonData) => {
    const les = {
      id: `les-${Date.now()}`,
      duration: '12:40',
      notes: [],
      files: [],
      videoUrl: null,
      youtubeId: null,
      ...lessonData,
    };
    setCourses((list) =>
      list.map((c) =>
        c.id !== courseId
          ? c
          : {
              ...c,
              modules: (c.modules || []).map((m) =>
                m.id !== moduleId ? m : { ...m, lessons: [...(m.lessons || []), les] }
              ),
            }
      )
    );
  }, []);

  const addLessonFile = useCallback((courseId, moduleId, lessonId, fileData) => {
    const file = { id: `file-${Date.now()}`, ...fileData };
    setCourses((list) =>
      list.map((c) =>
        c.id !== courseId
          ? c
          : {
              ...c,
              modules: (c.modules || []).map((m) =>
                m.id !== moduleId
                  ? m
                  : {
                      ...m,
                      lessons: (m.lessons || []).map((l) =>
                        l.id !== lessonId ? l : { ...l, files: [...(l.files || []), file] }
                      ),
                    }
              ),
            }
      )
    );
  }, []);

  const updateLesson = useCallback((courseId, moduleId, lessonId, patch) => {
    setCourses((list) =>
      list.map((c) =>
        c.id !== courseId
          ? c
          : {
              ...c,
              modules: (c.modules || []).map((m) =>
                m.id !== moduleId
                  ? m
                  : {
                      ...m,
                      lessons: (m.lessons || []).map((l) =>
                        l.id !== lessonId ? l : { ...l, ...patch }
                      ),
                    }
              ),
            }
      )
    );
  }, []);

  // ---- Videos ----
  const addVideo = useCallback((v) => setVideos((list) => [v, ...list]), []);
  const updateVideo = useCallback((video) => {
    setVideos((list) => list.map((v) => (v.id === video.id ? { ...v, ...video } : v)));
  }, []);
  const removeVideo = useCallback(
    (id) => setVideos((list) => list.filter((v) => v.id !== id)),
    []
  );

  // ---- Files ----
  const addFile = useCallback((f) => setFiles((list) => [f, ...list]), []);
  const removeFile = useCallback(
    (id) => setFiles((list) => list.filter((f) => f.id !== id)),
    []
  );

  // ---- Announcements ----
  const addAnnouncement = useCallback((a) => setAnnouncements((list) => [a, ...list]), []);
  const removeAnnouncement = useCallback(
    (id) => setAnnouncements((list) => list.filter((a) => a.id !== id)),
    []
  );

  // ---- Plans ----
  const updatePlan = useCallback((plan) => {
    setPlans((list) => list.map((p) => (p.id === plan.id ? { ...p, ...plan } : p)));
  }, []);

  // ---- Enrollments & progress ----
  const enroll = useCallback((userId, courseId) => {
    setEnrollments((m) => {
      const list = m[userId] || [];
      if (list.includes(courseId)) return m;
      return { ...m, [userId]: [...list, courseId] };
    });
  }, []);

  const markLessonWatched = useCallback((userId, courseId, lessonId) => {
    setProgress((m) => {
      const key = `${userId}:${courseId}`;
      const seen = new Set(m[key] || []);
      seen.add(lessonId);
      return { ...m, [key]: Array.from(seen) };
    });
  }, []);

  const getProgress = useCallback(
    (userId, courseId) => {
      const list = progress[`${userId}:${courseId}`] || [];
      return list.length;
    },
    [progress]
  );

  const value = useMemo(
    () => ({
      courses,
      videos,
      files,
      announcements,
      plans,
      enrollments,
      progress,
      addCourse,
      updateCourse,
      removeCourse,
      addModule,
      addLesson,
      addLessonFile,
      updateLesson,
      addVideo,
      updateVideo,
      removeVideo,
      addFile,
      removeFile,
      addAnnouncement,
      removeAnnouncement,
      updatePlan,
      enroll,
      markLessonWatched,
      getProgress,
    }),
    [
      courses,
      videos,
      files,
      announcements,
      plans,
      enrollments,
      progress,
      addCourse,
      updateCourse,
      removeCourse,
      addModule,
      addLesson,
      addLessonFile,
      updateLesson,
      addVideo,
      updateVideo,
      removeVideo,
      addFile,
      removeFile,
      addAnnouncement,
      removeAnnouncement,
      updatePlan,
      enroll,
      markLessonWatched,
      getProgress,
    ]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
};
