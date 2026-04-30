import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  LayoutDashboard,
  BookOpen,
  FolderOpen,
  Users,
  Upload,
  FileUp,
  Youtube,
  Crown,
  Megaphone,
  Layers,
  Settings,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  Bell,
} from 'lucide-react';
import { useState } from 'react';
import Logo from '../components/ui/Logo';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import cn from '../utils/cn';

const sections = [
  {
    label: 'Workspace',
    items: [{ to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true }],
  },
  {
    label: 'Upload area',
    items: [
      { to: '/admin/upload-videos', label: 'Upload Videos', icon: Upload },
      { to: '/admin/upload-files', label: 'Upload Files', icon: FileUp },
      { to: '/admin/youtube', label: 'YouTube Links', icon: Youtube },
    ],
  },
  {
    label: 'Content',
    items: [
      { to: '/admin/courses', label: 'Courses', icon: BookOpen },
      { to: '/admin/course-content', label: 'Course Content', icon: FolderOpen },
      { to: '/admin/categories', label: 'Categories & Years', icon: Layers },
      { to: '/admin/announcements', label: 'Announcements', icon: Megaphone },
    ],
  },
  {
    label: 'People & billing',
    items: [
      { to: '/admin/students', label: 'Students', icon: Users },
      { to: '/admin/plans', label: 'Premium Plans', icon: Crown },
    ],
  },
  {
    label: 'System',
    items: [{ to: '/admin/settings', label: 'Settings', icon: Settings }],
  },
];

function Sidebar({ onLogout }) {
  return (
    <aside className="flex h-full w-72 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="flex items-center gap-2 border-b border-slate-200 p-4 dark:border-slate-800">
        <Logo compact />
        <span className="chip-accent">
          <ShieldCheck className="h-3 w-3" /> Admin
        </span>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        {sections.map((section) => (
          <div key={section.label} className="mb-4">
            <div className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {section.label}
            </div>
            <div className="space-y-1">
              {section.items.map((i) => (
                <NavLink
                  key={i.to}
                  to={i.to}
                  end={i.end}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold',
                      isActive
                        ? 'bg-slate-900 text-white shadow-soft dark:bg-white dark:text-slate-900'
                        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                    )
                  }
                >
                  <i.icon className="h-4 w-4" />
                  {i.label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
      <div className="border-t border-slate-200 p-3 dark:border-slate-800">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950"
        >
          <LogOut className="h-4 w-4" /> Log out
        </button>
      </div>
    </aside>
  );
}

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  const onLogout = () => {
    logout();
    nav('/');
  };

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950">
      <div className="hidden lg:block">
        <Sidebar onLogout={onLogout} />
      </div>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-slate-950/60" onClick={() => setOpen(false)} />
          <div className="relative h-full w-72">
            <Sidebar onLogout={onLogout} />
          </div>
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80 sm:px-6">
          <button className="btn-secondary !px-3 !py-2 lg:hidden" onClick={() => setOpen((s) => !s)}>
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
          <div className="text-sm font-semibold text-slate-500">
            <span className="text-slate-900 dark:text-white">KMD</span> · Admin Console
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button onClick={toggle} className="btn-secondary !px-3 !py-2" aria-label="Toggle theme">
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button className="btn-secondary !px-3 !py-2" aria-label="Notifications">
              <Bell className="h-4 w-4" />
            </button>
            <img src={user?.avatar} alt={user?.name} className="h-9 w-9 rounded-xl object-cover" />
          </div>
        </header>
        <main className="min-w-0 flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
