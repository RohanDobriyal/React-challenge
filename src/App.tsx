import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { TaskFilters } from './components/TaskFilters';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckSquare, ListTodo } from 'lucide-react';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-white rounded-2xl shadow-md">
                <CheckSquare className="w-10 h-10 text-blue-600" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                Task Manager
              </h1>
            </div>
            <p className="text-gray-600 text-lg">Organize your tasks efficiently and boost productivity</p>
          </div>

          <div className="space-y-8">
            <TaskForm />
            <TaskFilters />
            <div className="relative">
              <div className="absolute -left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full" />
              <TaskList />
            </div>
          </div>
        </div>

        <footer className="mt-16 text-center text-gray-500">
          <p className="flex items-center justify-center gap-2">
            <ListTodo className="w-4 h-4" />
            Stay organized, stay productive
          </p>
        </footer>
      </div>
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Provider>
  );
}

export default App;