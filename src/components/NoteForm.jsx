import { useState } from "react";

function NoteForm({ onAdd }) {
  const [text, setText] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [error, setError] = useState("");

  function handleSubmit() {
    const trimmed = text.trim();

    if (!trimmed) {
      setError("Please enter a note.");
      return;
    }

    const sentences = trimmed.split(/[.!?]+/).filter(function (s) {
      return s.trim().length > 0;
    });

    if (sentences.length > 2) {
      setError("Notes must be no longer than 2 sentences.");
      return;
    }

    const tags = [];
    const parts = tagInput.split(",");
    for (let i = 0; i < parts.length; i++) {
      const tag = parts[i].trim().toLowerCase();
      if (tag) {
        tags.push(tag);
      }
    }

    onAdd(trimmed, tags);
    setText("");
    setTagInput("");
    setError("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  }

  return (
    <section className="form-card" aria-label="Add a new note">
      <h2 className="form-title">New Entry</h2>
      <div className="form-field">
        <label htmlFor="note-input" className="form-label">
          Note <span className="form-hint">(max 2 sentences)</span>
        </label>
        <textarea
          id="note-input"
          className={`form-textarea ${error ? "form-textarea--error" : ""}`}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setError("");
          }}
          onKeyDown={handleKeyDown}
          placeholder="e.g. The party slew the orc warlord and claimed his enchanted axe."
          aria-describedby={error ? "note-error" : "note-hint"}
          rows={3}
        />
        {error && (
          <p id="note-error" className="form-error" role="alert">
            {error}
          </p>
        )}
        {!error && (
          <p id="note-hint" className="form-hint-text">
            Tip: Press Ctrl+Enter to save quickly
          </p>
        )}
      </div>
      <div className="form-row">
        <div className="form-field form-field--inline">
          <label htmlFor="tag-input" className="form-label">
            Tags
          </label>
          <input
            id="tag-input"
            className="form-input"
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="combat, npc, location..."
            aria-describedby="tag-hint"
          />
          <p id="tag-hint" className="form-hint-text">
            Separate multiple tags with commas
          </p>
        </div>
        <button
          className="btn btn--primary"
          onClick={handleSubmit}
          aria-label="Add note to journal"
        >
          + Add Entry
        </button>
      </div>
    </section>
  );
}

export default NoteForm;
