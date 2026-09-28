import { useEffect, useMemo, useState } from "react";
import { CheckSquare, FileText, LayoutDashboard } from "lucide-react";
import TodoApp from "./components/TodoApp";
import NotesApp from "./components/NotesApp";

const TODO_KEY = "minor-project-todos";
const NOTES_KEY = "minor-project-notes";

const initialTodos = [
  {
    id: crypto.randomUUID(),
    text: "Complete React minor project",
    completed: false,
    dueDate: ""
  }
];

const initialNotes = [
  {
    id: crypto.randomUUID(),
    title: "Welcome to TaskNote",
    content: "Create, edit, search and organize your notes here.",
    category: "General",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

function loadData(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [activeApp, setActiveApp] = useState("todo");
  const [todos, setTodos] = useState(() => loadData(TODO_KEY, initialTodos));
  const [notes, setNotes] = useState(() => loadData(NOTES_KEY, initialNotes));

  useEffect(() => {
    localStorage.setItem(TODO_KEY, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  }, [notes]);

  const todoStats = useMemo(() => ({
    total: todos.length,
    completed: todos.filter((todo) => todo.completed).length,
    pending: todos.filter((todo) => !todo.completed).length
  }), [todos]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon"><LayoutDashboard size={22} /></div>
          <div>
            <h1>TaskNote</h1>
            <p>React To-Do & Notes</p>
          </div>
        </div>

        <nav className="nav-tabs" aria-label="Application navigation">
          <button
            className={activeApp === "todo" ? "nav-btn active" : "nav-btn"}
            onClick={() => setActiveApp("todo")}
          >
            <CheckSquare size={18} /> To-Do
          </button>
          <button
            className={activeApp === "notes" ? "nav-btn active" : "nav-btn"}
            onClick={() => setActiveApp("notes")}
          >
            <FileText size={18} /> Notes
          </button>
        </nav>
      </header>

      <main className="main-content">
        {activeApp === "todo" ? (
          <TodoApp todos={todos} setTodos={setTodos} stats={todoStats} />
        ) : (
          <NotesApp notes={notes} setNotes={setNotes} />
        )}
      </main>

      <footer className="footer">
        <span>Minor Project 04</span>
        <span>Built with React.js • Data saved locally</span>
      </footer>
    </div>
  );
}
