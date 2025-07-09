
'use client';

import { useState, useEffect } from 'react';
import { FlatCard } from '@/components/flat-card';
import { flats, type Flat } from '@/lib/data';
import { Heart, UserX } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';

export default function SavedPage() {
  const [user, setUser] = useState<User | null>(null);
  const [savedFlats, setSavedFlats] = useState<Flat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        // Not logged in
        setIsLoading(false);
        setSavedFlats([]);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) return;

    setIsLoading(true);
    const userDocRef = doc(db, 'users', user.uid);
    
    // Use onSnapshot to listen for real-time updates
    const unsubscribeFirestore = onSnapshot(userDocRef, (docSnap) => {
        if (docSnap.exists()) {
            const userData = docSnap.data();
            const savedIds: number[] = userData.savedFlats || [];
            const flatsData = flats.filter(flat => savedIds.includes(flat.id));
            setSavedFlats(flatsData);
        } else {
            // User document might not exist yet if they haven't saved anything
            setSavedFlats([]);
        }
        setIsLoading(false);
    });

    return () => unsubscribeFirestore();
  }, [user]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-[500px] w-full rounded-2xl" />)}
        </div>
      );
    }

    if (!user) {
        return (
             <div className="flex flex-col items-center justify-center text-center h-full min-h-[40vh] bg-card rounded-2xl p-8 border-dashed border-2">
                <UserX className="w-16 h-16 text-muted-foreground/50 mb-4" />
                <p className="text-lg font-medium">Please Sign In</p>
                <p className="text-muted-foreground mt-2">Sign in to view your saved listings.</p>
            </div>
        )
    }

    if (savedFlats.length > 0) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedFlats.map((flat) => (
            <FlatCard key={flat.id} flat={flat} />
          ))}
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center text-center h-full min-h-[40vh] bg-card rounded-2xl p-8 border-dashed border-2">
        <Heart className="w-16 h-16 text-muted-foreground/50 mb-4" />
        <p className="text-lg font-medium">You haven't saved any listings yet.</p>
        <p className="text-muted-foreground mt-2">Click the heart icon on a listing to save it here.</p>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-28 px-4 md:px-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Saved Listings</h1>
        <p className="mt-2 text-lg text-muted-foreground">Your favorite properties, all in one place.</p>
      </div>
      {renderContent()}
    </div>
  );
}
