'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

type StarRatingProps = {
  rating: number;
  totalStars?: number;
  size?: number;
  onRate?: (rating: number) => void;
  className?: string;
  isInteractive?: boolean;
};

export function StarRating({
  rating,
  totalStars = 5,
  size = 20,
  onRate,
  className,
  isInteractive = false,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (index: number) => {
    if (isInteractive) {
      setHoverRating(index);
    }
  };

  const handleMouseLeave = () => {
    if (isInteractive) {
      setHoverRating(0);
    }
  };

  const handleClick = (index: number) => {
    if (isInteractive && onRate) {
      onRate(index);
    }
  };

  return (
    <div className={cn('flex items-center', className)}>
      {[...Array(totalStars)].map((_, i) => {
        const starValue = i + 1;
        return (
          <Star
            key={starValue}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starValue)}
            size={size}
            className={cn(
              'transition-colors duration-200',
              isInteractive ? 'cursor-pointer' : '',
              starValue <= (hoverRating || rating)
                ? 'text-amber-400 fill-amber-400'
                : 'text-gray-300'
            )}
          />
        );
      })}
    </div>
  );
}
