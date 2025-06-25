
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrashItem as TrashItemType } from '@/data/gameData';

interface TrashItemProps {
  item: TrashItemType;
  isCompleted: boolean;
  isIncorrect: boolean;
  isSelected: boolean;
  onDragStart: (item: TrashItemType) => void;
  onTouchStart: (item: TrashItemType) => void;
}

const TrashItem: React.FC<TrashItemProps> = ({
  item, isCompleted, isIncorrect, isSelected, onDragStart, onTouchStart
}) => {
  const isProcessed = isCompleted || isIncorrect;
  return (
    <Card
      className={`transition-all duration-300 relative ${
        isProcessed
          ? 'opacity-50 scale-75 pointer-events-none'
          : 'cursor-grab active:cursor-grabbing hover:scale-110 hover:shadow-lg'
      } ${isSelected ? 'outline outline-4 outline-blue-400 z-30' : ''}`}
      draggable={!isProcessed}
      onDragStart={() => onDragStart(item)}
      onTouchStart={() => onTouchStart(item)}
      onTouchEnd={e => e.preventDefault()}
    >
      <CardContent className="p-4 text-center">
        <div className="text-4xl sm:text-6xl mb-2">{item.image}</div>
        <p className="text-xs sm:text-sm font-medium">{item.name}</p>
        {isCompleted && <div className="text-green-500 text-2xl mt-2">✓</div>}
        {isIncorrect && <div className="text-red-500 text-2xl mt-2">✗</div>}
        {isSelected && (
          <div className="absolute inset-0 bg-blue-200/30 pointer-events-none rounded" />
        )}
      </CardContent>
    </Card>
  )
};

export default TrashItem;
