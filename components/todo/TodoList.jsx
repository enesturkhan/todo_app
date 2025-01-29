import TodoItem from './TodoItem';

export default function TodoList({ todos, onToggle, onDelete }) {
    if (!Array.isArray(todos) || todos.length === 0) {
        return (
            <div className="text-center py-16 px-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                <div className="mb-6">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Henüz görev yok
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                    İlk görevinizi ekleyerek başlayın!
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
} 