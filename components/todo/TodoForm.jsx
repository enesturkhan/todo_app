'use client';
import { useState } from 'react';

export default function TodoForm({ onSubmit }) {
    const [newTodo, setNewTodo] = useState({ title: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newTodo.title.trim()) {
            return;
        }
        await onSubmit(newTodo);
        setNewTodo({ title: "" });
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Görev Başlığı
                    </label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Yeni görev ekleyin..."
                        value={newTodo.title}
                        onChange={(e) => setNewTodo({ title: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 focus:border-transparent transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                >
                    <div className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Görev Ekle</span>
                    </div>
                </button>
            </form>
        </div>
    );
} 