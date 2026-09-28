import { useState } from "react";
import { CalendarDays, Check, Pencil, Trash2, X } from "lucide-react";

export default function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  const [dueDate, setDueDate] = useState(todo.dueDate || "");

  const saveEdit = () => {
    if (!text.trim()) return;
    onUpdate(todo.id, text, dueDate);
    setEditing(false);
  };

  return (
    <article className={todo.completed ? "todo-item completed" : "todo-item"}>
      <button
        className="check-btn"
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? "Mark task pending" : "Mark task completed"}
      >
        {todo.completed && <Check size={16} />}
      </button>

      {editing ? (
        <div className="edit-task">
          <input value={text} onChange={(event) => setText(event.target.value)} autoFocus />
          <input type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
          <div className="item-actions">
            <button className="icon-btn success" onClick={saveEdit} title="Save"><Check size={18} /></button>
            <button className="icon-btn" onClick={() => setEditing(false)} title="Cancel"><X size={18} /></button>
          </div>
        </div>
      ) : (
        <>
          <div className="todo-info">
            <h3>{todo.text}</h3>
            <div className="todo-meta">
              <span className={todo.completed ? "status done" : "status pending"}>
                {todo.completed ? "Completed" : "Pending"}
              </span>
              {todo.dueDate && (
                <span className="due-date"><CalendarDays size={14} /> {todo.dueDate}</span>
              )}
            </div>
          </div>
          <div className="item-actions">
            <button className="icon-btn" onClick={() => setEditing(true)} title="Edit task"><Pencil size={18} /></button>
            <button className="icon-btn delete" onClick={() => onDelete(todo.id)} title="Delete task"><Trash2 size={18} /></button>
          </div>
        </>
      )}
    </article>
  );
}
