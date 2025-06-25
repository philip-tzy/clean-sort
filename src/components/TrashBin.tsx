
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { binCategories } from '@/data/gameData';

interface TrashBinProps {
  binId: string;
  isActive: boolean;
  touchSelectedItem: any;
  onDrop: (binId: string) => void;
  onBinTouch: (binId: string) => void;
}

const TrashBin: React.FC<TrashBinProps> = ({
  binId,
  isActive,
  touchSelectedItem,
  onDrop,
  onBinTouch,
}) => {
  const bin = binCategories.find(b => b.id === binId);
  if (!bin) return null;

  return (
    <Card
      className={`${bin.color} text-white min-h-32 relative transition-all duration-300 hover:scale-105 cursor-pointer select-none`}
      onDragOver={e => e.preventDefault()}
      onDrop={e => {
        e.preventDefault();
        onDrop(bin.id);
      }}
      onTouchEnd={() => {
        onBinTouch(bin.id);
      }}
    >
      <CardContent className="p-4 text-center h-full flex flex-col justify-center">
        <div className="text-4xl mb-2">{bin.icon}</div>
        <h3 className="font-bold text-sm sm:text-base">{bin.name}</h3>
        <p className="text-xs opacity-90 mt-1 hidden sm:block">{bin.description}</p>
        {isActive && (
          <div className="absolute top-3 right-3">
            <span className="animate-pulse px-2 py-1 text-xs rounded bg-white/50 text-black font-bold">☝️ Pilih</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
};

export default TrashBin;
