import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';

/**
 * Role-based auth with a local mock backend so the whole app is runnable
 * without a live server. Swap `services/authService.js` to connect a real API.
 *
 * Roles: 'guest' | 'freshman' | 'premium' | 'admin'
 */

const AuthContext = createContext(null);

const STORAGE_KEY = 'kmd-auth-v1';
const USERS_KEY = 'kmd-users-v1';

const DEFAULT_USERS = [
  {
    id: 'u-admin',
    name: 'KMD Admin',
    email: 'admin@kmd.academy',
    password: 'admin123',
    role: 'admin',
    year: null,
    plan: 'advanced',
    avatar: 'https://i.pravatar.cc/100?img=15',
  },
  {
    id: 'u-fresh',
    name: 'Abel Tesfaye',
    email: 'freshman@kmd.academy',
    password: 'freshman123',
    role: 'freshman',
    year: 'freshman',
    plan: 'freshman',
    avatar: 'https://i.pravatar.cc/100?img=11',
  },
  {
    id: 'u-prem',
    name: 'Selam Alemu',
    email: 'premium@kmd.academy',
    password: 'premium123',
    role: 'premium',
    year: 'year3',
    plan: 'standard',
    avatar: 'https://i.pravatar.cc/100?img=47',
  },
];

function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) {
      localStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_USERS;
  }
}

function saveUsers(list) {
  localStorage.setItem(USERS_KEY, JSON.stringify(list));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [users, setUsers] = useState(loadUsers);

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  useEffect(() => saveUsers(users), [users]);

  const login = useCallback(
    async (email, password) => {
      const match = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      if (!match) throw new Error('Invalid email or password.');
      const safe = { ...match };
      delete safe.password;
      setUser(safe);
      return safe;
    },
    [users]
  );

  const signup = useCallback(
    async ({ name, email, password, year }) => {
      if (users.some((u) => u.email.toLowerCase() === email.toLowerCase()))
        throw new Error('An account with that email already exists.');
      const isFreshman = year === 'freshman';
      const newUser = {
        id: `u-${Date.now()}`,
        name,
        email,
        password,
        role: isFreshman ? 'freshman' : 'premium',
        year: year || 'freshman',
        plan: isFreshman ? 'freshman' : 'standard',
        avatar: `https://i.pravatar.cc/100?u=${encodeURIComponent(email)}`,
        // Non-freshmen still need to pay before premium is unlocked.
        premiumActive: isFreshman,
      };
      setUsers((list) => [...list, newUser]);
      const safe = { ...newUser };
      delete safe.password;
      setUser(safe);
      return safe;
    },
    [users]
  );

  const logout = useCallback(() => setUser(null), []);

  const upgradePlan = useCallback(
    (planId) => {
      if (!user) return;
      setUser((u) =>
        u
          ? {
              ...u,
              plan: planId,
              role: planId === 'freshman' ? 'freshman' : 'premium',
              premiumActive: planId !== 'freshman',
            }
          : u
      );
      setUsers((list) =>
        list.map((u) =>
          u.id === user.id
            ? {
                ...u,
                plan: planId,
                role: planId === 'freshman' ? 'freshman' : 'premium',
                premiumActive: planId !== 'freshman',
              }
            : u
        )
      );
    },
    [user]
  );

  const updateProfile = useCallback(
    (patch) => {
      if (!user) return;
      setUser((u) => (u ? { ...u, ...patch } : u));
      setUsers((list) => list.map((u) => (u.id === user.id ? { ...u, ...patch } : u)));
    },
    [user]
  );

  const value = useMemo(
    () => ({
      user,
      role: user ? user.role : 'guest',
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === 'admin',
      isPremium: user?.role === 'premium' || user?.role === 'admin',
      isFreshman: user?.role === 'freshman',
      login,
      signup,
      logout,
      upgradePlan,
      updateProfile,
      users,
      setUsers,
    }),
    [user, login, signup, logout, upgradePlan, updateProfile, users]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
