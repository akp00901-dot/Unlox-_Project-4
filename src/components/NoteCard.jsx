import { Clock3, Pencil, Trash2 } from "lucide-react";

function formatDate(date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(date));
}

export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <article className="note-card card">
      <div className="note-top">
        <span className="note-category">{note.category}</span>
        <div className="item-actions">
          <button className="icon-btn" onClick={() => onEdit(note)} title="Edit note"><Pencil size={17} /></button>
          <button className="icon-btn delete" onClick={() => onDelete(note.id)} title="Delete note"><Trash2 size={17} /></button>
        </div>
      </div>

      <h3>{note.title}</h3>
      <p>{note.content}</p>

      <div className="note-time">
        <Clock3 size={14} />
        Updated {formatDate(note.updatedAt)}
      </div>
    </article>
  );
}
