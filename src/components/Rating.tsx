
import React from 'react';

interface RatingProps {
  rating: number;
  maxRating?: number;
}

export const Rating: React.FC<RatingProps> = ({ rating, maxRating = 5 }) => {
  return (
    <div className="flex">
      {[...Array(maxRating)].map((_, i) => (
        <svg 
          key={i}
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill={i < rating ? '#FFB129' : 'none'}
          stroke={i < rating ? '#FFB129' : '#D1D5DB'}
          className="h-5 w-5"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
};
