
import React from "react";
import { Star, StarHalf, StarOff } from "lucide-react";

interface LevelStarsProps {
  stars: number; // 0, 1, 2, 3
  size?: number;
}

const LevelStars: React.FC<LevelStarsProps> = ({ stars, size = 20 }) => {
  return (
    <div className="flex gap-0.5 justify-center" aria-label={`${stars} bintang`}>
      {[1, 2, 3].map((n) =>
        stars >= n ? (
          <Star key={n} size={size} color="#facc15" fill="#facc15" strokeWidth={1.5} />
        ) : (
          <StarOff key={n} size={size} color="#d1d5db" strokeWidth={1.5} />
        )
      )}
    </div>
  );
};

export default LevelStars;
