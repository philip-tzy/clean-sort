
import { TrashItem } from '@/data/gameData';

interface UseDragTouchHandlersParams {
  completedItems: Set<string>;
  incorrectItems: Set<string>;
  setDraggedItem: (v: TrashItem|null) => void;
  // setTouchSelectedItem: (v: TrashItem|null) => void; // tidak perlu lagi
}

export const useDragTouchHandlers = ({
  completedItems,
  incorrectItems,
  setDraggedItem,
}: UseDragTouchHandlersParams) => {
  // Handler untuk drag (desktop & mobile)
  const handleDragStart = (item: TrashItem) => {
    if (completedItems.has(item.id) || incorrectItems.has(item.id)) return;
    setDraggedItem(item);
  };
  // Handler touch mobile (langsung drag pada tap)
  const handleTouchStart = (item: TrashItem) => {
    if (completedItems.has(item.id) || incorrectItems.has(item.id)) return;
    setDraggedItem(item);
  };
  return { handleDragStart, handleTouchStart };
};
