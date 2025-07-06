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
  type: 'Apartment' | 'Studio' | 'House';
  amenities: string[];
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
  { id: 1, author: 'Chloe B.', rating: 4, comment: 'Great location, very close to campus. The landlord was responsive to maintenance requests. A bit noisy on weekends.', isVerified: true },
  { id: 2, author: 'Maria G.', rating: 5, comment: 'Felt very safe here. The building has good lighting and secure entry. My room was spacious and clean.', isVerified: true },
  { id: 3, author: 'Anonymous', rating: 2, comment: 'Had issues with plumbing that took weeks to fix. The landlord was hard to reach.', isVerified: true },
  { id: 4, author: 'Sophie L.', rating: 5, comment: 'Absolutely loved my time here. The apartment was beautiful and the neighbourhood is lovely and safe.', isVerified: true },
  { id: 5, author: 'Isabelle W.', rating: 3, comment: 'The flat is nice, but the landlord is very strict about guests. Make sure to read the lease carefully.', isVerified: true },
  { id: 6, author: 'Emily R.', rating: 4, comment: 'Good value for the price. The amenities are basic but functional. It\'s a safe and quiet area.', isVerified: true },
];

export const flats: Flat[] = [
  {
    id: 1,
    name: 'Sunny Campus Corner',
    location: 'University District',
    price: 850,
    type: 'Apartment',
    amenities: ['In-unit laundry', 'Wi-Fi', 'Air Conditioning', 'Dishwasher'],
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    safetyRating: 4.5,
    landlord: {
      name: 'John Property Mgmt',
      rating: 4.2,
      reviews: [reviews[0], reviews[1]],
    },
  },
  {
    id: 2,
    name: 'The Grad Pad',
    location: 'Downtown',
    price: 950,
    type: 'Studio',
    amenities: ['Gym access', 'Rooftop deck', 'Secure package room', 'Wi-Fi'],
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    safetyRating: 5,
    landlord: {
      name: 'Anna Properties',
      rating: 4.8,
      reviews: [reviews[3]],
    },
  },
  {
    id: 3,
    name: 'Artisan Loft',
    location: 'Arts District',
    price: 780,
    type: 'Studio',
    amenities: ['Pet-friendly', 'Wi-Fi', 'On-site maintenance'],
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    safetyRating: 3.5,
    landlord: {
      name: 'City Dwellings',
      rating: 3.1,
      reviews: [reviews[2], reviews[4]],
    },
  },
  {
    id: 4,
    name: 'Quiet Oak Residence',
    location: 'North Suburbs',
    price: 700,
    type: 'House',
    amenities: ['Free parking', 'Backyard', 'In-unit laundry'],
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    safetyRating: 4,
    landlord: {
      name: 'Suburban Homes LLC',
      rating: 4.0,
      reviews: [reviews[5]],
    },
  },
  {
    id: 5,
    name: 'The Study Nook',
    location: 'University District',
    price: 800,
    type: 'Apartment',
    amenities: ['Study lounge', 'Wi-Fi', 'Air Conditioning', 'On-site security'],
    images: ['https://placehold.co/600x400.png'],
    safetyRating: 4.8,
    landlord: {
      name: 'Campus Living',
      rating: 4.5,
      reviews: [reviews[0], reviews[1], reviews[3]],
    },
  },
  {
    id: 6,
    name: 'Metropolitan Suite',
    location: 'Downtown',
    price: 1100,
    type: 'Apartment',
    amenities: ['Pool', 'Gym access', 'Concierge', 'Wi-Fi', 'Dishwasher'],
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    safetyRating: 4.2,
    landlord: {
      name: 'Anna Properties',
      rating: 4.8,
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
