import { useMemo, useState } from "react";
import { Plus, Search, Trash2, Pencil, Check, X, CalendarDays } from "lucide-react";
import TodoItem from "./TodoItem";

export default function TodoApp({ todos, setTodos, stats }) {
  const [taskText, setTaskText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const addTodo = (event) => {
    event.preventDefault();
    const text = taskText.trim();
    if (!text) return;

    setTodos((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        text,
        completed: false,
        dueDate
      }
    ]);

    setTaskText("");
    setDueDate("");
  };

  const toggleTodo = (id) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const updateTodo = (id, text, nextDueDate) => {
    const cleanText = text.trim();
    if (!cleanText) return;

    setTodos((current) =>
      current.map((todo) =>
        todo.id === id
          ? { ...todo, text: cleanText, dueDate: nextDueDate }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos((current) => current.filter((todo) => !todo.completed));
  };

  const visibleTodos = useMemo(() => {
    return todos.filter((todo) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "completed" && todo.completed) ||
        (filter === "pending" && !todo.completed);

      const matchesSearch = todo.text
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [todos, filter, search]);

  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">PROJECT 01</p>
          <h2>My To-Do List</h2>
          <p className="subtitle">Organize your daily tasks and keep track of progress.</p>
        </div>
        <div className="stats">
          <div><strong>{stats.total}</strong><span>Total</span></div>
          <div><strong>{stats.pending}</strong><span>Pending</span></div>
          <div><strong>{stats.completed}</strong><span>Done</span></div>
        </div>
      </div>

      <form className="task-form card" onSubmit={addTodo}>
        <div className="input-with-icon">
          <Check size={19} />
          <input
            value={taskText}
            onChange={(event) => setTaskText(event.target.value)}
            placeholder="What needs to be done?"
            aria-label="New task"
          />
        </div>
        <label className="date-field">
          <CalendarDays size={18} />
          <input
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            aria-label="Task due date"
          />
        </label>
        <button className="primary-btn" type="submit">
          <Plus size={19} /> Add Task
        </button>
      </form>

      <div className="toolbar">
        <div className="filter-group">
          {["all", "pending", "completed"].map((item) => (
            <button
              key={item}
              className={filter === item ? "filter-btn selected" : "filter-btn"}
              onClick={() => setFilter(item)}
            >
              {item[0].toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>

        <div className="search-box">
          <Search size={18} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search tasks..."
            aria-label="Search tasks"
          />
        </div>
      </div>

      <div className="list-card card">
        {visibleTodos.length ? (
          <div className="todo-list">
            {visibleTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onUpdate={updateTodo}
                onDelete={deleteTodo}
              />
            ))}
          </div>
        ) : (
          <EmptyState text={search ? "No tasks match your search." : "No tasks in this view."} />
        )}
      </div>

      {stats.completed > 0 && (
        <button className="danger-text-btn" onClick={clearCompleted}>
          <Trash2 size={16} /> Clear completed tasks
        </button>
      )}
    </section>
  );
}

function EmptyState({ text }) {
  return (
    <div className="empty-state">
      <CheckSquareIcon />
      <h3>{text}</h3>
      <p>Add a task above to get started.</p>
    </div>
  );
}

function CheckSquareIcon() {
  return (
    <div className="empty-icon">
      <Check size={26} />
    </div>
  );
}
