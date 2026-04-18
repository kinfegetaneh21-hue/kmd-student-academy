export const site = {
  name: 'KMD Student Academy',
  shortName: 'KMD',
  tagline: 'Learn smarter. Rise faster.',
  description:
    'A modern Ethiopian LMS designed for university success — free for freshmen, premium for 2nd–7th year students.',
  email: 'support@kmdstudentacademy.com',
  phone: '+251 900 000 000',
  address: 'Addis Ababa, Ethiopia',
  social: {
    youtube: 'https://www.youtube.com/@KMDStudentAcademy',
    telegram: 'https://t.me/kmdstudentacademy',
    facebook: 'https://facebook.com/kmdstudentacademy',
    tiktok: 'https://www.tiktok.com/@kmdstudentacademy',
    instagram: 'https://instagram.com/kmdstudentacademy',
  },
  announcement:
    'New semester starts soon — unlock premium 2nd–7th year courses with up to 30% off. Limited time.',
};

export const academicYears = [
  { id: 'freshman', label: 'Freshman', order: 1, access: 'free' },
  { id: 'year2', label: '2nd Year', order: 2, access: 'premium' },
  { id: 'year3', label: '3rd Year', order: 3, access: 'premium' },
  { id: 'year4', label: '4th Year', order: 4, access: 'premium' },
  { id: 'year5', label: '5th Year', order: 5, access: 'premium' },
  { id: 'year6', label: '6th Year', order: 6, access: 'premium' },
  { id: 'year7', label: '7th Year', order: 7, access: 'premium' },
];

export const departments = [
  { id: 'general', label: 'General / Common', icon: 'BookOpen' },
  { id: 'engineering', label: 'Engineering', icon: 'Cpu' },
  { id: 'medicine', label: 'Medicine & Health', icon: 'HeartPulse' },
  { id: 'business', label: 'Business & Economics', icon: 'LineChart' },
  { id: 'natural', label: 'Natural Sciences', icon: 'Atom' },
  { id: 'social', label: 'Social Sciences', icon: 'Users' },
  { id: 'law', label: 'Law', icon: 'Scale' },
  { id: 'education', label: 'Education', icon: 'GraduationCap' },
  { id: 'it', label: 'Information Technology', icon: 'Laptop' },
  { id: 'agriculture', label: 'Agriculture', icon: 'Sprout' },
];
