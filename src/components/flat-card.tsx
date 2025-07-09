
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { type Flat } from '@/lib/data';
import { StarRating } from './star-rating';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { MapPin, ShieldCheck, Sparkles, Star, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { doc, getDoc, updateDoc, setDoc, arrayUnion, arrayRemove, onSnapshot } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { SignInDialog } from './sign-in-dialog';


type FlatCardProps = {
  flat: Flat;
};

export function FlatCard({ flat }: FlatCardProps) {
  const latestReview = flat.landlord.reviews[0];
  const [isSaved, setIsSaved] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setIsSaved(false);
      return;
    }
    const userDocRef = doc(db, 'users', user.uid);
    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
        if (docSnap.exists()) {
            const savedFlats = docSnap.data().savedFlats || [];
            setIsSaved(savedFlats.includes(flat.id));
        } else {
            setIsSaved(false);
        }
    });

    return () => unsubscribe();
  }, [user, flat.id]);

  const handleSaveToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      setIsSignInOpen(true);
      return;
    }

    const userDocRef = doc(db, 'users', user.uid);

    try {
        const docSnap = await getDoc(userDocRef);
        if (!docSnap.exists()) {
            // Create doc if it doesn't exist
            await setDoc(userDocRef, { savedFlats: [flat.id] });
        } else {
            // Update existing doc
            await updateDoc(userDocRef, {
                savedFlats: isSaved ? arrayRemove(flat.id) : arrayUnion(flat.id)
            });
        }
    } catch (error) {
        console.error("Error updating saved flats: ", error);
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Could not update your saved listings. Please try again.'
        });
    }
  };

  return (
    <>
    <SignInDialog open={isSignInOpen} onOpenChange={setIsSignInOpen} />
    <Card className="overflow-hidden h-full transition-shadow duration-300 hover:shadow-xl rounded-2xl flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden group">
        <Image
          src={flat.images[0]}
          alt={`Image of ${flat.name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          data-ai-hint="apartment interior"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
            {flat.isFeatured && (
                <Badge className="bg-primary/80 backdrop-blur-sm border-0 text-primary-foreground">
                    <Sparkles className="w-3 h-3 mr-1.5" />
                    Featured
                </Badge>
            )}
             <Badge variant="secondary" className="bg-green-100/80 backdrop-blur-sm border-green-300 text-green-800">
                <ShieldCheck className="w-3 h-3 mr-1.5" />
                Safety: {flat.safetyRating}
            </Badge>
        </div>
         <div className="absolute top-3 right-3 z-10">
          <Button
            onClick={handleSaveToggle}
            size="icon"
            variant="ghost"
            className="rounded-full h-10 w-10 bg-black/20 backdrop-blur-sm text-white hover:bg-black/40"
          >
            <Heart className={cn("w-5 h-5 transition-all", isSaved ? 'fill-red-500 text-red-500' : 'text-white')} />
            <span className="sr-only">Save</span>
          </Button>
        </div>
      </div>
      <CardContent className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-bold text-lg leading-tight">
            {flat.name}
          </h3>
          <span className="font-bold text-lg text-primary whitespace-nowrap">
            ₹{flat.price.toLocaleString()}/mo
          </span>
        </div>
        <p className="text-muted-foreground text-sm mt-1 flex items-center gap-1.5">
          <MapPin className="w-4 h-4" />
          {flat.location}
        </p>

        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center gap-2 text-sm">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="font-medium">{flat.landlord.rating}</span>
            <span className="text-muted-foreground">({flat.landlord.reviews.length} reviews)</span>
          </div>
          <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">Verified Student</Badge>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
            {flat.tags.slice(0, 3).map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
        </div>

        {latestReview && (
          <>
            <Separator className="my-4" />
            <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1">LATEST REVIEW:</p>
                <div className="flex items-start justify-between">
                    <p className="font-semibold text-sm">{latestReview.author}</p>
                    <StarRating rating={latestReview.rating} size={14} />
                </div>
                <p className="text-sm text-muted-foreground italic mt-1 line-clamp-2">"{latestReview.comment}"</p>
            </div>
          </>
        )}

        <div className="mt-auto pt-4 grid grid-cols-2 gap-3">
            <Button className="w-full">Contact</Button>
            <Button variant="outline" className="w-full" asChild>
                <Link href={`/flats/${flat.id}`}>Details</Link>
            </Button>
        </div>
      </CardContent>
    </Card>
    </>
  );
}
