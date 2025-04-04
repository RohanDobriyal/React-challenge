import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import {
  toggleTask,
  removeTask,
  updateTaskPriority,
  updateTaskCategory,
  updateTaskDueDate,
  reorderTasks,
} from '../store/taskSlice';
import { TaskItem } from './TaskItem';
import { Task } from '../types/task';

export const TaskList: React.FC = () => {
  const dispatch = useDispatch();
  const { tasks, filter, categoryFilter, searchQuery } = useSelector(
    (state: RootState) => state.tasks
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const filteredTasks = tasks
    .filter(task => {
      if (filter === 'completed') return task.completed;
      if (filter === 'incomplete') return !task.completed;
      return true;
    })
    .filter(task => {
      if (categoryFilter === 'all') return true;
      return task.category === categoryFilter;
    })
    .filter(task => {
      if (!searchQuery) return true;
      return task.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task.id === active.id);
      const newIndex = tasks.findIndex((task) => task.id === over.id);
      dispatch(reorderTasks(arrayMove(tasks, oldIndex, newIndex)));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={filteredTasks.map(task => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={(id) => dispatch(toggleTask(id))}
              onDelete={(id) => dispatch(removeTask(id))}
              onUpdatePriority={(id, priority) =>
                dispatch(updateTaskPriority({ id, priority }))
              }
              onUpdateCategory={(id, category) =>
                dispatch(updateTaskCategory({ id, category }))
              }
              onUpdateDueDate={(id, dueDate) =>
                dispatch(updateTaskDueDate({ id, dueDate }))
              }
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};