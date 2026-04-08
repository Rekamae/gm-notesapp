import { useState } from "react";
import TagBadge from "./TagBadge";
import { EditIcon, DeleteIcon } from "./Icons";

function formatDate(isoString) {
  const d = new Date(isoString);
  return d.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function NoteCard({ note, isEditing, onEdit, onUpdate, onDelete, onCancelEdit }) {
  const [editText, setEditText] = useState(note.text);
  const [editTagInput, setEditTagInput] = useState(note.tags.join(", "));
  const [error, setError] = useState("");

  function handleSave() {
    const trimmed = editText.trim();
    if (!trimmed) {
      setError("Note cannot be empty.");
      return;
    }
    const tags = editTagInput
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);
    onUpdate(note.id, trimmed, tags);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSave();
    if (e.key === "Escape") onCancelEdit();
  }

  if (isEditing) {
    return (
      <article className="note-card note-card--editing">
        <textarea
          className="note-edit-textarea"
          value={editText}
          onChange={(e) => {
            setEditText(e.target.value);
            setError("");
          }}
          onKeyDown={handleKeyDown}
          autoFocus
          rows={2}
          aria-label="Edit note"
        />
        {error && <p className="modal-error">{error}</p>}
        <input
          className="note-edit-input"
          type="text"
          value={editTagInput}
          onChange={(e) => setEditTagInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="combat, npc, location..."
          aria-label="Edit tags"
        />
        <div className="note-edit-actions">
          <button className="btn-save" onClick={handleSave}>
            Save
          </button>
          <button className="btn-cancel-edit" onClick={onCancelEdit}>
            Cancel
          </button>
        </div>
      </article>
    );
  }

  return (
    <article className="note-card" aria-label={`Note: ${note.text.slice(0, 50)}`}>
      <div className="note-card-top">
        <p className="note-text">{note.text}</p>
        <div className="note-card-actions">
          <button
            className="note-icon-btn"
            onClick={() => onEdit(note.id)}
            aria-label="Edit note"
          >
            <EditIcon />
          </button>
          <button
            className="note-icon-btn note-icon-btn--delete"
            onClick={() => {
              if (window.confirm("Delete this note?")) onDelete(note.id);
            }}
            aria-label="Delete note"
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
      <div className="note-card-footer">
        <div className="note-tags">
          {note.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
        <time className="note-time" dateTime={note.createdAt}>
          {formatDate(note.createdAt)}
        </time>
      </div>
    </article>
  );
}

export default NoteCard;
