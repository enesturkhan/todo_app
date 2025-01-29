'use client';

export default function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <div className={`group bg-white dark:bg-gray-800 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl ${todo.completed ? 'opacity-75' : ''
            }`}>
            <div className="p-6">
                <div className="flex items-start gap-4">
                    <button
                        onClick={() => onToggle(todo)}
                        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${todo.completed
                                ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-transparent'
                                : 'border-gray-300 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-400'
                            }`}
                    >
                        {todo.completed && (
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </button>

                    <div className="flex-grow min-w-0">
                        <h3 className={`text-lg font-semibold text-gray-900 dark:text-gray-100 truncate transition-all duration-300 ${todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
                            }`}>
                            {todo.title}
                        </h3>
                        {todo.description && (
                            <p className={`mt-1 text-gray-600 dark:text-gray-400 line-clamp-2 transition-all duration-300 ${todo.completed ? 'line-through opacity-75' : ''
                                }`}>
                                {todo.description}
                            </p>
                        )}
                    </div>

                    <button
                        onClick={() => onDelete(todo.id)}
                        className="flex-shrink-0 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-all duration-300 transform hover:scale-110"
                        aria-label="Delete task"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
} 