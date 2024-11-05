import React from 'react';
import TodoList from './TodoList';
import './index.css'; // Ensure you import your Tailwind CSS

const App = () => {
  return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 font-poppins">
          <TodoList />
      </div>
  );
};

export default App;