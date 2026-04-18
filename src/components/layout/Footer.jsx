import { Link } from 'react-router-dom';
import { Youtube, Facebook, Instagram, Send, Phone, Mail, MapPin } from 'lucide-react';
import Logo from '../ui/Logo';
import Container from '../ui/Container';
import { site } from '../../data/siteConfig';

const groups = [
  {
    title: 'Learn',
    links: [
      { to: '/freshman', label: 'Freshman Free' },
      { to: '/premium', label: 'Premium Courses' },
      { to: '/videos', label: 'Video Library' },
      { to: '/resources', label: 'Resources' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/about', label: 'About Us' },
      { to: '/pricing', label: 'Pricing' },
      { to: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { to: '/terms', label: 'Terms' },
      { to: '/privacy', label: 'Privacy' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-slate-600 dark:text-slate-400">{site.description}</p>
            <form
              className="mt-5 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thanks! You are on the list.');
              }}
            >
              <input type="email" required placeholder="you@university.edu" className="input" />
              <button type="submit" className="btn-primary">
                <Send className="h-4 w-4" /> Subscribe
              </button>
            </form>
            <div className="mt-5 flex items-center gap-2">
              <a href={site.social.youtube} target="_blank" rel="noreferrer" className="btn-secondary !px-3 !py-2" aria-label="YouTube">
                <Youtube className="h-4 w-4" />
              </a>
              <a href={site.social.facebook} target="_blank" rel="noreferrer" className="btn-secondary !px-3 !py-2" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href={site.social.instagram} target="_blank" rel="noreferrer" className="btn-secondary !px-3 !py-2" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href={site.social.telegram} target="_blank" rel="noreferrer" className="btn-secondary !px-3 !py-2" aria-label="Telegram">
                <Send className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            {groups.map((g) => (
              <div key={g.title}>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{g.title}</h4>
                <ul className="mt-3 space-y-2 text-sm">
                  {g.links.map((l) => (
                    <li key={l.to}>
                      <Link to={l.to} className="text-slate-600 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-300">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Get in touch</h4>
            <ul className="mt-3 space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-brand-500" /> {site.address}</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-brand-500" /> {site.phone}</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-brand-500" /> {site.email}</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 md:flex-row md:items-center dark:border-slate-800">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Built for Ethiopian university students 🇪🇹</p>
        </div>
      </Container>
    </footer>
  );
}
