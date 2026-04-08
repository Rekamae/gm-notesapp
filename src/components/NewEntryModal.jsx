import { useState } from "react";
import { CloseIcon } from "./Icons";

function NewEntryModal({ onAdd, onClose }) {
  const [text, setText] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [error, setError] = useState("");

  function handleCreate() {
    const trimmed = text.trim();
    if (!trimmed) {
      setError("Please enter a note.");
      return;
    }
    const tags = tagInput
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);
    onAdd(trimmed, tags);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">New Entry</span>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>
        <div className="modal-body">
          <textarea
            className="modal-textarea"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setError("");
            }}
            placeholder="Type in your entry......"
            rows={4}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Escape") onClose();
            }}
          />
          {error && <p className="modal-error">{error}</p>}
          <div>
            <div className="modal-tags-label">Tags</div>
            <input
              className="modal-tags-input"
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Combat,Curse"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreate();
              }}
            />
          </div>
          <button className="modal-create-btn" onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewEntryModal;
