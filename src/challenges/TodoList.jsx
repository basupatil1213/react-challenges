import { useMemo, useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All');

  const showTodos = useMemo(() => {
    if (filter === 'All') return todos;
    return todos.filter((todo) => todo.status === filter)
  }, [todos, filter]);

  const CompleteTodo = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, status: 'Completed' } : todo
    );
    setTodos(updatedTodos);
  }

  const [inputText, setInputText] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const addTodo = () => {
    const trimmedText = inputText.trim();
    if (!trimmedText) return;

    const newTodo = {
      id: crypto.randomUUID(),
      text: trimmedText,
      status: 'Pending'
    };

    setTodos((prev) => [...prev, newTodo]);
    setInputText("");
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>Todos</h1>
      <section>
        Total Count: {todos.length}
      </section>
      <section>
        <select name="" id="filters" onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
        </select>
      </section>

      <section>
        <label htmlFor="todoInput">Add todo</label>
        <input
          id="todoInput"
          type="text"
          value={inputText}
          onChange={handleInputChange}
        />
        <button disabled={!inputText.trim()} onClick={addTodo}>
          Add Todo
        </button>
      </section>

      <section>
        {todos.length === 0 ? (
          <p>No todos</p>
        ) : (
          <ul>
            {showTodos.map((todo) => (
              <li key={todo.id}>
                <Todo task={todo.text} />
                <button
                  aria-label={`Delete todo ${todo.text}`}
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
                <button
                  aria-label={`Complete todo ${todo.text}`}
                  onClick={() => CompleteTodo(todo.id)}
                  disabled = {todo.status === 'Completed'}
                >
                  Complete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

const Todo = ({ task }) => {
  return <p>{task}</p>;
};

export default TodoList;
