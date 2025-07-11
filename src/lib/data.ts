import { z } from 'zod';

export type Review = {
  id: number;
  author: string;
  rating: number;
  comment: string;
  isVerified: boolean;
};

export type Landlord = {
  name: string;
  rating: number;
  reviews: Review[];
};

export type Flat = {
  id: number;
  name: string;
  location: string;
  price: number;
  type: '1RK' | '1BHK' | '2BHK' | 'PG';
  amenities: string[];
  highlights: string[];
  tags: string[];
  isFeatured: boolean;
  images: string[];
  safetyRating: number;
  landlord: Landlord;
};

export const RoommateSchema = z.object({
  id: z.number(),
  name: z.string(),
  age: z.number(),
  year: z.string(),
  branch: z.enum(['CST', 'IT', 'CE', 'DS', 'ENC', 'AI']),
  hobbies: z.array(z.string()),
  photo: z.string(),
  personality: z.string().describe("Describes their general nature, e.g., 'Early Bird, Studious' or 'Night Owl, Creative'."),
  socialHabits: z.string().describe("Describes their social preferences, e.g., 'Prefers quiet nights in' or 'Enjoys hosting friends'."),
});

export type Roommate = z.infer<typeof RoommateSchema>;


export const reviews: Review[] = [
  { id: 1, author: 'Priya K.', rating: 5, comment: 'Super safe area, well-lit streets. Landlord is very respectful and responsive! Felt very secure, especially coming home late from college.', isVerified: true },
  { id: 2, author: 'Ananya M.', rating: 4.5, comment: 'Great location, close to the station. Only issue is occasional water problem during peak summer, but it gets resolved quickly.', isVerified: true },
  { id: 3, author: 'Sneha P.', rating: 5, comment: 'Felt completely safe walking alone at night. The PG has a friendly warden and good rules. Great roommates too!', isVerified: true },
  { id: 4, author: 'Riya S.', rating: 5, comment: 'Absolutely loved my time here. The apartment was beautiful and the neighbourhood is lovely and safe. Lots of cafes nearby for studying.', isVerified: true },
  { id: 5, author: 'Kavya R.', rating: 4, comment: 'Good facilities but the area can be a bit isolated at night. It\'s better to take a rickshaw back from the main road.', isVerified: true },
  { id: 6, author: 'Aisha K.', rating: 4, comment: 'Good value for the price. The amenities are basic but functional. It\'s a safe and quiet area, perfect for focusing on studies.', isVerified: true },
  { id: 7, author: 'Anonymous', rating: 2, comment: 'Had issues with plumbing that took weeks to fix. The landlord was hard to reach and wasn\'t very helpful.', isVerified: true },
];

