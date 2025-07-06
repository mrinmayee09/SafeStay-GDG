'use client';

import { useState, useMemo } from 'react';
import { flats, type Flat } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { FlatCard } from '@/components/flat-card';
import { Filter } from 'lucide-react';

const allAmenities = [...new Set(flats.flatMap((f) => f.amenities))];
const allLocations = [...new Set(flats.map((f) => f.location))];

export default function FlatsPage() {
  const [filters, setFilters] = useState({
    search: '',
    location: 'all',
    price: [1200],
    amenities: [] as string[],
    safety: 0,
  });

  const handleFilterChange = (key: keyof typeof filters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  
  const handleAmenityChange = (amenity: string) => {
    setFilters(prev => {
        const newAmenities = prev.amenities.includes(amenity)
            ? prev.amenities.filter(a => a !== amenity)
            : [...prev.amenities, amenity];
        return {...prev, amenities: newAmenities};
    });
  };

  const filteredFlats = useMemo(() => {
    return flats.filter((flat) => {
      if (filters.search && !flat.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      if (filters.location !== 'all' && flat.location !== filters.location) {
        return false;
      }
      if (flat.price > filters.price[0]) {
        return false;
      }
      if (filters.amenities.length > 0 && !filters.amenities.every((a) => flat.amenities.includes(a))) {
        return false;
      }
      if (flat.safetyRating < filters.safety) {
        return false;
      }
      return true;
    });
  }, [filters]);

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5" />
                Filters
              </h2>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="search">Search by name</Label>
                  <Input
                    id="search"
                    placeholder="e.g., Sunny Campus..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Select
                    value={filters.location}
                    onValueChange={(value) => handleFilterChange('location', value)}
                  >
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {allLocations.map((loc) => (
                        <SelectItem key={loc} value={loc}>
                          {loc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="price">Max Price: ${filters.price[0]}</Label>
                  <Slider
                    id="price"
                    min={500}
                    max={1200}
                    step={50}
                    value={filters.price}
                    onValueChange={(value) => handleFilterChange('price', value)}
                  />
                </div>
                <div>
                  <Label>Amenities</Label>
                  <div className="space-y-2 mt-2">
                    {allAmenities.map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox
                          id={amenity}
                          checked={filters.amenities.includes(amenity)}
                          onCheckedChange={() => handleAmenityChange(amenity)}
                        />
                        <label
                          htmlFor={amenity}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {amenity}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="safety">Min Safety Rating: {filters.safety}</Label>
                   <Slider
                    id="safety"
                    min={0}
                    max={5}
                    step={0.5}
                    defaultValue={[filters.safety]}
                    onValueChange={(value) => handleFilterChange('safety', value[0])}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>
        <main className="lg:col-span-3">
          <h1 className="text-3xl font-bold mb-6">Find Your Safe Stay</h1>
          {filteredFlats.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredFlats.map((flat) => (
                <FlatCard key={flat.id} flat={flat} />
              ))}
            </div>
          ) : (
             <div className="flex flex-col items-center justify-center text-center h-full min-h-[40vh] bg-card rounded-lg p-8">
                <p className="text-lg font-medium">No flats match your criteria.</p>
                <p className="text-muted-foreground mt-2">Try adjusting your filters to find more options.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
