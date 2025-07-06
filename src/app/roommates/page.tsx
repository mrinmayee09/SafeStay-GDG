'use client';

import { useState, useMemo } from 'react';
import { roommates, type Roommate } from '@/lib/data';
import { RoommateCard } from '@/components/roommate-card';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Users, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const allBranches = [...new Set(roommates.map((r) => r.branch))];
const allHobbies = [...new Set(roommates.flatMap((r) => r.hobbies))];
const allYears = [...new Set(roommates.map((r) => r.year))];

export default function RoommatesPage() {
  const [filters, setFilters] = useState({
    search: '',
    branches: [] as string[],
    hobbies: [] as string[],
    year: '',
  });

  const handleCheckboxChange = (key: 'branches' | 'hobbies', value: string) => {
    setFilters(prev => {
        const newValues = prev[key].includes(value)
            ? prev[key].filter(v => v !== value)
            : [...prev[key], value];
        return {...prev, [key]: newValues};
    });
  };

  const filteredRoommates = useMemo(() => {
    return roommates.filter((roommate) => {
      if (filters.search && !roommate.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
       if (filters.year && roommate.year !== filters.year) {
        return false;
      }
      if (filters.branches.length > 0 && !filters.branches.includes(roommate.branch)) {
        return false;
      }
      if (filters.hobbies.length > 0 && !filters.hobbies.some((h) => roommate.hobbies.includes(h))) {
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
                Find a Roommate
              </h2>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="search">Search by name</Label>
                  <Input
                    id="search"
                    placeholder="e.g., Jessica..."
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="year">Year of Study</Label>
                  <Select value={filters.year} onValueChange={(value) => setFilters(prev => ({...prev, year: value === 'any' ? '' : value}))}>
                    <SelectTrigger id="year">
                      <SelectValue placeholder="Any Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Year</SelectItem>
                      {allYears.map((year) => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Branch</Label>
                  <div className="space-y-2 mt-2 max-h-40 overflow-y-auto">
                    {allBranches.map((branch) => (
                      <div key={branch} className="flex items-center space-x-2">
                        <Checkbox
                          id={`branch-${branch}`}
                          checked={filters.branches.includes(branch)}
                          onCheckedChange={() => handleCheckboxChange('branches', branch)}
                        />
                        <label
                          htmlFor={`branch-${branch}`}
                          className="text-sm font-medium leading-none"
                        >
                          {branch}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Hobbies</Label>
                  <div className="space-y-2 mt-2 max-h-60 overflow-y-auto">
                    {allHobbies.map((hobby) => (
                      <div key={hobby} className="flex items-center space-x-2">
                        <Checkbox
                          id={`hobby-${hobby}`}
                          checked={filters.hobbies.includes(hobby)}
                          onCheckedChange={() => handleCheckboxChange('hobbies', hobby)}
                        />
                        <label
                          htmlFor={`hobby-${hobby}`}
                          className="text-sm font-medium leading-none"
                        >
                          {hobby}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        <main className="lg:col-span-3">
          <h1 className="text-3xl font-bold mb-6">Roommate Discovery</h1>
           {filteredRoommates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
              {filteredRoommates.map((roommate) => (
                <RoommateCard key={roommate.id} roommate={roommate} />
              ))}
            </div>
           ) : (
             <div className="flex flex-col items-center justify-center text-center h-full min-h-[40vh] bg-card rounded-lg p-8">
                <Users className="w-16 h-16 text-muted-foreground/50 mb-4"/>
                <p className="text-lg font-medium">No roommates match your criteria.</p>
                <p className="text-muted-foreground mt-2">Try adjusting your filters to find more options.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
