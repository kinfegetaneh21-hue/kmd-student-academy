import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import AdminLayout from './layouts/AdminLayout';
import AuthLayout from './layouts/AuthLayout';
import ProtectedRoute from './routes/ProtectedRoute';

// Public pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import FreshmanPage from './pages/FreshmanPage';
import PremiumPage from './pages/PremiumPage';
import PricingPage from './pages/PricingPage';
import ResourcesPage from './pages/ResourcesPage';
import VideosPage from './pages/VideosPage';
import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';

// Auth pages
import LoginPage from './auth/LoginPage';
import SignupPage from './auth/SignupPage';
import ForgotPasswordPage from './auth/ForgotPasswordPage';

// Dashboard pages
import StudentOverview from './dashboard/StudentOverview';
import MyCoursesPage from './dashboard/MyCoursesPage';
import ContinueLearningPage from './dashboard/ContinueLearningPage';
import NotesPage from './dashboard/NotesPage';
import DashboardVideosPage from './dashboard/DashboardVideosPage';
import DownloadsPage from './dashboard/DownloadsPage';
import AssignmentsPage from './dashboard/AssignmentsPage';
import QuizzesPage from './dashboard/QuizzesPage';
import ProfilePage from './dashboard/ProfilePage';
import MessagesPage from './dashboard/MessagesPage';

// Admin pages
import AdminOverview from './admin/AdminOverview';
import ManageCoursesPage from './admin/ManageCoursesPage';
import ManageStudentsPage from './admin/ManageStudentsPage';
import UploadVideosPage from './admin/UploadVideosPage';
import UploadFilesPage from './admin/UploadFilesPage';
import ManageYoutubePage from './admin/ManageYoutubePage';
import ManagePlansPage from './admin/ManagePlansPage';
import ManageAnnouncementsPage from './admin/ManageAnnouncementsPage';
import ManageCategoriesPage from './admin/ManageCategoriesPage';
import SiteSettingsPage from './admin/SiteSettingsPage';

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:id" element={<CourseDetailPage />} />
        <Route path="/freshman" element={<FreshmanPage />} />
        <Route path="/premium" element={<PremiumPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Route>

      {/* Auth */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* Student Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute roles={['freshman', 'premium', 'admin']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentOverview />} />
        <Route path="courses" element={<MyCoursesPage />} />
        <Route path="continue" element={<ContinueLearningPage />} />
        <Route path="notes" element={<NotesPage />} />
        <Route path="videos" element={<DashboardVideosPage />} />
        <Route path="downloads" element={<DownloadsPage />} />
        <Route path="assignments" element={<AssignmentsPage />} />
        <Route path="quizzes" element={<QuizzesPage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminOverview />} />
        <Route path="courses" element={<ManageCoursesPage />} />
        <Route path="students" element={<ManageStudentsPage />} />
        <Route path="upload-videos" element={<UploadVideosPage />} />
        <Route path="upload-files" element={<UploadFilesPage />} />
        <Route path="youtube" element={<ManageYoutubePage />} />
        <Route path="plans" element={<ManagePlansPage />} />
        <Route path="announcements" element={<ManageAnnouncementsPage />} />
        <Route path="categories" element={<ManageCategoriesPage />} />
        <Route path="settings" element={<SiteSettingsPage />} />
      </Route>

      {/* Redirects */}
      <Route path="/home" element={<Navigate to="/" replace />} />

      {/* 404 inside main layout */}
      <Route element={<MainLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
