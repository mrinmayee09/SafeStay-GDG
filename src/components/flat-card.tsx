import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { type Flat } from '@/lib/data';
import { StarRating } from './star-rating';
import { Badge } from './ui/badge';
import { MapPin } from 'lucide-react';

type FlatCardProps = {
  flat: Flat;
};

export function FlatCard({ flat }: FlatCardProps) {
  return (
    <Link href={`/flats/${flat.id}`} className="group block">
      <Card className="overflow-hidden h-full transition-shadow duration-300 hover:shadow-xl">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={flat.images[0]}
            alt={`Image of ${flat.name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="apartment exterior"
          />
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg leading-tight truncate pr-2">
              {flat.name}
            </h3>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 whitespace-nowrap">
              ${flat.price}/mo
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm mt-1 flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            {flat.location}
          </p>
          <div className="flex justify-between items-center mt-3">
            <StarRating rating={flat.safetyRating} size={18} />
            <span className="text-xs text-muted-foreground">{flat.type}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
