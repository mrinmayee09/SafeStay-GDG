'use client';

import { useState, useMemo } from 'react';
import { roommates as allRoommates, type Roommate } from '@/lib/data';
import { RoommateCard } from '@/components/roommate-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Users, Filter, Wand2, Loader2, RefreshCw } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { matchRoommates, type RecommendedRoommate } from '@/ai/flows/match-roommates';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


const allBranches = [...new Set(allRoommates.map((r) => r.branch))];
const allHobbies = [...new Set(allRoommates.flatMap((r) => r.hobbies))];
const allYears = [...new Set(allRoommates.map((r) => r.year))];

export default function RoommatesPage() {
  const [filters, setFilters] = useState({
    search: '',
    branches: [] as string[],
    hobbies: [] as string[],
    year: '',
  });

  const [selectedSeekerId, setSelectedSeekerId] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendedRoommate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAiView, setIsAiView] = useState(false);

  const handleCheckboxChange = (key: 'branches' | 'hobbies', value: string) => {
    setFilters(prev => {
      const newValues = prev[key].includes(value)
        ? prev[key].filter(v => v !== value)
        : [...prev[key], value];
      return { ...prev, [key]: newValues };
    });
  };

  const manuallyFilteredRoommates = useMemo(() => {
    return allRoommates.filter((roommate) => {
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

  const handleFindMatches = async () => {
    if (!selectedSeekerId) {
        setError('Please select your profile first.');
        return;
    }
    
    setIsLoading(true);
    setError('');
    setRecommendations([]);

    try {
        const seekerProfile = allRoommates.find(r => r.id === parseInt(selectedSeekerId));
        if (!seekerProfile) throw new Error('Seeker profile not found');

        const candidates = allRoommates.filter(r => r.id !== parseInt(selectedSeekerId));
        
        const result = await matchRoommates({ seekerProfile, candidates });
        setRecommendations(result.recommendations);
        setIsAiView(true);

    } catch (e) {
        console.error(e);
        setError('Could not generate matches. Please try again.');
    } finally {
        setIsLoading(false);
    }
  };

  const handleReset = () => {
    setIsAiView(false);
    setRecommendations([]);
    setSelectedSeekerId(null);
    setError('');
  };

  const displayedRoommates = isAiView ? recommendations : manuallyFilteredRoommates;

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Wand2 className="w-5 h-5 text-primary"/> AI Matchmaker</CardTitle>
                <CardDescription>Select your profile to find the most compatible roommates.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="seeker-profile">Who are you?</Label>
                  <Select 
                    value={selectedSeekerId ?? ''} 
                    onValueChange={setSelectedSeekerId}
                    disabled={isLoading}
                  >
                    <SelectTrigger id="seeker-profile">
                      <SelectValue placeholder="Select your profile..." />
                    </SelectTrigger>
                    <SelectContent>
                      {allRoommates.map(r => (
                        <SelectItem key={r.id} value={r.id.toString()}>{r.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {isAiView ? (
                     <Button onClick={handleReset} variant="outline" className="w-full">
                        <RefreshCw className="mr-2 h-4 w-4" /> Reset View
                    </Button>
                ) : (
                    <Button onClick={handleFindMatches} disabled={isLoading || !selectedSeekerId} className="w-full">
                        {isLoading ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Finding Matches...</>
                        ) : (
                            'Find My Matches'
                        )}
                    </Button>
                )}
                 {error && (
                    <Alert variant="destructive" className="mt-4">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
              </CardContent>
            </Card>

            <Card className={isAiView ? 'opacity-50 pointer-events-none' : ''}>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
                  <Filter className="w-5 h-5" />
                  Filter Manually
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
                    <Select value={filters.year} onValueChange={(value) => setFilters(prev => ({ ...prev, year: value === 'any' ? '' : value }))}>
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
                          <label htmlFor={`branch-${branch}`} className="text-sm font-medium leading-none">{branch}</label>
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
                          <label htmlFor={`hobby-${hobby}`} className="text-sm font-medium leading-none">{hobby}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>

        <main className="lg:col-span-3">
          <h1 className="text-3xl font-bold mb-6">
            {isAiView ? "Your Top Recommendations" : "Roommate Discovery"}
          </h1>
          {displayedRoommates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
              {displayedRoommates.map((roommate) => (
                <RoommateCard 
                  key={roommate.id} 
                  roommate={roommate}
                  // The type assertion is needed because displayedRoommates can be Roommate[] or RecommendedRoommate[]
                  matchScore={(roommate as RecommendedRoommate).matchScore}
                  compatibilityReason={(roommate as RecommendedRoommate).compatibilityReason}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center h-full min-h-[40vh] bg-card rounded-lg p-8">
              <Users className="w-16 h-16 text-muted-foreground/50 mb-4" />
              <p className="text-lg font-medium">No roommates match your criteria.</p>
              <p className="text-muted-foreground mt-2">Try adjusting your filters to find more options.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
