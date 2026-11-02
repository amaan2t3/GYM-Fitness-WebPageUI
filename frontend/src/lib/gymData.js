import amaanPhoto from '../assets/passport-photo-aman.png'
import zeeshanPhoto from '../assets/zeeshan.jpeg'
import karamatPhoto from '../assets/karamat.jpeg'

export const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY,
)

export const defaultClasses = [
  {
    id: 'strength',
    category: 'mens',
    title: 'Strength & Muscle',
    description: 'Build lasting strength with thoughtful, progressive coaching.',
    duration: '60 min',
    intensity: 'All levels',
    schedule: 'Mon, Wed, Fri · 6:00 PM',
    badge: 'Men’s fitness',
    image_url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'conditioning',
    category: 'mens',
    title: 'Bodybuilding',
    description: 'Focused programming for muscle development, form, and confidence.',
    duration: '45 min',
    intensity: 'Intermediate',
    schedule: 'Tue, Thu · 7:00 PM',
    badge: 'Strength',
    image_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'mens-conditioning',
    category: 'mens',
    title: 'Athletic Conditioning',
    description: 'Improve endurance and power with coached functional training.',
    duration: '45 min',
    intensity: 'All levels',
    schedule: 'Sat · 10:00 AM',
    badge: 'Conditioning',
    image_url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'ladies-strength',
    category: 'ladies',
    title: 'Ladies’ Strength',
    description: 'A welcoming space to get stronger, one session at a time.',
    duration: '55 min',
    intensity: 'All levels',
    schedule: 'Mon, Wed · 5:30 PM',
    badge: 'Ladies’ fitness',
    image_url: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'ladies-conditioning',
    category: 'ladies',
    title: 'Fitness & Energy',
    description: 'Feel-good conditioning designed to meet you where you are.',
    duration: '45 min',
    intensity: 'All levels',
    schedule: 'Tue, Thu · 6:00 PM',
    badge: 'Wellness',
    image_url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'ladies-mobility',
    category: 'ladies',
    title: 'Mobility & Balance',
    description: 'Restore range, build balance, and make recovery part of training.',
    duration: '50 min',
    intensity: 'All levels',
    schedule: 'Sat · 9:00 AM',
    badge: 'Healthy lifestyle',
    image_url: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=900&q=85',
  },
]

export const defaultTrainers = [
  {
    id: 'amaan',
    name: 'Amaan',
    role: 'Strength & conditioning',
    experience: '10+ years · Former powerlifting champion',
    bio: 'Powerlifting, barbell technique, and sustainable muscle building.',
    image_url: amaanPhoto,
  },
  {
    id: 'zeeshan',
    name: 'Zeeshan Haider',
    role: 'Performance & nutrition',
    experience: 'Functional training specialist',
    bio: 'Functional training and nutrition coaching for everyday athletes.',
    image_url: zeeshanPhoto,
  },
  {
    id: 'karamat',
    name: 'Karamat Ali',
    role: 'Mobility & movement',
    experience: 'Certified mobility therapist',
    bio: 'Movement, injury prevention, and confident recovery.',
    image_url: karamatPhoto,
  },
]

export const defaultPlans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 1500,
    period: 'month',
    features: ['Gym floor access', 'Locker facility', 'Movement assessment'],
    is_highlighted: false,
  },
  {
    id: 'performance',
    name: 'Performance',
    price: 3000,
    period: 'month',
    features: ['Unlimited classes', 'Monthly coach check-in', 'Personalized training plan'],
    is_highlighted: true,
  },
  {
    id: 'signature',
    name: 'Signature',
    price: 5000,
    period: 'month',
    features: ['Everything in Performance', 'Personal training session', 'Nutrition consultation'],
    is_highlighted: false,
  },
]

export async function getPublicCollection(table, fallback) {
  if (!isSupabaseConfigured) return fallback

  const { supabase } = await import('./supabase')
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error) throw error
  return data
}

export async function submitInquiry(inquiry) {
  if (!isSupabaseConfigured) {
    throw new Error('Contact submissions are unavailable until Supabase is configured.')
  }

  const { supabase } = await import('./supabase')
  const { error } = await supabase.from('inquiries').insert(inquiry)
  if (error) throw error
}
