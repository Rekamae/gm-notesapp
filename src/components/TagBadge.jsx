import { getTagColorClass } from "../constants/tags";

function TagBadge({ tag, onClick, active, removable, onRemove }) {
  const colorClass = getTagColorClass(tag);

  if (removable) {
    return (
      <span className={`tag ${colorClass}`}>
        {tag}
        <button
          className="tag-remove"
          onClick={onRemove}
          aria-label={`Remove tag ${tag}`}
        >
          ×
        </button>
      </span>
    );
  }

  if (onClick) {
    return (
      <button
        className={`tag tag--filter ${colorClass} ${active ? "tag--active" : ""}`}
        onClick={onClick}
        aria-pressed={active}
        aria-label={`Filter by ${tag}`}
      >
        {tag}
      </button>
    );
  }

  return <span className={`tag ${colorClass}`}>{tag}</span>;
}

export default TagBadge;
