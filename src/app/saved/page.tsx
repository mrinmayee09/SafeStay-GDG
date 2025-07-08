
'use client';

import { useState, useEffect } from 'react';
import { FlatCard } from '@/components/flat-card';
import { flats, type Flat } from '@/lib/data';
import { Heart } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function SavedPage() {
  const [savedFlats, setSavedFlats] = useState<Flat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadSavedFlats = () => {
    const savedIds: number[] = JSON.parse(localStorage.getItem('savedFlats') || '[]');
    const flatsData = flats.filter(flat => savedIds.includes(flat.id));
    setSavedFlats(flatsData);
    setIsLoading(false);
  };

  useEffect(() => {
    loadSavedFlats();

    const handleStorageChange = () => {
        loadSavedFlats();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
        window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="container mx-auto py-28 px-4 md:px-6">
      <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Saved Listings</h1>
          <p className="mt-2 text-lg text-muted-foreground">Your favorite properties, all in one place.</p>
      </div>
        
      {isLoading ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-[500px] w-full rounded-2xl" />)}
         </div>
      ) : savedFlats.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedFlats.map((flat) => (
            <FlatCard key={flat.id} flat={flat} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center h-full min-h-[40vh] bg-card rounded-2xl p-8 border-dashed border-2">
          <Heart className="w-16 h-16 text-muted-foreground/50 mb-4" />
          <p className="text-lg font-medium">You haven't saved any listings yet.</p>
          <p className="text-muted-foreground mt-2">Click the heart icon on a listing to save it here.</p>
        </div>
      )}
    </div>
  );
}