export const flats: Flat[] = [
  {
    id: 1,
    name: 'Cozy 1BHK Near D.J. Sanghvi',
    location: 'Vile Parle West, Mumbai',
    price: 38000,
    type: '1BHK',
    amenities: ['Wi-Fi', 'Air Conditioning', 'Geyser', 'Security Guard'],
    highlights: ['5-Min Walk to College', 'Women-only Building', '24/7 Security'],
    tags: ['Student Friendly', 'Furnished', 'Near Station'],
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1560184897-ae75f418493e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1571508601891-ca5e7a713859?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    safetyRating: 4.8,
    landlord: {
      name: 'Gupta Real Estate',
      rating: 4.5,
      reviews: [reviews[0], reviews[3]],
    },
  },
  {
    id: 2,
    name: 'Secure PG in Santacruz',
    location: 'Santacruz West, Mumbai',
    price: 20000,
    type: 'PG',
    amenities: ['Wi-Fi', 'Daily Meals', 'Laundry Service', 'Common Room'],
    highlights: ['Strict In-times', 'CCTV Coverage', 'Female Warden'],
    tags: ['Female Students Only', 'Well-lit Surroundings', 'Close to Market'],
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1558&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80'
    ],
    safetyRating: 4.9,
    landlord: {
      name: 'Aunty\'s PG Services',
      rating: 4.8,
      reviews: [reviews[2], reviews[3]],
    },
  },
  {
    id: 3,
    name: 'Modern 2BHK in Bandra',
    location: 'Bandra West, Mumbai',
    price: 55000,
    type: '2BHK',
    amenities: ['Gated Community', 'Wi-Fi', 'On-site maintenance', 'Gym Access'],
    highlights: ['Premium Amenities', 'Gated Community', '24/7 Power Backup'],
    tags: ['Spacious', 'Sea View', 'Student Group Friendly'],
    isFeatured: true,
    images: [
      "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    safetyRating: 4.5,
    landlord: {
      name: 'Cityscape Rentals',
      rating: 4.3,
      reviews: [reviews[4], reviews[1]],
    },
  },
  {
    id: 4,
    name: 'Affordable 1RK in Santacruz East',
    location: 'Santacruz East, Mumbai',
    price: 25000,
    type: '1RK',
    amenities: ['24hr Water', 'Wi-Fi ready', 'Secure Entry'],
    highlights: ['Close to Station', 'Grocery Nearby', 'Quiet Lane'],
    tags: ['Budget Friendly', 'Good for 1-2 people', 'Safe Locality'],
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1556020685-ae41abfc9365?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80'
    ],
    safetyRating: 4.2,
    landlord: {
      name: 'Sharma Properties',
      rating: 4.0,
      reviews: [reviews[5], reviews[1]],
    },
  },
  {
    id: 5,
    name: 'Student PG near Mithibai',
    location: 'Vile Parle West, Mumbai',
    price: 22000,
    type: 'PG',
    amenities: ['Study lounge', 'Wi-Fi', 'Air Conditioning', 'On-site security'],
    highlights: ['Student Focused', 'Quiet Hours', 'Close to Colleges'],
    tags: ['Walking distance to colleges', 'Safe for women'],
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    safetyRating: 4.8,
    landlord: {
      name: 'Campus Living',
      rating: 4.5,
      reviews: [reviews[0], reviews[2]],
    },
  },
  {
    id: 6,
    name: 'Roomy 1BHK in Santacruz',
    location: 'Santacruz West, Mumbai',
    price: 42000,
    type: '1BHK',
    amenities: ['Park access', 'Market nearby', '24/7 Security'],
    highlights: ['Family-friendly locality', 'Good Ventilation', 'Newly Renovated'],
    tags: ['Quiet Living', 'Spacious Rooms', 'Good Connectivity'],
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    safetyRating: 4.6,
    landlord: {
      name: 'Western Homes LLC',
      rating: 4.4,
      reviews: [reviews[3], reviews[5]],
    },
  },
];


export const roommates: Roommate[] = [
  {
    id: 1,
    name: 'Jessica',
    age: 20,
    year: 'Third Year',
    branch: 'CST',
    hobbies: ['Reading', 'Debating', 'Gaming'],
    photo: '/images/woman_2922742.png',
    personality: 'Night Owl, Focused',
    socialHabits: 'Prefers quiet nights in, but open to occasional outings.',
  },
  {
    id: 2,
    name: 'Aditi',
    age: 19,
    year: 'Second Year',
    branch: 'IT',
    hobbies: ['Painting', 'Yoga', 'Binge-watching'],
    photo: '/images/woman_2922661.png',
    personality: 'Early Bird, Creative',
    socialHabits: 'Enjoys small groups and cafe hopping.',
  },
  {
    id: 3,
    name: 'Priya',
    age: 21,
    year: 'Fourth Year',
    branch: 'CE',
    hobbies: ['Cooking', 'Running', 'Movies'],
    photo: '/images/woman_2922737.png',
    personality: 'Early Bird, Organized',
    socialHabits: 'Loves hosting study groups and weekend dinners.',
  },
  {
    id: 4,
    name: 'Rhea',
    age: 19,
    year: 'Second Year',
    branch: 'DS',
    hobbies: ['Baking', 'Concerts', 'Coding'],
    photo: '/images/woman_2922725.png',
    personality: 'Night Owl, Social',
    socialHabits: 'Loves going out and exploring the city on weekends.',
  },
  {
    id: 5,
    name: 'Mahi',
    age: 20,
    year: 'Third Year',
    branch: 'AI',
    hobbies: ['Thrifting', 'Coffee shops', 'Reading'],
    photo: '/images/woman_2922732.png',
    personality: 'Flexible schedule, Introverted',
    socialHabits: 'Prefers one-on-one conversations and quiet activities.',
  },
  {
    id: 6,
    name: 'Fatima',
    age: 21,
    year: 'Fourth Year',
    branch: 'ENC',
    hobbies: ['Gardening', 'Volunteering', 'Music'],
    photo: '/images/woman_2922752.png',
    personality: 'Early Bird, Community-minded',
    socialHabits: 'Often busy with extracurriculars, enjoys a calm home.',
  },
];
