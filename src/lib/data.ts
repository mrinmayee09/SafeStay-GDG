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

export type Roommate = {
  id: number;
  name: string;
  age: number;
  major: string;
  hobbies: string[];
  photo: string;
};

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
    name: 'Cozy 1BHK Near NMIMS',
    location: 'Vile Parle West, Mumbai',
    price: 35000,
    type: '1BHK',
    amenities: ['Wi-Fi', 'Air Conditioning', 'Geyser', 'Security Guard'],
    highlights: ['5-Min Walk to College', 'Women-only Building', '24/7 Security'],
    tags: ['Student Friendly', 'Furnished', 'Near Station'],
    isFeatured: true,
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    safetyRating: 4.8,
    landlord: {
      name: 'Gupta Real Estate',
      rating: 4.5,
      reviews: [reviews[0], reviews[3]],
    },
  },
  {
    id: 2,
    name: 'Shared Room in a PG',
    location: 'Bandra West, Mumbai',
    price: 18000,
    type: 'PG',
    amenities: ['Wi-Fi', 'Daily Meals', 'Laundry Service', 'Common Room'],
    highlights: ['Strict In-times', 'CCTV Coverage', 'Female Warden'],
    tags: ['Female Students Only', 'Well-lit Surroundings', 'Close to Market'],
    isFeatured: true,
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    safetyRating: 4.9,
    landlord: {
      name: 'Aunty\'s PG Services',
      rating: 4.8,
      reviews: [reviews[2], reviews[3]],
    },
  },
  {
    id: 3,
    name: 'Modern 2BHK near IIT Bombay',
    location: 'Powai, Mumbai',
    price: 45000,
    type: '2BHK',
    amenities: ['Gated Community', 'Wi-Fi', 'On-site maintenance', 'Gym Access'],
    highlights: ['Premium Amenities', 'Gated Community', '24/7 Power Backup'],
    tags: ['Spacious', 'Lake View', 'Student Group Friendly'],
    isFeatured: true,
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    safetyRating: 4.2,
    landlord: {
      name: 'Hiranandani Rentals',
      rating: 4.1,
      reviews: [reviews[4], reviews[1]],
    },
  },
  {
    id: 4,
    name: 'Affordable 1RK for Students',
    location: 'Andheri East, Mumbai',
    price: 22000,
    type: '1RK',
    amenities: ['24hr Water', 'Wi-Fi ready', 'Secure Entry'],
    highlights: ['Close to Metro Station', 'Grocery Nearby', 'Quiet Lane'],
    tags: ['Budget Friendly', 'Good for 1-2 people', 'Safe Locality'],
    isFeatured: false,
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    safetyRating: 4.0,
    landlord: {
      name: 'Sharma Properties',
      rating: 4.0,
      reviews: [reviews[5], reviews[1]],
    },
  },
  {
    id: 5,
    name: 'The Study Nook PG',
    location: 'Churchgate, Mumbai',
    price: 20000,
    type: 'PG',
    amenities: ['Study lounge', 'Wi-Fi', 'Air Conditioning', 'On-site security'],
    highlights: ['Student Focused', 'Quiet Hours', 'Close to KC & HR College'],
    tags: ['Walking distance to colleges', 'Safe for women'],
    isFeatured: false,
    images: ['https://placehold.co/600x400.png'],
    safetyRating: 4.8,
    landlord: {
      name: 'Campus Living',
      rating: 4.5,
      reviews: [reviews[0], reviews[2]],
    },
  },
  {
    id: 6,
    name: 'Spacious 1BHK in Suburbs',
    location: 'Borivali West, Mumbai',
    price: 28000,
    type: '1BHK',
    amenities: ['Park access', 'Market nearby', '24/7 Security'],
    highlights: ['Family-friendly locality', 'Good Ventilation', 'Close to National Park'],
    tags: ['Quiet Living', 'Spacious Rooms', 'Good Connectivity'],
    isFeatured: false,
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    safetyRating: 4.4,
    landlord: {
      name: 'Suburban Homes LLC',
      rating: 4.2,
      reviews: [reviews[3], reviews[5]],
    },
  },
];


export const roommates: Roommate[] = [
  {
    id: 1,
    name: 'Jessica',
    age: 21,
    major: 'Computer Science',
    hobbies: ['Reading', 'Hiking', 'Gaming'],
    photo: 'https://placehold.co/100x100.png',
  },
  {
    id: 2,
    name: 'Amanda',
    age: 20,
    major: 'Fine Arts',
    hobbies: ['Painting', 'Yoga', 'Museums'],
    photo: 'https://placehold.co/100x100.png',
  },
  {
    id: 3,
    name: 'Priya',
    age: 22,
    major: 'Biology',
    hobbies: ['Cooking', 'Running', 'Movies'],
    photo: 'https://placehold.co/100x100.png',
  },
  {
    id: 4,
    name: 'Olivia',
    age: 19,
    major: 'Computer Science',
    hobbies: ['Baking', 'Concerts', 'Coding'],
    photo: 'https://placehold.co/100x100.png',
  },
  {
    id: 5,
    name: 'Mei',
    age: 20,
    major: 'Business',
    hobbies: ['Thrifting', 'Coffee shops', 'Reading'],
    photo: 'https://placehold.co/100x100.png',
  },
  {
    id: 6,
    name: 'Fatima',
    age: 21,
    major: 'Biology',
    hobbies: ['Gardening', 'Volunteering', 'Documentaries'],
    photo: 'https://placehold.co/100x100.png',
  },
];
