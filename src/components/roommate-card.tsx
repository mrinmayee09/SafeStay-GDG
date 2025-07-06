import { Card, CardContent } from '@/components/ui/card';
import { type Roommate } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from './ui/badge';
import { GraduationCap, CalendarDays, MessageSquare, Star, Sparkles, UserCheck2 } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

type RoommateCardProps = {
  roommate: Roommate;
  matchScore?: number;
  compatibilityReason?: string;
};

export function RoommateCard({ roommate, matchScore, compatibilityReason }: RoommateCardProps) {
  return (
    <Card className="h-full transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col">
      <CardContent className="p-6 flex flex-col items-center text-center flex-grow">
        <Avatar className="w-24 h-24 mb-4 border-4 border-primary/20">
          <AvatarImage src={roommate.photo} alt={`Photo of ${roommate.name}`} data-ai-hint="student portrait" />
          <AvatarFallback>{roommate.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h3 className="font-semibold text-xl">{roommate.name}, {roommate.age}</h3>
        
        <div className="text-muted-foreground text-sm mt-2 space-y-1">
            <div className="flex items-center justify-center gap-2">
                <GraduationCap className="w-4 h-4 text-primary" />
                <span>{roommate.branch}</span>
            </div>
             <div className="flex items-center justify-center gap-2">
                <CalendarDays className="w-4 h-4 text-primary" />
                <span>{roommate.year}</span>
            </div>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
            {roommate.hobbies.map(hobby => (
                <Badge key={hobby} variant="secondary">{hobby}</Badge>
            ))}
        </div>
        
        {matchScore !== undefined && compatibilityReason && (
            <div className="w-full mt-4 bg-accent p-3 rounded-lg text-left">
                <div className='flex items-center justify-between mb-2'>
                    <h4 className="font-semibold text-sm flex items-center gap-1.5"><UserCheck2 className="w-4 h-4 text-accent-foreground" /> Compatibility</h4>
                    <span className="font-bold text-lg text-primary">{matchScore}%</span>
                </div>
                <Progress value={matchScore} className="h-2 mb-2" />
                <p className="text-xs text-muted-foreground italic">"{compatibilityReason}"</p>
            </div>
        )}


        <div className="mt-auto pt-5 w-full">
            <Button className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
