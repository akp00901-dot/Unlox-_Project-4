import { useMemo, useState } from "react";
import { FilePlus2, Search, Tag, Clock3, Pencil, Trash2, X, Save } from "lucide-react";
import NoteCard from "./NoteCard";

const categories = ["General", "Work", "Study", "Personal"];

export default function NotesApp({ notes, setNotes }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: "", content: "", category: "General" });

  const filteredNotes = useMemo(() => {
    const query = search.trim().toLowerCase();

    return notes
      .filter((note) => category === "All" || note.category === category)
      .filter((note) =>
        !query ||
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query)
      )
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }, [notes, search, category]);

  const openNewNote = () => {
    setEditingId(null);
    setForm({ title: "", content: "", category: "General" });
    setEditorOpen(true);
  };

  const openEditNote = (note) => {
    setEditingId(note.id);
    setForm({
      title: note.title,
      content: note.content,
      category: note.category
    });
    setEditorOpen(true);
  };

  const closeEditor = () => setEditorOpen(false);

  const saveNote = (event) => {
    event.preventDefault();

    const title = form.title.trim();
    const content = form.content.trim();
    if (!title || !content) return;

    const now = new Date().toISOString();

    if (editingId) {
      setNotes((current) =>
        current.map((note) =>
          note.id === editingId
            ? { ...note, ...form, title, content, updatedAt: now }
            : note
        )
      );
    } else {
      setNotes((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          ...form,
          title,
          content,
          createdAt: now,
          updatedAt: now
        }
      ]);
    }

    closeEditor();
  };

  const deleteNote = (id) => {
    setNotes((current) => current.filter((note) => note.id !== id));
  };

  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">PROJECT 02</p>
          <h2>My Notes</h2>
          <p className="subtitle">Capture ideas, study notes and reminders in one place.</p>
        </div>
        <button className="primary-btn" onClick={openNewNote}>
          <FilePlus2 size={19} /> New Note
        </button>
      </div>

      <div className="notes-toolbar card">
        <div className="search-box large">
          <Search size={18} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search notes by title or content..."
          />
        </div>

        <div className="category-filters">
          <Tag size={17} />
          {["All", ...categories].map((item) => (
            <button
              key={item}
              className={category === item ? "filter-btn selected" : "filter-btn"}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {filteredNotes.length ? (
        <div className="notes-grid">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={openEditNote}
              onDelete={deleteNote}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state card">
          <div className="empty-icon"><FileTextIcon /></div>
          <h3>No notes found</h3>
          <p>Create a new note or change your search/filter.</p>
        </div>
      )}

      {editorOpen && (
        <div className="modal-backdrop" onMouseDown={closeEditor}>
          <form className="note-editor card" onSubmit={saveNote} onMouseDown={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <div>
                <p className="eyebrow">{editingId ? "EDIT NOTE" : "NEW NOTE"}</p>
                <h2>{editingId ? "Edit your note" : "Create a note"}</h2>
              </div>
              <button type="button" className="icon-btn" onClick={closeEditor}><X size={20} /></button>
            </div>

            <label>
              Title
              <input
                value={form.title}
                onChange={(event) => setForm({ ...form, title: event.target.value })}
                placeholder="Note title"
                autoFocus
              />
            </label>

            <label>
              Category
              <select
                value={form.category}
                onChange={(event) => setForm({ ...form, category: event.target.value })}
              >
                {categories.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>

            <label>
              Content
              <textarea
                rows="8"
                value={form.content}
                onChange={(event) => setForm({ ...form, content: event.target.value })}
                placeholder="Write your note..."
              />
            </label>

            <div className="modal-actions">
              <button type="button" className="secondary-btn" onClick={closeEditor}>Cancel</button>
              <button className="primary-btn" type="submit"><Save size={18} /> Save Note</button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}

function FileTextIcon() {
  return <Clock3 size={25} />;
}
