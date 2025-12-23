/**
 * Todo List Challenge Route
 * 
 * Demonstrates complex state management with a full-featured todo application.
 * Shows CRUD operations, filtering, and memoization patterns.
 * 
 * @module routes/challenges/todo-list
 */

import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useMemo } from 'react';

/**
 * Filter options for todo list
 */
const FILTER_OPTIONS = {
  ALL: 'All',
  PENDING: 'Pending',
  COMPLETED: 'Completed',
};

/**
 * TodoList Component
 * 
 * A full-featured todo list that demonstrates:
 * - Managing array state immutably
 * - CRUD operations (Create, Read, Update, Delete)
 * - Filtering with useMemo optimization
 * - Unique ID generation with crypto.randomUUID
 */
const TodoList = () => {
  // State for todos array
  const [todos, setTodos] = useState([]);
  // State for input field
  const [inputText, setInputText] = useState('');
  // State for active filter
  const [filter, setFilter] = useState(FILTER_OPTIONS.ALL);

  /**
   * Memoized filtered todos for performance optimization
   * Only recalculates when todos or filter changes
   */
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case FILTER_OPTIONS.PENDING:
        return todos.filter((todo) => todo.status === 'Pending');
      case FILTER_OPTIONS.COMPLETED:
        return todos.filter((todo) => todo.status === 'Completed');
      default:
        return todos;
    }
  }, [todos, filter]);

  /**
   * Statistics for the todo list
   */
  const stats = useMemo(() => ({
    total: todos.length,
    pending: todos.filter((t) => t.status === 'Pending').length,
    completed: todos.filter((t) => t.status === 'Completed').length,
  }), [todos]);

  /**
   * Adds a new todo to the list
   */
  const handleAddTodo = () => {
    const trimmedText = inputText.trim();
    if (!trimmedText) return;

    const newTodo = {
      id: crypto.randomUUID(),
      text: trimmedText,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    setTodos((prev) => [...prev, newTodo]);
    setInputText('');
  };

  /**
   * Handles Enter key press in input field
   * 
   * @param {React.KeyboardEvent} event - Keyboard event
   */
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddTodo();
    }
  };

  /**
   * Marks a todo as completed
   * 
   * @param {string} id - Todo ID to complete
   */
  const handleCompleteTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, status: 'Completed' } : todo
      )
    );
  };

  /**
   * Deletes a todo from the list
   * 
   * @param {string} id - Todo ID to delete
   */
  const handleDeleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  /**
   * Clears all completed todos
   */
  const handleClearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => todo.status !== 'Completed'));
  };

  return (
    <div className="bg-bg-primary rounded-xl border border-border overflow-hidden">
      {/* Stats header */}
      <div className="bg-bg-secondary px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-text-primary">My Todos</h3>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-text-muted">
              Total: <span className="font-medium text-text-primary">{stats.total}</span>
            </span>
            <span className="text-text-muted">
              Pending: <span className="font-medium text-warning">{stats.pending}</span>
            </span>
            <span className="text-text-muted">
              Done: <span className="font-medium text-success">{stats.completed}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Input section */}
      <div className="p-6 border-b border-border">
        <div className="flex gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="What needs to be done?"
            className="flex-1 px-4 py-3 bg-bg-secondary border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          />
          <button
            onClick={handleAddTodo}
            disabled={!inputText.trim()}
            className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Add Todo
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="px-6 py-3 border-b border-border flex items-center justify-between">
        <div className="flex gap-2">
          {Object.values(FILTER_OPTIONS).map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === filterOption
                  ? 'bg-primary text-white'
                  : 'bg-bg-secondary text-text-secondary hover:bg-bg-tertiary'
              }`}
            >
              {filterOption}
            </button>
          ))}
        </div>
        {stats.completed > 0 && (
          <button
            onClick={handleClearCompleted}
            className="text-sm text-danger hover:text-danger-hover transition-colors"
          >
            Clear Completed
          </button>
        )}
      </div>

      {/* Todo list */}
      <div className="divide-y divide-border">
        {filteredTodos.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-text-muted">
              {todos.length === 0
                ? 'No todos yet. Add one above!'
                : 'No todos match the current filter.'}
            </p>
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onComplete={handleCompleteTodo}
              onDelete={handleDeleteTodo}
            />
          ))
        )}
      </div>
    </div>
  );
};

/**
 * TodoItem Component
 * 
 * Renders an individual todo item with actions.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.todo - Todo data object
 * @param {Function} props.onComplete - Callback to mark todo as complete
 * @param {Function} props.onDelete - Callback to delete todo
 */
const TodoItem = ({ todo, onComplete, onDelete }) => {
  const isCompleted = todo.status === 'Completed';

  return (
    <div className="flex items-center gap-4 px-6 py-4 hover:bg-bg-secondary transition-colors">
      {/* Checkbox */}
      <button
        onClick={() => !isCompleted && onComplete(todo.id)}
        disabled={isCompleted}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          isCompleted
            ? 'bg-success border-success text-white'
            : 'border-border hover:border-primary'
        }`}
        aria-label={isCompleted ? 'Completed' : 'Mark as complete'}
      >
        {isCompleted && (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Todo text */}
      <p className={`flex-1 ${isCompleted ? 'line-through text-text-muted' : 'text-text-primary'}`}>
        {todo.text}
      </p>

      {/* Status badge */}
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          isCompleted ? 'bg-success-light text-success' : 'bg-warning-light text-warning'
        }`}
      >
        {todo.status}
      </span>

      {/* Delete button */}
      <button
        onClick={() => onDelete(todo.id)}
        className="p-2 text-text-muted hover:text-danger hover:bg-danger-light rounded-lg transition-all duration-200"
        aria-label={`Delete ${todo.text}`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
};

/**
 * Challenge Page Layout Component
 */
const TodoListChallengePage = () => {
  return (
    <div className="min-h-screen">
      {/* Page header */}
      <section className="bg-bg-primary border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-4">
            <Link to="/challenges" className="text-text-muted hover:text-primary transition-colors">
              Challenges
            </Link>
            <span className="text-text-muted">/</span>
            <span className="text-text-primary font-medium">Todo List</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">✅</span>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Todo List Challenge</h1>
              <span className="inline-block mt-1 px-3 py-1 bg-warning-light text-warning text-xs font-medium rounded-full">
                Intermediate
              </span>
            </div>
          </div>

          <p className="text-text-secondary">
            Build a full-featured todo application with add, delete, complete, and 
            filter functionality. Learn array state management and memoization.
          </p>
          <a
            href="https://github.com/basupatil1213/react-challenges/blob/main/src/challenges/TodoList.jsx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-sm text-primary hover:text-primary-hover transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            View Source on GitHub
          </a>
        </div>
      </section>

      {/* Challenge content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TodoList />

        {/* Learning points */}
        <div className="mt-8 bg-bg-primary rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Key Concepts Learned
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">1</span>
              <div>
                <p className="font-medium text-text-primary">Immutable Array Updates</p>
                <p className="text-sm text-text-secondary">Use spread operator and array methods to update state without mutation.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">2</span>
              <div>
                <p className="font-medium text-text-primary">useMemo Optimization</p>
                <p className="text-sm text-text-secondary">Memoize expensive filter operations to prevent unnecessary recalculations.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">3</span>
              <div>
                <p className="font-medium text-text-primary">Component Composition</p>
                <p className="text-sm text-text-secondary">Break down complex UIs into smaller, reusable components.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

/**
 * Route Definition
 */
export const Route = createFileRoute('/challenges/todo-list')({
  component: TodoListChallengePage,
});
