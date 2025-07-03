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
      className={`transition-all duration-300 relative
        ${isProcessed ? 'scale-75 pointer-events-none' : ''}
        ${!isProcessed && isSelected ? 'outline outline-4 outline-blue-400 z-30 scale-110 shadow-2xl bg-white bg-opacity-95' : ''}
        ${!isProcessed && !isSelected ? 'cursor-grab active:cursor-grabbing hover:scale-110 hover:shadow-lg hover:z-20' : ''}
      `}
      draggable={!isProcessed}
      onDragStart={e => {
        e.stopPropagation();
        // Custom drag image
        const crt = document.createElement('div');
        crt.style.position = 'absolute';
        crt.style.top = '-9999px';
        crt.style.left = '-9999px';
        crt.style.padding = '16px';
        crt.style.background = 'white';
        crt.style.border = '4px solid #2563eb';
        crt.style.borderRadius = '16px';
        crt.style.boxShadow = '0 8px 32px 8px rgba(30,64,175,0.45)';
        crt.style.fontWeight = 'bold';
        crt.style.fontSize = '1.1rem';
        crt.style.color = '#2563eb';
        crt.style.display = 'flex';
        crt.style.flexDirection = 'column';
        crt.style.alignItems = 'center';
        crt.innerHTML = `
          <img src="${item.image}" style="width:48px;height:48px;display:block;margin:0 auto 8px auto;filter:drop-shadow(0_6px_24px_rgba(30,64,175,0.55));" />
          <div style="text-align:center;">${item.name}</div>
        `;
        document.body.appendChild(crt);
        e.dataTransfer.setDragImage(crt, 32, 32);
        setTimeout(() => document.body.removeChild(crt), 0);
        onDragStart(item);
      }}
      onTouchStart={e => { e.stopPropagation(); onTouchStart(item); }}
      onTouchEnd={e => { e.preventDefault(); e.stopPropagation(); }}
    >
      <CardContent className="p-2 sm:p-4 text-center flex flex-col items-center justify-center">
        <img
          src={item.image}
          alt={item.name}
          className="mx-auto mb-2 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain aspect-square pointer-events-none"
          draggable={false}
        />
        <p className="text-xs sm:text-sm font-medium" draggable={false}>{item.name}</p>
        {isCompleted && <div className="text-green-500 text-2xl mt-2">✓</div>}
        {isIncorrect && <div className="text-red-500 text-2xl mt-2">✗</div>}
      </CardContent>
    </Card>
  )
};

export default TrashItem;
