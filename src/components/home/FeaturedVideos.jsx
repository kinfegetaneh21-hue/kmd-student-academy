import { Link } from 'react-router-dom';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import YouTubeCard from '../youtube/YouTubeCard';
import { useData } from '../../context/DataContext';
import { Youtube } from 'lucide-react';
import { site } from '../../data/siteConfig';

export default function FeaturedVideos() {
  const { videos } = useData();
  const featured = videos.slice(0, 6);
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            kicker="Featured Video Lessons"
            title="Watch the best of KMD, for free."
            description="Hand-picked YouTube lessons from our official channel — updated every week."
          />
          <div className="flex gap-2">
            <Link to="/videos" className="btn-outline">All videos →</Link>
            <a
              href={site.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Youtube className="h-4 w-4" /> Open channel
            </a>
          </div>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((v) => (
            <YouTubeCard key={v.id} video={v} embedded />
          ))}
        </div>
      </Container>
    </section>
  );
}
