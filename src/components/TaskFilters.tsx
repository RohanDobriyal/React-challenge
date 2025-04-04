import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setFilter, setCategoryFilter, setSearchQuery } from '../store/taskSlice';
import { Category } from '../types/task';
import { Search, Filter, Tag } from 'lucide-react';

export const TaskFilters: React.FC = () => {
  const dispatch = useDispatch();
  const { filter, categoryFilter, searchQuery } = useSelector(
    (state: RootState) => state.tasks
  );

  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            placeholder="Search tasks..."
            className="input-field w-full pl-10"
          />
        </div>

        <div className="flex gap-4">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={filter}
              onChange={(e) => dispatch(setFilter(e.target.value as 'all' | 'completed' | 'incomplete'))}
              className="select-field pl-10"
            >
              <option value="all">All Tasks</option>
              <option value="completed">Completed</option>
              <option value="incomplete">Incomplete</option>
            </select>
          </div>

          <div className="relative">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={categoryFilter}
              onChange={(e) => dispatch(setCategoryFilter(e.target.value as Category | 'all'))}
              className="select-field pl-10"
            >
              <option value="all">All Categories</option>
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="groceries">Groceries</option>
              <option value="health">Health</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};