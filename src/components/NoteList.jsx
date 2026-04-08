import NoteCard from "./NoteCard";

function NoteList({
  notes,
  editingId,
  onEdit,
  onUpdate,
  onDelete,
  onCancelEdit,
}) {
  if (notes.length === 0) {
    return (
      <div className="empty-state" role="status" aria-live="polite">
        <p className="empty-title">No entries found</p>
      </div>
    );
  }

  return (
    <ul className="note-list" role="list" aria-label="Session notes">
      {notes.map((note) => (
        <li key={note.id} role="listitem">
          <NoteCard
            note={note}
            isEditing={editingId === note.id}
            onEdit={onEdit}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onCancelEdit={onCancelEdit}
          />
        </li>
      ))}
    </ul>
  );
}

export default NoteList;
