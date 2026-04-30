import { useData } from '../context/DataContext';
import YouTubeCard from '../components/youtube/YouTubeCard';

export default function DashboardVideosPage() {
  const { videos } = useData();
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">Video Lessons</h1>
        <p className="text-sm text-slate-500">YouTube lessons curated for your year.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v) => (
          <YouTubeCard key={v.id} video={v} embedded />
        ))}
      </div>
    </div>
  );
}
