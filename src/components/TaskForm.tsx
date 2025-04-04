import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { addTask } from '../store/taskSlice';
import { Priority, Category } from '../types/task';
import { Plus, Calendar, Flag, Tag } from 'lucide-react';
import { toast } from 'react-toastify';

export const TaskForm: React.FC = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState<Category>('personal');
  const [dueDate, setDueDate] = useState<Date | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Please enter a task title');
      return;
    }

    dispatch(
      addTask({
        id: crypto.randomUUID(),
        title: title.trim(),
        completed: false,
        priority,
        category,
        dueDate,
        createdAt: new Date(),
      })
    );

    toast.success('Task added successfully!');
    setTitle('');
    setPriority('medium');
    setCategory('personal');
    setDueDate(null);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="input-field w-full"
          />
        </div>
        
        <div className="flex gap-4 flex-wrap md:flex-nowrap">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              placeholderText="Set due date"
              className="input-field pl-10"
              dateFormat="MMM d, yyyy"
              isClearable
            />
          </div>

          <div className="relative">
            <Flag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              className="select-field pl-10"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>

          <div className="relative">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="select-field pl-10"
            >
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="groceries">Groceries</option>
              <option value="health">Health</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button type="submit" className="btn-primary">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </form>
  );
};