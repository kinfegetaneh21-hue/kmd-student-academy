import { Link } from 'react-router-dom';
import Container from '../components/ui/Container';

export default function NotFoundPage() {
  return (
    <Container className="py-24 text-center">
      <div className="mx-auto max-w-md">
        <div className="font-display text-7xl font-extrabold gradient-text">404</div>
        <h1 className="mt-4 section-title">Page not found</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          The page you\u2019re looking for doesn\u2019t exist — or has been moved.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/" className="btn-primary">Back home</Link>
          <Link to="/courses" className="btn-secondary">Browse courses</Link>
        </div>
      </div>
    </Container>
  );
}
