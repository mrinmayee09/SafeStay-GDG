
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';


const allBranches = [...new Set(allRoommates.map((r) => r.branch))];
const allHobbies = [...new Set(allRoommates.flatMap((r) => r.hobbies))];
const allYears = [...new Set(allRoommates.map((r) => r.year))].sort();

export default function RoommatesPage() {
  const [filters, setFilters] = useState({
    search: '',
    branches: [] as string[],
    hobbies: [] as string[],
    year: '',
  });

  const [seekerInput, setSeekerInput] = useState({
    name: '',
    age: 20,
    year: '',
    branch: 'CST',
    hobbies: '',
    personality: '',
    socialHabits: '',
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [recommendations, setRecommendations] = useState<RecommendedRoommate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAiView, setIsAiView] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSeekerInput(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: 'year' | 'branch', value: string) => {
    setSeekerInput(prev => ({ ...prev, [name]: value }));
  };

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
    if (!seekerInput.name || !seekerInput.year || !seekerInput.branch || !seekerInput.personality || !seekerInput.socialHabits) {
        setError('Please fill out your name, year, branch, personality, and social habits to get the best matches.');
        return;
    }
    
    setIsLoading(true);
    setError('');
    setRecommendations([]);

    try {
        const seekerProfile = {
            ...seekerInput,
            hobbies: seekerInput.hobbies.split(',').map(h => h.trim()).filter(Boolean),
            age: Number(seekerInput.age) || 20,
        };

        const candidates = allRoommates;
        
        const result = await matchRoommates({ seekerProfile, candidates });
        setRecommendations(result.recommendations);
        setIsAiView(true);
        setIsDialogOpen(false);

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
                <CardDescription>Enter your preferences to find the most compatible roommates.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isAiView ? (
                     <Button onClick={handleReset} variant="outline" className="w-full">
                        <RefreshCw className="mr-2 h-4 w-4" /> Reset & Find New Matches
                    </Button>
                ) : (
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="w-full">
                            <Wand2 className="mr-2 h-4 w-4"/>
                            Find My Perfect Match
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[480px]">
                        <DialogHeader>
                          <DialogTitle>Tell Us About Yourself</DialogTitle>
                          <DialogDescription>
                            Fill in your details so our AI can find the best matches for you. This profile won't be saved.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4 max-h-[65vh] overflow-y-auto pr-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" name="name" value={seekerInput.name} onChange={handleInputChange} placeholder="Your Name" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="age">Age</Label>
                                    <Input id="age" name="age" type="number" value={seekerInput.age} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                               <div className="space-y-2">
                                    <Label htmlFor="year-dialog">Year of Study</Label>
                                    <Select value={seekerInput.year} onValueChange={(value) => handleSelectChange('year', value)}>
                                      <SelectTrigger id="year-dialog"><SelectValue placeholder="Select Year" /></SelectTrigger>
                                      <SelectContent>
                                        {allYears.map((year) => (<SelectItem key={year} value={year}>{year}</SelectItem>))}
                                      </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="branch-dialog">Branch</Label>
                                    <Select value={seekerInput.branch} onValueChange={(value) => handleSelectChange('branch', value)}>
                                      <SelectTrigger id="branch-dialog"><SelectValue placeholder="Select Branch" /></SelectTrigger>
                                      <SelectContent>
                                        {allBranches.map((branch) => (<SelectItem key={branch} value={branch}>{branch}</SelectItem>))}
                                      </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="hobbies">Hobbies</Label>
                                <Input id="hobbies" name="hobbies" value={seekerInput.hobbies} onChange={handleInputChange} placeholder="e.g., Reading, Gaming, Yoga" />
                                <p className="text-xs text-muted-foreground">Enter a few hobbies, separated by commas.</p>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="personality">Personality</Label>
                                <Textarea id="personality" name="personality" value={seekerInput.personality} onChange={handleInputChange} placeholder="Describe your personality. e.g., 'Early bird and studious' or 'Night owl who is creative and spontaneous'." />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="socialHabits">Social Habits</Label>
                                <Textarea id="socialHabits" name="socialHabits" value={seekerInput.socialHabits} onChange={handleInputChange} placeholder="Describe your social style. e.g., 'I prefer quiet nights watching movies' or 'I enjoy hosting friends for dinner'." />
                            </div>
                             {error && (
                                <Alert variant="destructive">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}
                        </div>
                        <Button onClick={handleFindMatches} disabled={isLoading} className="w-full">
                          {isLoading ? (
                              <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Finding Matches...</>
                          ) : (
                              'Generate Recommendations'
                          )}
                        </Button>
                      </DialogContent>
                    </Dialog>
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
                      disabled={isAiView}
                    />
                  </div>

                  <div>
                    <Label htmlFor="year">Year of Study</Label>
                    <Select disabled={isAiView} value={filters.year} onValueChange={(value) => setFilters(prev => ({ ...prev, year: value === 'any' ? '' : value }))}>
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
                             disabled={isAiView}
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
                             disabled={isAiView}
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
