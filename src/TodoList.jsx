import React, { useState } from 'react';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [taskDescription, setTaskDescription] = useState('');
    const [taskCategory, setTaskCategory] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleAddTask = () => {
        if (taskDescription && taskCategory) {
            const newTask = {
                description: taskDescription,
                category: taskCategory,
                completed: false,
            };
            setTasks([...tasks, newTask]);
            resetForm();
        }
    };

    const handleEditTask = (index) => {
        setTaskDescription(tasks[index].description);
        setTaskCategory(tasks[index].category);
        setEditingIndex(index);
    };

    const handleUpdateTask = () => {
        if (editingIndex !== null) {
            const updatedTasks = tasks.map((task, index) =>
                index === editingIndex ? { ...task, description: taskDescription, category: taskCategory } : task
            );
            setTasks(updatedTasks);
            resetForm();
        }
    };

    const handleToggleComplete = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    const handleDeleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    const resetForm = () => {
        setTaskDescription('');
        setTaskCategory('');
        setEditingIndex(null);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark', !isDarkMode);
    };

    return (
        <div className={`max-w-md mx-auto p-5 bg-white rounded-lg shadow-md dark:bg-gray-800 transition-colors duration-300`}>
            <h1 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-white font-poppins">To Do List</h1>
            <button 
                className="mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300 w-full"
                onClick={toggleDarkMode}
            >
                {isDarkMode ? 'Toggle Light Mode' : 'Toggle Dark Mode'}
            </button>
            <div className="flex flex-col gap-3 mb-5">
                <input 
                    type="text" 
                    placeholder="Task Description" 
                    className="border rounded p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    value={taskDescription} 
                    onChange={(e) => setTaskDescription(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="Category" 
                    className="border rounded p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    value={taskCategory} 
                    onChange={(e) => setTaskCategory(e.target.value)} 
                />
                <button 
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300"
                    onClick={editingIndex !== null ? handleUpdateTask : handleAddTask}
                >
                    {editingIndex !== null ? 'Update Task' : 'Add Task'}
                </button>
            </div>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index} className={`flex justify-between items-center p-2 ${task.completed ? 'line-through text-red-500' : 'text-gray-800'} dark:text-gray-300`}>
                        <span className="flex-grow text-left">{`${task.description} (${task.category})`}</span>
                        <div className="flex space-x-2">
                            <button className="text-green-500 hover:text-green-700" onClick={() => handleToggleComplete(index)}>✓</button>
                            <button className="text-yellow-500 hover:text-yellow-700" onClick={() => handleEditTask(index)}>Edit</button>
                            <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteTask(index)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="text-center mt-4 font-bold text-gray-800 dark:text-white">
                Total Completed Tasks: {tasks.filter(task => task.completed).length}
            </div>
        </div>
    );
};

export default TodoList;