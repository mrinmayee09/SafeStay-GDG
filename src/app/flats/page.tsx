
'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FlatCard } from '@/components/flat-card';
import { flats, type Flat } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Users, Search } from 'lucide-react';

const allLocations = [...new Set(flats.map((f) => f.location))];
const allRoomTypes = [...new Set(flats.map((f) => f.type))];

function FlatsPageContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [budget, setBudget] = useState('all');
  const [location, setLocation] = useState('all');
  const [roomType, setRoomType] = useState('all');
  const [safetyRating, setSafetyRating] = useState([3]);
  
  // Effect to update search query if URL changes
  useEffect(() => {
    setSearchQuery(initialSearch);
  }, [initialSearch]);


  const filteredFlats = useMemo(() => {
    return flats.filter((flat) => {
      // Search Query Filter (name or location)
      if (searchQuery && 
         !flat.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
         !flat.location.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
        
      // Safety Rating Filter
      if (flat.safetyRating < safetyRating[0]) {
        return false;
      }
      
      // Location Filter
      if (location !== 'all' && flat.location !== location) {
        return false;
      }

      // Room Type Filter
      if (roomType !== 'all' && flat.type !== roomType) {
        return false;
      }
      
      // Budget Filter
      if (budget && budget !== 'all') {
        const [minStr, maxStr] = budget.split('-');
        const min = Number(minStr);
        const max = maxStr ? Number(maxStr) : null;
        
        if (max) {
          // Range like "15000-25000"
          if (flat.price < min || flat.price > max) return false;
        } else {
            // Unbounded range like "<15000" or ">40000"
            // For these, we extract the number from the string
            const budgetVal = parseInt(budget.replace(/<|>/g, ''));
            if (budget.startsWith('<') && flat.price >= budgetVal) return false;
            if (budget.startsWith('>') && flat.price <= budgetVal) return false;
        }
      }

      return true;
    });
  }, [searchQuery, safetyRating, location, roomType, budget]);

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Browse Listings</h1>
          <p className="mt-2 text-lg text-muted-foreground">Find the perfect, safe place to call home.</p>
      </div>

      {/* Filters */}
      <Card className="mb-8 shadow-sm">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
            <div className="lg:col-span-4">
                <Label htmlFor="search" className="text-sm font-medium">Search by Name or Location</Label>
                <div className="relative mt-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                        id="search"
                        placeholder="e.g., Cozy 1BHK or Vile Parle..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
            <div>
              <Label htmlFor="budget" className="text-sm font-medium">Budget Range</Label>
              <Select value={budget} onValueChange={setBudget}>
                <SelectTrigger id="budget" className="mt-2">
                  <SelectValue placeholder="Any Budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Budget</SelectItem>
                  <SelectItem value="<15000">Under ₹15,000</SelectItem>
                  <SelectItem value="15000-25000">₹15,000 - ₹25,000</SelectItem>
                  <SelectItem value="25000-40000">₹25,000 - ₹40,000</SelectItem>
                  <SelectItem value=">40000">Over ₹40,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div>
              <Label htmlFor="location" className="text-sm font-medium">Location</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger id="location" className="mt-2">
                  <SelectValue placeholder="Any Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Location</SelectItem>
                  {allLocations.map((loc) => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
             <div>
              <Label htmlFor="room-type" className="text-sm font-medium">Room Type</Label>
              <Select value={roomType} onValueChange={setRoomType}>
                <SelectTrigger id="room-type" className="mt-2">
                  <SelectValue placeholder="Any Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Type</SelectItem>
                   {allRoomTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
                <Label htmlFor="safety-rating" className="text-sm font-medium">Min Safety Rating: <span className="font-bold text-primary">{safetyRating[0]}+</span></Label>
                <Slider
                    id="safety-rating"
                    min={0}
                    max={5}
                    step={0.5}
                    defaultValue={safetyRating}
                    onValueChange={(value) => setSafetyRating(value)}
                    className="mt-3"
                />
            </div>
        </CardContent>
      </Card>
      
      {/* Listings Grid */}
      {filteredFlats.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFlats.map((flat) => (
            <FlatCard key={flat.id} flat={flat} />
            ))}
        </div>
      ) : (
         <div className="flex flex-col items-center justify-center text-center h-full min-h-[40vh] bg-card rounded-lg p-8 border-dashed border-2">
            <Users className="w-16 h-16 text-muted-foreground/50 mb-4" />
            <p className="text-lg font-medium">No Listings Match Your Criteria</p>
            <p className="text-muted-foreground mt-2">Try adjusting your filters or checking back later for new listings.</p>
        </div>
      )}
    </div>
  );
}


export default function FlatsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <FlatsPageContent />
        </Suspense>
    )
}
