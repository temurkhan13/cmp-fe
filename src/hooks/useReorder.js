import { useState } from 'react';

export const useReorder = () => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDraggedOverIndex(index);
  };

  const handleDrop = (e, items, setItems, cb) => {
    e.preventDefault();
    const newItems = [...items];
    const draggedItem = newItems[draggedIndex];
    newItems.splice(draggedIndex, 1);
    newItems.splice(draggedOverIndex, 0, draggedItem);
    setItems(newItems);
    setDraggedIndex(null);
    setDraggedOverIndex(null);
    cb ? cb(newItems) : null;
  };

  const handleDragedEnd = () => {
    setDraggedIndex(null);
    setDraggedOverIndex(null);
  };

  return [
    draggedIndex,
    draggedOverIndex,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragedEnd,
  ];
};
