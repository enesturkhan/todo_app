import { create } from 'zustand'

const useTodoStore = create((set) => ({
    todos: [],
    loading: false,
    error: null,

    setTodos: (todos) => set({ todos }),
    addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
    removeTodo: (id) => set((state) => ({
        todos: state.todos.filter(todo => todo.id !== id)
    })),
    updateTodo: (id, data) => set((state) => ({
        todos: state.todos.map(todo =>
            todo.id === id ? { ...todo, ...data } : todo
        )
    })),

    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error })
}))

export default useTodoStore 