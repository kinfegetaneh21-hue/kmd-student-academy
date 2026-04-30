import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  Youtube,
  Moon,
  Sun,
  Sparkles,
  LayoutDashboard,
  LogIn,
  LogOut,
  User,
  ChevronDown,
  GraduationCap,
  Crown,
  ShieldCheck,
} from 'lucide-react';
import Logo from '../ui/Logo';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { site } from '../../data/siteConfig';
import cn from '../../utils/cn';

const links = [
  { to: '/', label: 'Home' },
  { to: '/courses', label: 'Courses' },
  { to: '/freshman', label: 'Freshman' },
  { to: '/premium', label: 'Premium' },
  { to: '/videos', label: 'Videos' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/resources', label: 'Resources' },
  { to: '/about', label: 'About' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const { theme, toggle } = useTheme();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [loc.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const dashHref = isAdmin ? '/admin' : '/dashboard';

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all',
        scrolled
          ? 'border-b border-slate-200/80 bg-white/80 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/70'
          : 'bg-transparent'
      )}
    >
      <div className="container-px mx-auto flex max-w-7xl items-center justify-between gap-4 py-3">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-3 py-2 text-sm font-semibold transition',
                  isActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 md:inline-flex dark:bg-red-950 dark:text-red-300 dark:hover:bg-red-900"
            aria-label="Open our YouTube channel"
          >
            <Youtube className="h-4 w-4" /> YouTube
          </a>

          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100 dark:text-slate-300 dark:ring-slate-800 dark:hover:bg-slate-800"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {isAuthenticated ? (
            <div className="relative hidden md:block">
              <button
                onClick={() => setUserMenu((s) => !s)}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-2 py-1.5 text-sm font-semibold text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-100 dark:ring-slate-800"
              >
                <img src={user.avatar} alt={user.name} className="h-7 w-7 rounded-lg object-cover" />
                <span className="hidden xl:inline">{user.name.split(' ')[0]}</span>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </button>
              {userMenu && (
                <div
                  className="absolute right-0 mt-2 w-60 overflow-hidden rounded-2xl bg-white p-2 shadow-soft ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800"
                  onMouseLeave={() => setUserMenu(false)}
                >
                  <div className="px-3 py-2 text-xs">
                    <div className="font-semibold text-slate-900 dark:text-white">{user.name}</div>
                    <div className="mt-0.5 text-slate-500">{user.email}</div>
                    <div className="mt-2 inline-flex items-center gap-1.5">
                      {isAdmin ? (
                        <span className="chip-accent"><ShieldCheck className="h-3 w-3" /> Admin</span>
                      ) : user.role === 'premium' ? (
                        <span className="chip-brand"><Crown className="h-3 w-3" /> Premium</span>
                      ) : (
                        <span className="chip-success"><GraduationCap className="h-3 w-3" /> Freshman</span>
                      )}
                    </div>
                  </div>
                  <Link
                    to={dashHref}
                    onClick={() => setUserMenu(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </Link>
                  <Link
                    to="/dashboard/profile"
                    onClick={() => setUserMenu(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <User className="h-4 w-4" /> Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      nav('/');
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950"
                  >
                    <LogOut className="h-4 w-4" /> Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Link to="/login" className="btn-ghost">
                <LogIn className="h-4 w-4" /> Log in
              </Link>
              <Link to="/signup" className="btn-primary">
                <Sparkles className="h-4 w-4" /> Get started
              </Link>
            </div>
          )}

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 ring-1 ring-slate-200 lg:hidden dark:text-slate-300 dark:ring-slate-800"
            onClick={() => setOpen((s) => !s)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 lg:hidden">
          <div className="container-px mx-auto grid max-w-7xl gap-1 py-3">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'rounded-lg px-3 py-2.5 text-sm font-semibold',
                    isActive
                      ? 'bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
            <a
              href={site.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-600 dark:bg-red-950 dark:text-red-300"
            >
              <Youtube className="h-4 w-4" /> Watch on YouTube
            </a>
            {isAuthenticated ? (
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Link to={dashHref} className="btn-secondary">
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </Link>
                <button
                  className="btn-ghost"
                  onClick={() => {
                    logout();
                    nav('/');
                  }}
                >
                  <LogOut className="h-4 w-4" /> Log out
                </button>
              </div>
            ) : (
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Link to="/login" className="btn-secondary">
                  <LogIn className="h-4 w-4" /> Log in
                </Link>
                <Link to="/signup" className="btn-primary">
                  <Sparkles className="h-4 w-4" /> Get started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
