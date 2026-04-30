import { useMemo, useState } from 'react';
import Container from '../components/ui/Container';
import PageHeader from '../components/ui/PageHeader';
import YouTubeCard from '../components/youtube/YouTubeCard';
import { useData } from '../context/DataContext';
import { academicYears } from '../data/siteConfig';
import { Search, Youtube } from 'lucide-react';
import { site } from '../data/siteConfig';
import Empty from '../components/ui/Empty';

export default function VideosPage() {
  const { videos } = useData();
  const [q, setQ] = useState('');
  const [year, setYear] = useState('');
  const [access, setAccess] = useState('');

  const list = useMemo(() => {
    return videos.filter((v) => {
      if (year && v.year !== year) return false;
      if (access && v.access !== access) return false;
      if (q) {
        const s = q.toLowerCase();
        return v.title.toLowerCase().includes(s) || v.tag.toLowerCase().includes(s);
      }
      return true;
    });
  }, [videos, q, year, access]);

  return (
    <>
      <PageHeader
        kicker="YouTube Video Library"
        title="All our lessons, one beautiful library."
        description="Free & premium YouTube lessons — search, filter and watch embedded, without leaving the page."
      >
        <a
          href={site.social.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          <Youtube className="h-4 w-4" /> Open our YouTube channel
        </a>
      </PageHeader>
      <Container className="-mt-10 py-6">
        <div className="card-padded flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input className="input pl-9" placeholder="Search lessons…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <select value={year} onChange={(e) => setYear(e.target.value)} className="input lg:!w-48">
            <option value="">All years</option>
            {academicYears.map((y) => (
              <option key={y.id} value={y.id}>
                {y.label}
              </option>
            ))}
          </select>
          <select value={access} onChange={(e) => setAccess(e.target.value)} className="input lg:!w-40">
            <option value="">All access</option>
            <option value="free">Free</option>
            <option value="premium">Premium</option>
          </select>
        </div>
      </Container>
      <Container className="pb-20">
        {list.length === 0 ? (
          <Empty title="No videos match your filters." />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((v) => (
              <YouTubeCard key={v.id} video={v} embedded />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
