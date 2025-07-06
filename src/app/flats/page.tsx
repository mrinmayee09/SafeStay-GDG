'use client';

import { useState } from 'react';
import { FlatCard } from '@/components/flat-card';
import { flats, type Flat } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

export default function FlatsPage() {
  const [safetyRating, setSafetyRating] = useState([3]);

  // In a real app, these would be controlled states that filter the list
  // For this prototype, the UI is just for show.

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Browse Listings</h1>
          <p className="mt-2 text-lg text-muted-foreground">Find the perfect, safe place to call home.</p>
      </div>

      {/* Filters */}
      <Card className="mb-8 shadow-sm">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
            <div>
              <Label htmlFor="budget" className="text-sm font-medium">Budget Range</Label>
              <Select>
                <SelectTrigger id="budget" className="mt-2">
                  <SelectValue placeholder="Any Budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="<15000">Under ₹15,000</SelectItem>
                  <SelectItem value="15000-25000">₹15,000 - ₹25,000</SelectItem>
                  <SelectItem value="25000-40000">₹25,000 - ₹40,000</SelectItem>
                  <SelectItem value=">40000">Over ₹40,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div>
              <Label htmlFor="location" className="text-sm font-medium">Location</Label>
              <Select>
                <SelectTrigger id="location" className="mt-2">
                  <SelectValue placeholder="Any Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bandra">Bandra</SelectItem>
                  <SelectItem value="andheri">Andheri</SelectItem>
                  <SelectItem value="juhu">Juhu</SelectItem>
                  <SelectItem value="powai">Powai</SelectItem>
                  <SelectItem value="vile-parle">Vile Parle</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div>
              <Label htmlFor="room-type" className="text-sm font-medium">Room Type</Label>
              <Select>
                <SelectTrigger id="room-type" className="mt-2">
                  <SelectValue placeholder="Any Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1rk">1RK</SelectItem>
                  <SelectItem value="1bhk">1BHK</SelectItem>
                  <SelectItem value="2bhk">2BHK</SelectItem>
                  <SelectItem value="pg">Paying Guest</SelectItem>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {flats.map((flat) => (
          <FlatCard key={flat.id} flat={flat} />
        ))}
      </div>
    </div>
  );
}
