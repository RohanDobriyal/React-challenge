import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { format } from 'date-fns';
import { Task, Priority, Category } from '../types/task';
import { Trash2, GripVertical, Calendar, Tag, Flag } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdatePriority: (id: string, priority: Priority) => void;
  onUpdateCategory: (id: string, category: Category) => void;
  onUpdateDueDate: (id: string, date: Date | null) => void;
}

const priorityColors = {
  low: 'bg-green-100 text-green-800 border-green-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  high: 'bg-red-100 text-red-800 border-red-200',
};

const categoryColors = {
  personal: 'bg-purple-100 text-purple-800 border-purple-200',
  work: 'bg-blue-100 text-blue-800 border-blue-200',
  groceries: 'bg-orange-100 text-orange-800 border-orange-200',
  health: 'bg-pink-100 text-pink-800 border-pink-200',
  other: 'bg-gray-100 text-gray-800 border-gray-200',
};

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onDelete,
  onUpdatePriority,
  onUpdateCategory,
  onUpdateDueDate,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`task-item flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-white/20
        ${task.completed ? 'opacity-50' : ''}`}
    >
      <div {...attributes} {...listeners} className="cursor-grab hover:text-blue-600 transition-colors duration-200">
        <GripVertical className="text-gray-400" />
      </div>

      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="checkbox-custom"
      />

      <div className="flex-1">
        <p className={`text-lg ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
          {task.title}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-2">
          <span className={`tag-badge border ${priorityColors[task.priority]}`}>
            <Flag className="w-3 h-3" />
            {task.priority}
          </span>
          
          <span className={`tag-badge border ${categoryColors[task.category]}`}>
            <Tag className="w-3 h-3" />
            {task.category}
          </span>
          
          {task.dueDate && (
            <span className="tag-badge bg-gray-100 text-gray-800 border border-gray-200">
              <Calendar className="w-3 h-3" />
              {format(task.dueDate, 'MMM d, yyyy')}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
        title="Delete task"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};