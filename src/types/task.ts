export type Priority = 'low' | 'medium' | 'high';
export type Category = 'personal' | 'work' | 'groceries' | 'health' | 'other';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  category: Category;
  priority: Priority;
  dueDate: Date | null;
  createdAt: Date;
}