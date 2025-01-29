'use client';
import { useState, useEffect } from "react";
import useTodoStore from "@/store/todoStore";
import { getAPI, postAPI } from "@/services/fetchAPI";
import TodoForm from "@/components/todo/TodoForm";
import TodoList from "@/components/todo/TodoList";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function Home() {
  const { todos, setTodos, addTodo, removeTodo, updateTodo } = useTodoStore();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const data = await getAPI("/api/todos");
        setTodos(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Görevler yüklenirken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, [setTodos]);

  const handleSubmit = async (newTodo) => {
    try {
      const data = await postAPI("/api/todos", newTodo);
      if (data && data.id) {
        addTodo(data);
        setError("");
      } else {
        setError("Görev eklenirken bir hata oluştu");
      }
    } catch (err) {
      setError("Görev eklenirken bir hata oluştu");
    }
  };

  const handleToggleComplete = async (todo) => {
    try {
      setError("");
      const data = await postAPI(`/api/todos/${todo.id}`,
        { completed: !todo.completed },
        "PUT"
      );
      updateTodo(todo.id, data);
    } catch (err) {
      setError(err.message || "Görev güncellenirken bir hata oluştu");
    }
  };

  const handleDelete = async (id) => {
    try {
      setError("");
      await postAPI(`/api/todos/${id}`, {}, "DELETE");
      removeTodo(id);
    } catch (err) {
      setError(err.message || "Görev silinirken bir hata oluştu");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Görev Yöneticisi
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Görevlerinizi kolayca yönetin
            </p>
          </div>

          <div className="grid gap-8">
            <ErrorMessage message={error} />
            <TodoForm onSubmit={handleSubmit} />
            <TodoList
              todos={todos}
              onToggle={handleToggleComplete}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
